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
import { useWorkflowStore } from "@/lib/workflow-store";
import {
  RiAddLine,
  RiArrowDownBoxLine,
  RiComputerLine,
  RiGithubLine,
  RiKeyLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";
import { MoreVerticalIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ApiKeys from "./api-keys";
import ImportDialog from "./import-dialog";
import Logo from "./logo";

export function AppSidebar() {
  const { setTheme,resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { createWorkflow, switchWorkflow, currentWorkflowId } = useWorkflowStore(
    useShallow((state) => ({
      createWorkflow: state.createWorkflow,
      switchWorkflow: state.switchWorkflow,
      currentWorkflowId: state.currentWorkflowId,
    }))
  );

  const serializedWorkflows = useWorkflowStore(
    useShallow((state) =>
      state.workflows
        .map((workflow) => ({
          name: workflow.name,
          id: workflow.id,
          createdAt: new Date(workflow.createdAt).toISOString(),
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((workflow) => `${workflow.name}:${workflow.id}`)
    )
  );

  const workflows = useMemo(() => {
    return serializedWorkflows.map((workflow) => {
      const lastDashIndex = workflow.lastIndexOf(":");
      const name = workflow.substring(0, lastDashIndex);
      const id = workflow.substring(lastDashIndex + 1);
      return {
        name,
        id,
      };
    });
  }, [serializedWorkflows]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = workflows.map((workflow) => (
    <SidebarMenuItem key={workflow.id}>
      <SidebarMenuButton onClick={() => switchWorkflow(workflow.id)} isActive={workflow.id === currentWorkflowId}>
        <span className="truncate">{workflow.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));

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
                <SidebarMenuButton onClick={() => createWorkflow()}>
                  <RiAddLine className="size-4 shrink-0" />
                  New Workflow
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
          <SidebarGroupLabel>Workflows</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mounted ? (
                menuItems
              ) : (
                <>
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                  <SidebarMenuSkeleton />
                </>
              )}
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
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                suppressHydrationWarning
              >
                {resolvedTheme === "dark" ? (
                  <RiSunLine className="size-4 shrink-0" suppressHydrationWarning />
                ) : (
                  <RiMoonLine className="size-4 shrink-0" suppressHydrationWarning />
                )}{" "}
                {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
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
