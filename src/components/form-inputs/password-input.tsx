import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AsteriskIcon, Eye, EyeOff } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

type PasswordInputProps<TValue extends FieldValues> = {
  label: string;
  control: Control<TValue>;
  name: FieldPath<TValue>;
  placeholder?: string;
  required?: boolean;
  showIcon?: boolean;
};

export const PasswordInput = <TValue extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  required = true,
  showIcon = true,
}: PasswordInputProps<TValue>) => {
  const [show, setShow] = React.useState(false);

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
            <div className="relative w-full">
              <Input
                placeholder={placeholder ?? "********"}
                {...field}
                type={show ? "text" : "password"}
                value={field.value ?? ""}
              />
              {showIcon && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
