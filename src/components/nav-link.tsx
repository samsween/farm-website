"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navlink = ({ children, href, name }: { children: React.ReactNode, href: string, name: string }) => {
	const pathname = usePathname()

	return (
		<div className={
			pathname === href ? "flex gap-2 items-center w-full py-4 px-1 bg-primary text-primary-foreground" : "flex gap-2 items-center w-full py-4 px-1 "
		}>
			{children}
			<Link href={href}>{name}</Link>
		</div>
	)
}
