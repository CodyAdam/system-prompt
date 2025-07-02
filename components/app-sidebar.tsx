"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useCanvasStore } from "@/lib/canvas-store";
import {
  RiAddLine,
  RiArrowDownBoxLine,
  RiArtboard2Line,
  RiComputerLine,
  RiGithubLine,
  RiKeyLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ApiKeys from "./api-keys";
import ImportDialog from "./import-dialog";
import Logo from "./logo";

export function AppSidebar() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { createCanvas, switchCanvas, currentCanvasId } = useCanvasStore(
    useShallow((state) => ({
      createCanvas: state.createCanvas,
      switchCanvas: state.switchCanvas,
      currentCanvasId: state.currentCanvasId,
    }))
  );

  const serializedCanvases = useCanvasStore(
    useShallow((state) => {
      const canvases = state.canvases.map((canvas) => ({
        name: canvas.name,
        id: canvas.id,
        createdAt: new Date(canvas.createdAt).toISOString(),
      }));
      return canvases
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((canvas) => `${canvas.name}:${canvas.id}`);
    })
  );

  const canvases = useMemo(() => {
    return serializedCanvases.map((canvas) => {
      const lastDashIndex = canvas.lastIndexOf(":");
      const name = canvas.substring(0, lastDashIndex);
      const id = canvas.substring(lastDashIndex + 1);
      return {
        name,
        id,
      };
    });
  }, [serializedCanvases]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 flex items-center gap-2">
          <Logo className="size-18" />
          <span className="text-2xl tracking-tighter font-sans leading-none font-medium">
            System
            <br />
            Prompt
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>New</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => createCanvas()}>
                  <RiAddLine className="size-4 shrink-0" />
                  New Canvas
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <ImportDialog>
                  <SidebarMenuButton>
                    <RiArrowDownBoxLine className="size-4 shrink-0" />
                    Import
                  </SidebarMenuButton>
                </ImportDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Canvas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {canvases.map((canvas) => (
                <SidebarMenuItem key={canvas.id}>
                  <SidebarMenuButton onClick={() => switchCanvas(canvas.id)} isActive={canvas.id === currentCanvasId}>
                    <RiArtboard2Line className="size-4 shrink-0" />
                    <span className="truncate">{canvas.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ApiKeys>
              <SidebarMenuButton>
                <RiKeyLine className="size-4 shrink-0" />
                API Keys
              </SidebarMenuButton>
            </ApiKeys>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="https://github.com/codyadam/system-prompt" target="_blank">
              <SidebarMenuButton>
                <RiGithubLine className="size-4 shrink-0" />
                GitHub
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {mounted ? (
              <SidebarMenuButton
                onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")}
                suppressHydrationWarning
              >
                {theme === "dark" ? (
                  <RiSunLine className="size-4 shrink-0" suppressHydrationWarning />
                ) : theme === "light" ? (
                  <RiComputerLine className="size-4 shrink-0" suppressHydrationWarning />
                ) : (
                  <RiMoonLine className="size-4 shrink-0" suppressHydrationWarning />
                )}{" "}
                {theme === "dark" ? "Light mode" : theme === "light" ? "System" : "Dark mode"}
              </SidebarMenuButton>
            ) : (
              <SidebarMenuSkeleton />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
