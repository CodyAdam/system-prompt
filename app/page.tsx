"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AppSidebar } from "../components/app-sidebar";

const Workflow = dynamic(() => import("../components/workflow"), { ssr: false });

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-svh relative">
        <Suspense fallback={null}>
          <Workflow />
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
