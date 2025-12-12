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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

const defaultFeatures = Array.from({ length: 5 }, () => ({ value: "" }));

export function AccountSubscriptionForm({
  subscription,
  trigger,
}: {
  subscription?: AccountSetupSubscriptionType;
  trigger: React.ReactNode;
}) {
  const tr = useTranslation();

  const form = useForm<AccountSetupSubscriptionType>({
    resolver: zodResolver(accountSetupSubscriptionSchema),
    defaultValues: subscription ?? { features: defaultFeatures },
  });

  const { fields } = useFieldArray({
    name: "features",
    control: form.control,
  });

  async function onSubmit(values: AccountSetupSubscriptionType) {
    try {
      await createAccountSubscriptionPlan(values);
      toast.success(tr("subscriptions.createdSuccessfully"));
      form.reset();
    } catch (error: unknown) {
      toast.error(`${error?.toString()}`);
    }
  }

  function bitmaskToValues(mask: number): string[] {
    return mask === 0
      ? []
      : Array.from({ length: 32 }, (_, i) => 1 << i)
          .filter((bit) => mask & bit)
          .map((bit) => bit.toString());
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="md:min-w-[80vw] min-h-[90vh] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{tr("subscriptions.accountPlan")}</DialogTitle>
              <DialogDescription>
                {subscription
                  ? tr("subscriptions.editAccountPlan")
                  : tr("subscriptions.createAccountPlan")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid items-start gap-5 md:grid-cols-2">
              <div className="grid flex-1 gap-4">
                <HiddenInput control={form.control} name={"id"} />
                <TextInput label="Name" control={form.control} name={"name"} />
                <TextInput
                  label="Tagline"
                  control={form.control}
                  name={"tagline"}
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
              <div className="grid flex-1 gap-4">
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
                <Label className="mb-2">Enabled Modules</Label>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={bitmaskToValues(form.watch("enabledModules") ?? 0)}
                  spacing={2}
                  size="sm"
                  className="flex-col items-stretch"
                >
                  {modules.map((module) => (
                    <ToggleGroupItem
                      value={module.bitmask.toString()}
                      key={module.bitmask}
                      onClick={() => {
                        form.setValue(
                          "enabledModules",
                          (form.getValues("enabledModules") ?? 0) ^
                            module.bitmask
                        );
                      }}
                    >
                      {/* <StarIcon /> */}
                      {module.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {tr("common.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface Module {
  label: string;
  bitmask: number;
}

enum ModuleBitmask {
  // RecurringInvoices = 1,
  // Credits = 2,
  // Quotes = 4,
  // Tasks = 8,
  Expenses = 16,
  // Projects = 32,
  Vendors = 64,
  Documents = 128,
  // Transactions = 256,
  // RecurringExpenses = 512,
  // RecurringTasks = 1024,
  // RecurringQuotes = 2048,
  Invoices = 4096,
  // ProformaInvoices = 8192,
  PurchaseOrders = 16384,
  Services = 32768,
  Sales = 65536,
  ClientProjects = 131072,
}

const modules: Module[] = [
  { label: "sales", bitmask: ModuleBitmask.Sales },
  { label: "invoices", bitmask: ModuleBitmask.Invoices },
  { label: "purchase_orders", bitmask: ModuleBitmask.PurchaseOrders },
  { label: "expenses", bitmask: ModuleBitmask.Expenses },
  { label: "vendors", bitmask: ModuleBitmask.Vendors },
  { label: "services", bitmask: ModuleBitmask.Services },
  { label: "client_projects", bitmask: ModuleBitmask.ClientProjects },
  // {
  //   label: "recurring_invoices",
  //   bitmask: ModuleBitmask.RecurringInvoices,
  // },
  // {
  //   label: "recurring_expenses",
  //   bitmask: ModuleBitmask.RecurringExpenses,
  // },
];
