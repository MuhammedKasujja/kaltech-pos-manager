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

import { useFieldArray, useForm } from "react-hook-form";
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

const defaultFeatures = Array.from({ length: 5 }, () => ({ value: "" }));

export function DataSyncSubscriptionForm({
  subscription,
}: {
  subscription?: DataSyncSubscriptionType;
}) {
  const tr = useTranslation();

  const form = useForm<DataSyncSubscriptionType>({
    resolver: zodResolver(dataSyncSubscriptionSchema),
    defaultValues: subscription ?? {
      plan: SubscriptionPlan.PRO,
      features: defaultFeatures,
    },
  });

  const { fields } = useFieldArray({
    name: "features",
    control: form.control,
  });

  async function onSubmit(values: DataSyncSubscriptionType) {
    try {
      await createDataSyncronizationSubscription(values);
      toast.success(tr("subscriptions.createdSuccessfully"));
      form.reset();
    } catch (error: unknown) {
      toast.error(`${error?.toString()}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconCirclePlusFilled />
          <span>Data Sync Plan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[80vw] min-h-[90vh] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Data Sync Plan</DialogTitle>
              <DialogDescription>Create Data Sync Plan</DialogDescription>
            </DialogHeader>
            <div className="grid items-start gap-5 md:grid-cols-2">
              <div className="grid flex-1 gap-4">
                <HiddenInput control={form.control} name={"id"} />
                <TextInput
                  label="Plan Name"
                  control={form.control}
                  name={"name"}
                />
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
              <div className="grid gap-4">
                {fields.map((field, index) => (
                  <TextInput
                    key={field.id}
                    label={`Feature - ${index + 1}`}
                    required={false}
                    control={form.control}
                    name={`features.${index}.value`}
                  />
                ))}
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button type="submit">{tr("common.form.submit")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
