import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect } from "react";

export type IOption = {
  label: string;
  value: string | number;
};

type RadioButtonsProps<F extends FieldValues> = {
  label?: string;
  control: Control<F>;
  name: FieldPath<F>;
  options: readonly IOption[];
};

export function RadioButtons<T extends FieldValues>({
  control,
  name,
  options,
  label,
}: Readonly<RadioButtonsProps<T>>) {
  useEffect(() => {
    if (options.length < 2) {
      throw new Error("Minimum options are 2");
    }
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row space-x-1"
            >
              {options.map((opt) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={opt.value}
                >
                  <FormControl>
                    <RadioGroupItem value={opt.value.toString()} />
                  </FormControl>
                  <FormLabel className="font-normal">{opt.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
