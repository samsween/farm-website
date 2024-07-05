import { TrashIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ITodo } from "@/models/todo";

export function TodoItem({ todo }: { todo: ITodo }) {
	return (
		<div className="flex items-center justify-between gap-2 rounded-md bg-muted p-3">
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<Checkbox id="task-3" />
					<label htmlFor="task-3" className="flex-1 text-sm font-medium">
						{todo.title}
					</label>
				</div>
				<div className="flex gap-2">
					<Badge>{typeof (todo.category) === "object" ? todo.category.name : ""}</Badge>
					<Badge variant="outline">{new Date().toLocaleDateString()}</Badge>
				</div>
			</div>
			<Button
				variant="ghost"
				size="icon"
				className="text-muted-foreground hover:bg-muted/50"
			>
				<TrashIcon className="h-4 w-4" />
				<span className="sr-only">Delete task</span>
			</Button>
		</div>
	);
}
