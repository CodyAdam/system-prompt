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
import { RiAddLine, RiComputerLine, RiGithubLine, RiKeyLine, RiMoonLine, RiSunLine, RiArtboard2Line, RiArrowDownBoxLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import ApiKeys from "./api-keys";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCanvasStore, type CanvasState } from "@/lib/canvas-store";
import { useShallow } from 'zustand/react/shallow';
import ImportDialog from './import-dialog';

const canvasSelector = (state: CanvasState) => ({
  canvases: state.canvases,
  currentCanvasId: state.currentCanvasId,
  createCanvas: state.createCanvas,
  switchCanvas: state.switchCanvas,
});

export function AppSidebar() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const {
    canvases,
    currentCanvasId,
    createCanvas,
    switchCanvas,
  } = useCanvasStore(useShallow(canvasSelector));

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-xl px-2 font-mono font-semibold">System Prompt</span>
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
              {canvases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((canvas) => (
                <SidebarMenuItem key={canvas.id}>
                  <SidebarMenuButton 
                    onClick={() => switchCanvas(canvas.id)}
                    isActive={canvas.id === currentCanvasId}
                  >
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
              <SidebarMenuButton onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")} suppressHydrationWarning>
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
