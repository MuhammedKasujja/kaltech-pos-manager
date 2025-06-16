import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";

type SwitchInputProps<TValue extends FieldValues> = {
  label: string;
  control: Control<TValue>;
  name: FieldPath<TValue>;
  description?: string;
};

export const SwitchInput = <TValue extends FieldValues>({
  label,
  control,
  name,
  description,
}: SwitchInputProps<TValue>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={
            "flex flex-row items-center justify-between rounded-lg border p-4"
          }
        >
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
