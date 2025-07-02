"use client";

import light from "@/public/light.svg"
import dark from "@/public/dark.svg"
import { useTheme } from 'next-themes';
import Image from "next/image";

export default function Logo({className}: {className?: string}) {
  const { resolvedTheme } = useTheme();
  return (
    <Image src={resolvedTheme === "dark" ? dark : light} alt="Logo" width={48} height={48} className={className} />
  );
}