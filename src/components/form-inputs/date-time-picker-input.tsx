// import "react-quill/dist/quill.snow.css";
// import { Control, FieldPath, FieldValues } from "react-hook-form";
// import { FormField, FormItem, FormMessage } from "../ui/form";
// import { DateTimePicker } from "../ui/date-time-picker";

// type DateTimePickerInputProps<FValue extends FieldValues> = {
//   label: string;
//   control: Control<FValue>;
//   name: FieldPath<FValue>;
//   placeholder?: string;
// };

// export function DateTimePickerInput<FValue extends FieldValues>({
//   control,
//   name,
//   label,
// }: Readonly<DateTimePickerInputProps<FValue>>) {
//   return (
//     <FormField
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <FormItem className="w-full">
//           <DateTimePicker
//             date={field.value}
//             setDate={field.onChange}
//             label={label}
//           />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }
