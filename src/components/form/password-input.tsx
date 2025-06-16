import { Control, FieldPath, FieldValues } from "react-hook-form";
import { TextInput } from "./text-input";

type PasswordInputProps<TValue extends FieldValues> = {
  label: string;
  control: Control<TValue>;
  name: FieldPath<TValue>;
  placeholder?: string;
};

export const PasswordInput = <TValue extends FieldValues>({
  label,
  control,
  name,
  placeholder,
}: PasswordInputProps<TValue>) => {
  return (
    <TextInput
      control={control}
      name={name}
      label={label}
      type="password"
      placeholder={placeholder ?? "********"}
    />
  );
};
