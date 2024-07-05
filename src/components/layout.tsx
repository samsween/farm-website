
import Link from "next/link"
import {
	Menu,
	Package2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import UserSwitcher from "./user-switcher"

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-[101] bg-white">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<Link
						href="/"
						className="flex uppercase items-center gap-2 text-lg text-primary font-semibold md:text-base"
					>
						kalamondah
					</Link>
					<Link
						href="/"
						className="flex items-center gap-2 text-lg  md:text-base"
					>
						Home
					</Link>
					<Link
						href="/gallery"
						className="flex items-center gap-2 text-lg  md:text-base"
					>
						Gallery
					</Link>
					<Link
						href="#"
						className="flex items-center gap-2 text-lg  md:text-base"
					>
						Calendar
					</Link>
					<Link
						href="/cattle"
						className="flex items-center gap-2 text-lg  md:text-base"
					>
						Cattle
					</Link>
					<Link
						href="/finance"
						className="flex items-center gap-2 text-lg  md:text-base"
					>
						Finance
					</Link>
					<Link
						href="/content/notes"
						className="flex items-center gap-2 text-lg  md:text-base text-nowrap"
					>
						Simon Says
					</Link>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								href="#"
								className="flex items-center gap-2 text-lg font-semibold"
							>
								<Package2 className="h-6 w-6" />
								<span className="sr-only">Acme Inc</span>
							</Link>
							<Link href="#" className="hover:text-foreground">
								Dashboard
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Orders
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Products
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Customers
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Analytics
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<UserSwitcher />
				</div>
			</header>
			<main className="flex flex-1">

				{children}
			</main>
		</div>
	)
}
