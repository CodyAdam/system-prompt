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
import { Textarea } from "@/components/ui/textarea";
import { useWorkflowStore } from "@/lib/workflow-store";
import { useState } from "react";

export default function ImportDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const importFromJson = useWorkflowStore((state) => state.importFromJson);

  const handleImport = () => {
    importFromJson(jsonInput.trim());
    setJsonInput("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Workflow</DialogTitle>
          <DialogDescription>
            Paste the JSON data of a workflow to import it. This will create a new workflow with the imported data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Paste your workflow JSON here..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="h-[300px] break-all font-mono text-sm overflow-y-auto"
          />
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!jsonInput.trim()}>
              Import Workflow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
