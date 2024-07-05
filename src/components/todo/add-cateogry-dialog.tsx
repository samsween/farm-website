import { SearchResult } from "@/app/(main)/gallery/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { addCateogry } from "../actions/todo-actions";

export function AddCategoryDialog({ onClose }: { onClose: () => void }) {
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpenState) => {
        setOpen(newOpenState);
        if (!newOpenState) {
          onClose();
        }
      }}
    >
      <DialogTrigger>
        <div className="px-2">
          <PlusCircle className="text-primary" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Todo category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category-name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(e) => setCategoryName(e.currentTarget.value)}
              id="category-name"
              value={categoryName}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              await addCateogry(categoryName);
              onClose();
              setOpen(false);
            }}
            type="submit"
          >
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
