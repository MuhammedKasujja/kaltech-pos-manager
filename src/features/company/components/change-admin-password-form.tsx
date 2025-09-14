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
import { toast } from "sonner";
import { PasswordInput } from "@/components/form-inputs";
import { changePasswordSchema, ChangeAdminPasswordType } from "../schemas";
import { changeAdminPassword } from "../actions/change-admin-password";
import { useTranslation } from "@/i18n";

export function ChangeAdminAccountPassword({
  accountKey,
}: {
  accountKey?: string;
}) {
  const tr = useTranslation();
  const form = useForm<ChangeAdminPasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { accountKey: accountKey },
  });

  async function onSubmit(values: ChangeAdminPasswordType) {
    try {
      await changeAdminPassword(values);
      toast.success(tr("common.changePasswordSuccess"));
      form.reset();
    } catch (error: unknown) {
      toast.error(`${error?.toString()}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{tr("common.changePassword")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{tr("common.changePassword")}</DialogTitle>
              <DialogDescription>
                {tr("common.changeAdminPasswordHelp")}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-4">
                <PasswordInput
                  label={tr("common.newPassword")}
                  control={form.control}
                  name={"password"}
                />
                <PasswordInput
                  label={tr("common.confirmPassword")}
                  control={form.control}
                  name={"confirmPassword"}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button type="submit" variant="secondary">
                {tr("common.form.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
