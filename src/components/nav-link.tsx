"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === `/admin/${href}`;

  return (
    <Link
      href={href}
      className={clsx("min-w-8 duration-200 ease-linear", {
        "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground":
          isActive,
      })}
    >
      {children}
    </Link>
  );
}
