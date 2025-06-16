import { Control, FieldPath, FieldValues } from "react-hook-form";
import { AutoComplete } from "./autocomplete";
import { TextInput } from "./text-input";
import { useMemo } from "react";
import { FormLabel } from "../ui/form";
import { IOption } from "./radio-buttons";

type PhoneInputProps<TValue extends FieldValues> = {
  label: string;
  control: Control<TValue>;
  phone: FieldPath<TValue>;
  code: FieldPath<TValue>;
  placeholder?: string;
};

export const PhoneInput = <TValue extends FieldValues>({
  label,
  control,
  phone,
  code,
  placeholder,
}: PhoneInputProps<TValue>) => {
  const countryCodes: IOption[] = useMemo(
    () => [
      { label: "+256", value: "256" },
      { label: "+254", value: "254" },
      { label: "+44", value: "44" },
    ],
    []
  );
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className="flex mt-1 items-center gap-2">
        <AutoComplete
          control={control}
          name={code}
          options={countryCodes}
          placeholder={placeholder ?? "Select"}
          size={"full"}
          emptyPlaceholder="No data"
        />
        <div className="flex-grow">
          <TextInput control={control} name={phone} type={"number"} />
        </div>
      </div>
    </div>
  );
};
