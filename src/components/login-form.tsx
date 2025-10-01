"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/lib/auth/login";
import { toast } from "sonner";
import { PasswordInput, TextInput } from "@/components/form-inputs";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const tr = useTranslation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await loginUser(values);
    if (data) {
      toast.success("User added successfully");
      router.replace("/admin/dashboard");
    } else {
      toast.error(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    {tr("common.welcomeBack")}
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    {tr("common.welcomeBack")}
                  </p>
                </div>
                <TextInput
                  control={form.control}
                  label={tr("common.form.email")}
                  name={"email"}
                  placeholder="m@example.com"
                />
                <PasswordInput
                  control={form.control}
                  label={tr("common.form.password")}
                  name={"password"}
                  showIcon={false}
                />
                <Button type="submit" className="w-full">
                  {tr("common.form.login")}
                </Button>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/logo.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
