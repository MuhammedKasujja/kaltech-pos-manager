import { cn } from "@/lib/utils";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Button } from "../ui/button";
import { CheckIcon, ChevronsLeftRightIcon } from "lucide-react";
import { IOption } from "./radio-buttons";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { VariantProps, cva } from "class-variance-authority";

export const autoCompleteVariants = cva(
  "border-neutral-300 focus:border-primary/50 focus:bg-inherit hover:bg-white rounded text-foreground font-normal hover:text-inherit",
  {
    variants: {
      size: {
        xs: "w-[100px]",
        sm: "w-72",
        md: "w-[300px]",
        lg: "w-[400px]",
        full: "w-full min-w-[var(--radix-select-trigger-width)]",
      },
    },
    defaultVariants: {
      size: "full",
    },
  },
);

type AutoCompleteProps<F extends FieldValues> = {
  options: Readonly<IOption[]>;
  label?: string;
  control: Control<F>;
  name: FieldPath<F>;
  placeholder?: string;
  emptyPlaceholder?: string;
} & VariantProps<typeof autoCompleteVariants>;

export const AutoComplete = <T extends FieldValues>({
  options,
  control,
  name,
  label,
  placeholder,
  emptyPlaceholder,
  size,
}: AutoCompleteProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  // role="combobox"
                  aria-expanded={open}
                  className={cn(
                    autoCompleteVariants({ size }),
                    "justify-between",
                  )}
                >
                  {field.value
                    ? options.find((opt) => opt.value == field.value)?.label
                    : (placeholder ?? "Search")}
                  <ChevronsLeftRightIcon className="ml-2 h-4 w-4 shrink-0 opacity-60 rotate-90" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "p-0",
                  size === "full" && "w-[var(--radix-popover-trigger-width)]",
                )}
              >
                <Command>
                  <CommandInput
                    placeholder={placeholder ?? "Search"}
                    className="h-9"
                  />
                  <CommandEmpty>
                    {emptyPlaceholder ?? "No options found"}
                  </CommandEmpty>
                  <CommandGroup value={field.value}>
                    {options.map((opt) => (
                      <FormItem key={opt.value}>
                        <FormControl>
                          <CommandItem
                            key={opt.value}
                            value={opt.label.toLowerCase().toString()}
                            onSelect={() => {
                              setOpen(false);
                              field.onChange(opt.value);
                            }}
                          >
                            {opt.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4 text-primary font-extrabold",
                                field.value == opt.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        </FormControl>
                      </FormItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
