import { FieldValues } from "react-hook-form";
import { TextInput, type TextInputProps } from "./text-input";

type NumberInputProps<F extends FieldValues> = Omit<TextInputProps<F>, "type">;

export function NumberInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = true,
}: Readonly<NumberInputProps<T>>) {
  return (
    <TextInput
      control={control}
      name={name}
      placeholder={placeholder}
      label={label}
      required={required}
      type={"number"}
    />
  );
}
