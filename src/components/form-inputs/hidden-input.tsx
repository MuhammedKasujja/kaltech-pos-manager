import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type HiddenInputProps<F extends FieldValues> = {
  control: Control<F>;
  name: FieldPath<F>;
};

export function HiddenInput<T extends FieldValues>({
  control,
  name,
}: Readonly<HiddenInputProps<T>>) {
  // const name = form.control
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"hidden"}>
          <FormControl>
            <Input {...field} type={"hidden"} value={field.value ?? ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
