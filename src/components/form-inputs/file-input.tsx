// import { Control, FieldPath, FieldValues } from "react-hook-form";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import { SUPPORTED_FILE_TYPES } from "@/config";
// import { useFilePick } from "@/hooks/useFilePick";

// export type SupportedFileTypes = keyof typeof SUPPORTED_FILE_TYPES;

// type InputFileProps<F extends FieldValues> = {
//   label: string;
//   control: Control<F>;
//   name: FieldPath<F>;
//   placeholder?: string;
//   fileTypes?: SupportedFileTypes;
//   multipleFiles?: boolean;
// };

// export function FileInput<T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   fileTypes = "images",
//   multipleFiles = false,
// }: Readonly<InputFileProps<T>>) {
//   const { onFileChange } = useFilePick({ name, control });
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={() => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <FormControl>
//             <Input
//               placeholder={placeholder}
//               type={"file"}
//               accept={SUPPORTED_FILE_TYPES[fileTypes]}
//               onChange={onFileChange}
//               multiple={multipleFiles}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }
