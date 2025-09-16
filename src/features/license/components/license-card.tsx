"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Licence } from "@prisma/client";

interface LicenseCardProps {
  license: Licence;
}

export function LicenseCard({ license }: LicenseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>License Key</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-mono break-all">{license.licenceKey}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {/* Expires on: {license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : "Never"} */}
        </p>
      </CardContent>
    </Card>
  );
}