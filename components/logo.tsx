"use client";

import dark from "@/public/dark.svg";
import light from "@/public/light.svg";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Logo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const src = useMemo(() => {
    if (resolvedTheme === undefined || !mounted) return light;
    return resolvedTheme === "dark" ? dark : light;
  }, [resolvedTheme, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <Image src={src} alt="Logo" width={48} height={48} className={className} suppressHydrationWarning />;
}
