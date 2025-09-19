import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AsteriskIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type InputType = "text" | "number" | "email" | "url";

export type TextInputProps<F extends FieldValues> = {
  label?: string;
  control: Control<F>;
  name: FieldPath<F>;
  placeholder?: string;
  type?: InputType;
  required?: boolean;
};

export function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = true,
}: Readonly<TextInputProps<T>>) {
  // const name = form.control
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"w-full"}>
          {label && (
            <FormLabel>
              {label}
              {required && (
                <AsteriskIcon
                  className={cn("text-destructive inline size-2.5 align-top")}
                />
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
