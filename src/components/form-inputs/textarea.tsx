import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Textarea as TextareaComp } from "../ui/textarea";

type TextareaProps<F extends FieldValues> = {
  label: string;
  control: Control<F>;
  name: FieldPath<F>;
  placeholder?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  ...rest
}: Readonly<TextareaProps<T>>) {
  // const name = form.control
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <TextareaComp placeholder={placeholder} {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
