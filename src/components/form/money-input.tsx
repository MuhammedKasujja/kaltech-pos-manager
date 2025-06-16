import { FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { type TextInputProps } from "./text-input";

type MoneyInputProps<F extends FieldValues> = Omit<TextInputProps<F>, "type">;

export function MoneyInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  required = true,
}: Readonly<MoneyInputProps<T>>) {
  const currency = 'UGX';
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"w-full"}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative w-full">
              <Input
                {...field}
                type={"number"}
                value={field.value ?? ""}
                className={"pl-9"}
                placeholder={placeholder}
              />
              <div className="absolute left-0 top-0 m-2.5 h-4 w-4 text-white">
                <div className="flex justify-center items-center w-full bg-slate-500">
                  {currency}
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
