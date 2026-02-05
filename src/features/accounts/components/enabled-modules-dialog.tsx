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
import { useTranslation } from "@/i18n";
import { EnabledModules } from "@/components/enabled-modules";
import z from "zod";
import { accountEnabledModuleSchema } from "@/features/accounts/schemas";
import { activateAccountEnabledModules } from "../actions/account-enabled-modules";
import { IconRefresh } from "@tabler/icons-react";

export function AccountEnableModuleDialog({
  data,
}: {
  data: z.infer<typeof accountEnabledModuleSchema>;
}) {
  const tr = useTranslation();

  const form = useForm<z.infer<typeof accountEnabledModuleSchema>>({
    resolver: zodResolver(accountEnabledModuleSchema),
    defaultValues: data,
  });

  async function onSubmit(data: z.infer<typeof accountEnabledModuleSchema>) {
    try {
      await activateAccountEnabledModules(data);
      toast.success(tr("account.modulesSyncSuccessfully"));
      form.reset();
    } catch (error: unknown) {
      toast.error(`${error?.toString()}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground px-2 capitalize"
        >
          <IconRefresh />
          {tr("subscriptions.modules.key")}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[40vw] min-h-[90vh] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{tr("account.modules")}</DialogTitle>
              <DialogDescription>
                {tr("subscriptions.enabledModules")}
              </DialogDescription>
            </DialogHeader>
            <section id="account-modules">
              <EnabledModules
                enabledModules={form.watch("enabledModules") ?? 0}
                onChange={(enabledModules) => {
                  form.setValue("enabledModules", enabledModules);
                }}
              />
            </section>
            <DialogFooter className="sm:justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {tr("common.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
