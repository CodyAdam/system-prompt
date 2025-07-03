"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { providers } from "@/lib/ai";
import { useApiKeysStore } from "@/lib/api-key-store";
import { RiEyeLine, RiEyeOffLine, RiKey2Line } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ApiKeys({ children }: { children: React.ReactNode }) {
  const [visibleInputs, setVisibleInputs] = useState<Record<string, boolean>>({});
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const { apiKeys, setApiKey, removeApiKey, open, setOpen } = useApiKeysStore();

  const handleSaveKey = (providerId: string) => {
    const apiKey = inputValues[providerId];
    if (apiKey && apiKey.trim()) {
      setApiKey(providerId, apiKey.trim());
    } else {
      removeApiKey(providerId);
    }
  };

  const handleInputChange = (providerId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [providerId]: value }));
  };

  useEffect(() => {
    // set all values input on open
    Object.keys(providers).forEach((providerId) => {
      setInputValues((prev) => ({ ...prev, [providerId]: apiKeys[providerId] || "" }));
    });
  }, [apiKeys, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
          <DialogDescription>
            Configure your API keys for each provider. Keys are stored locally in your browser.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Available Providers</h3>
          <div className="grid gap-3">
            {Object.entries(providers).map(([providerId]) => (
              <div key={providerId} className="bg-card p-3 rounded-lg flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RiKey2Line className="size-5" />
                    <span className="text-sm font-medium">{providerId}</span>
                    {apiKeys[providerId] && (
                      <span className="text-xs text-green-600 bg-green-200 dark:bg-green-500/20 dark:text-green-400 px-2 py-1 rounded">✓ Configured</span>
                    )}
                  </div>
                  <Link
                    href={providers[providerId].keyUrl}
                    target="_blank"
                    className="text-muted-foreground underline underline-offset-4 text-xs"
                  >
                    Find it here
                  </Link>
                </div>

                <div className="space-y-2 mt-2 flex gap-2">
                  <Input
                    type={visibleInputs[providerId] ? "text" : "password"}
                    placeholder={`Enter your ${providerId} API key`}
                    value={inputValues[providerId] || ""}
                    onChange={(e) => handleInputChange(providerId, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setVisibleInputs((prev) => ({ ...prev, [providerId]: !prev[providerId] }));
                    }}
                    className="size-9"
                  >
                    {!visibleInputs[providerId] ? (
                      <RiEyeLine className="size-5" />
                    ) : (
                      <RiEyeOffLine className="size-5" />
                    )}
                  </Button>
                  <Button onClick={() => handleSaveKey(providerId)} className="w-fit">
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
