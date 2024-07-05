"use client"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from "use-debounce"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ITodo } from "@/models/todo"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { AddCategoryDialog } from "./add-cateogry-dialog"
import { ITodoCategory } from "@/models/todo-category"
import { TodoItem } from "./todo"



export const Todolist = ({ todos, categories }: { todos: ITodo[]; categories: ITodoCategory[] }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname()
	const { replace, refresh } = useRouter()
	const createHandleSearch = (delay: number) => useDebouncedCallback((term: string, type: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set(type, term);
		} else {
			params.delete(type);
		}
		replace(`${pathname}?${params.toString()}`);
	}, delay);
	const handleQuery = createHandleSearch(300);
	const handleCategory = createHandleSearch(0)
	function handleClose() {
		refresh()
	}
	const todoList = () => (
		todos.map(t => <TodoItem todo={t} key={t._id} />)
	)
	return (
		<>
			<Tabs defaultValue={searchParams.get("category") || "all"}>
				<div className="w-full flex justify-between">

					<TabsList className="py-6">
						<TabsTrigger value="all" onClick={() => handleCategory('', 'category')}>All</TabsTrigger>
						{
							categories.map((cat) => <TabsTrigger key={cat._id} value={cat.name} onClick={() => handleCategory(cat.name, 'category')}>{cat.name.toUpperCase()}</TabsTrigger>)
						}
						<AddCategoryDialog onClose={handleClose} />
					</TabsList>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							onChange={(text) => handleQuery(text.target.value, 'query')}
							placeholder="Search todos..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</div>
				<TabsContent value="all">
					<div className="space-y-2">
						{
							!searchParams.get('category') && todoList()
						}

					</div>
				</TabsContent>
				{
					categories.map(cat => (
						<TabsContent value={cat.name}>
							{
								searchParams.get('category') === cat.name && todoList()
							}
						</TabsContent>
					))
				}
			</Tabs>
		</>
	)
}
