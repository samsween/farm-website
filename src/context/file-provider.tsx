"use client"
import { useState, createContext, useContext } from "react";

export type TFileStore = {
	file: string,
	name: string
}
type FileContexType = {
	files: TFileStore[],
	setFiles: React.Dispatch<React.SetStateAction<TFileStore[]>>
}
// Will be overridden on implementaion 
const DefaultFileContext: FileContexType = {
	files: [],
	setFiles: () => { },
}

const FileContext = createContext<FileContexType>(DefaultFileContext);


export const FileProvider = ({ children }: { children: React.ReactNode }) => {
	const [files, setFiles] = useState<TFileStore[]>([]);
	return (
		<FileContext.Provider value={{ files, setFiles }}>
			{children}
		</FileContext.Provider>
	)
}


export const useFiles = () => useContext(FileContext);


