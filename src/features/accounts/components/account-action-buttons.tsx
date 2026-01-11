"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AccountActionButtons({
  license,
  accountKey,
}: {
  license: (Record<string, unknown> & { licenceKey: string }) | undefined;
  accountKey: string | undefined;
}) {
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => {
          if (!license) {
            toast.error("No license key found");
            return;
          }
          navigator.clipboard.writeText(license?.licenceKey ?? "");
          toast.info("License key copied");
        }}
      >
        Copy License
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          if (accountKey == undefined) return;

          navigator.clipboard.writeText(accountKey);
          toast.info("Account Key Copied");
        }}
      >
        Copy Account Key
      </Button>
    </>
  );
}
