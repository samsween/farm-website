import connectMongo from "@/lib/connect-mongo";
import { TodoCategory } from "@/models/todo-category";
import { TodoForm } from "@/components/todo/todo-form";
import { Todolist } from "@/components/todo/todo-list";
import { Todo } from "@/models/todo";


async function getTodoCategories() {
  await connectMongo();
  const todoCats = await TodoCategory.find({});
  return JSON.parse(JSON.stringify(todoCats));
}
type TSearchParams = {
  query?: string;
  category?: string;
}

async function getTodos(searchParms: TSearchParams) {
  const { query, category } = searchParms;
  try {
    await connectMongo();
    const buildRegexQuery = (query: string) => ({
      title: { $regex: `.*${query}.*`, $options: 'i' }
    });

    const buildCategoryLookup = () => ([
      {
        $lookup: {
          from: 'todocategories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' }
    ]);

    let todos;

    if (!query && !category) {
      todos = await Todo.find({}).populate('category');
    } else if (query && !category) {
      todos = await Todo.find(buildRegexQuery(query)).populate('category');
    } else {
      const pipeline = buildCategoryLookup();
      if (query) {
        // @ts-ignore
        pipeline.unshift({ $match: buildRegexQuery(query) });
      }
      if (category) {
        // @ts-ignore
        pipeline.push({ $match: { 'category.name': category } });
      }
      todos = await Todo.aggregate(pipeline);
    }
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    throw new Error("Error fetching todos");
  }
}

export default async function Todos({
  searchParams,
}: { searchParams: TSearchParams }
) {
  const todoCategories = await getTodoCategories();
  const todos = await getTodos(searchParams);
  return (
    <div className=" mx-auto p-4 space-y-4">
      <TodoForm categories={todoCategories} />
      <Todolist todos={todos} categories={todoCategories} />
    </div>
  );
}

