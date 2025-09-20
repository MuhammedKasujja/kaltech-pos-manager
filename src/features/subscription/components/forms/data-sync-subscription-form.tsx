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
import { HiddenInput, NumberInput, TextInput } from "@/components/form-inputs";
import {
  DataSyncSubscriptionType,
  dataSyncSubscriptionSchema,
} from "@/features/subscription/schemas";
import { createDataSyncronizationSubscription } from "../../actions/save-subscription-plans";
import { SubscriptionPlan } from "@prisma/client";
import { useTranslation } from "@/i18n";
import { IconCirclePlusFilled } from "@tabler/icons-react";

export function DataSyncSubscriptionForm() {
  const tr = useTranslation();

  const form = useForm<DataSyncSubscriptionType>({
    resolver: zodResolver(dataSyncSubscriptionSchema),
    defaultValues: { plan: SubscriptionPlan.PRO, features: [] },
  });

  async function onSubmit(values: DataSyncSubscriptionType) {
    try {
      await createDataSyncronizationSubscription(values);
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
          <span>Data Sync Plan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Data Sync Plan</DialogTitle>
              <DialogDescription>Create Data Sync Plan</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-4">
                <HiddenInput control={form.control} name={"id"} />
                <TextInput label="Plan Name" control={form.control} name={"name"} />
                <TextInput
                  label="Tagline"
                  control={form.control}
                  name={"tagline"}
                />
                <NumberInput
                  label={tr("common.planDays")}
                  control={form.control}
                  name={"planDays"}
                />
                <NumberInput
                  label="Max Connection Devices"
                  control={form.control}
                  name={"maxSyncDevices"}
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
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button type="submit" variant="secondary">
                {tr("common.form.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
