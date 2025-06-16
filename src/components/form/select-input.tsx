import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IOption } from "./radio-buttons";

type SelectInputProps<FValue extends FieldValues> = {
  label?: string;
  control: Control<FValue>;
  name: FieldPath<FValue>;
  options: Readonly<IOption[]>;
  placeholder?: string;
};

export const SelectInput = <FValue extends FieldValues>({
  control,
  name,
  options,
  label,
  placeholder,
}: SelectInputProps<FValue>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full">
              {options.map((opt) => (
                <SelectItem
                  value={opt.value.toString().toLowerCase()}
                  key={opt.value.toString().toLowerCase()}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
