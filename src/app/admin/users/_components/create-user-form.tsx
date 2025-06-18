"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSystemUserType, createUserSchema } from "@/lib/schemas/user";
import { createSystemUser } from "@/lib/user/create-user";
import { toast } from "sonner";
import { PasswordInput, TextInput } from "@/components/form-inputs";

export function CreateUserForm() {
  const form = useForm<CreateSystemUserType>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(values: CreateSystemUserType) {
    try {
      await createSystemUser(values);
      toast.success("User added successfully");
    } catch (error: unknown) {
      toast.error(`${error?.toString()}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>Create system user</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-4">
                <TextInput
                  label="First Name"
                  control={form.control}
                  name={"firstName"}
                />
                <TextInput
                  label="Last Name"
                  control={form.control}
                  name={"lastName"}
                />
                <TextInput
                  label="Email"
                  type="email"
                  control={form.control}
                  name={"email"}
                />
                <PasswordInput
                  label="Password"
                  control={form.control}
                  name={"password"}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button type="submit" variant="secondary">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
