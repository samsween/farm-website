"use client"

import { useRouter } from "next/navigation"
import { Button, ButtonProps } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
	const { back } = useRouter();
	return (
		<Button onClick={() => back()} className="flex gap-2">
			<ArrowLeft />
			Back
		</Button>
	)

}
