"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  HiddenInput,
  NumberInput,
  SelectInput,
  TextInput,
} from "@/components/form-inputs";
import {
  AccountSetupSubscriptionType,
  accountSetupSubscriptionSchema,
} from "@/features/subscription/schemas";
import { createAccountSubscriptionPlan } from "../../actions/save-subscription-plans";
import { SubscriptionPlan } from "@prisma/client";
import { useTranslation } from "@/i18n";
import { IconCirclePlusFilled } from "@tabler/icons-react";

export function AccountSubscriptionForm() {
  const tr = useTranslation();

  const form = useForm<AccountSetupSubscriptionType>({
    resolver: zodResolver(accountSetupSubscriptionSchema),
    defaultValues: { tags: [] },
  });

  async function onSubmit(values: AccountSetupSubscriptionType) {
    try {
      await createAccountSubscriptionPlan(values);
      toast.success(tr("subscriptions.createdSuccessfully"));
    } catch (error: unknown) {
      toast.error(`${error?.toString()}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <IconCirclePlusFilled />
          {tr("subscriptions.newAccountPlan")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{tr("subscriptions.accountPlan")}</DialogTitle>
              <DialogDescription>Create Account Plan</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-4">
                <HiddenInput control={form.control} name={"id"} />
                <TextInput label="Name" control={form.control} name={"name"} />
                <TextInput
                  label="Tagline"
                  control={form.control}
                  name={"about"}
                />
                <NumberInput
                  label="Monthyly Price"
                  control={form.control}
                  name={"monthylyPrice"}
                />
                <NumberInput
                  label="Yearly Price"
                  control={form.control}
                  name={"yearlyPrice"}
                />
                <NumberInput
                  label="Old Monthly Price"
                  control={form.control}
                  name={"oldMonthlyPrice"}
                />
                <NumberInput
                  label="Old Yearly Price"
                  control={form.control}
                  name={"oldYearlyPrice"}
                />
                <SelectInput
                  label={tr("common.plan")}
                  control={form.control}
                  name={"plan"}
                  options={Object.values(SubscriptionPlan).map((plan) => ({
                    label: tr(`subscriptions.${plan}`),
                    value: plan,
                  }))}
                />
                <NumberInput
                  label={tr("common.planDays")}
                  control={form.control}
                  name={"planDays"}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button
                type="submit"
                variant="secondary"
                disabled={form.formState.isSubmitting}
              >
                {tr("common.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
