import { useTranslation } from "@/i18n";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface Module {
  label:
    | "sales"
    | "invoices"
    | "purchase_orders"
    | "expenses"
    | "vendors"
    | "services"
    | "client_projects";
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
] as const;

type EnabledModulesProps = {
  enabledModules: number;
  onChange: (enabledModules: number) => void;
};

export function EnabledModules({ onChange, enabledModules }: EnabledModulesProps) {
  const tr = useTranslation();

  function bitmaskToValues(mask: number): string[] {
    return mask === 0
      ? []
      : Array.from({ length: 32 }, (_, i) => 1 << i)
          .filter((bit) => mask & bit)
          .map((bit) => bit.toString());
  }

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={bitmaskToValues(enabledModules)}
      spacing={2}
      size="sm"
      className="flex-col items-stretch"
    >
      {modules.map((module) => (
        <ToggleGroupItem
          value={module.bitmask.toString()}
          key={module.bitmask}
          onClick={() => {
            // checked: Boolean(enabledModules & module.bitmask)
            onChange(enabledModules ^ module.bitmask);
          }}
        >
          {/* <StarIcon /> */}
          {tr(`subscriptions.modules.${module.label}`)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
