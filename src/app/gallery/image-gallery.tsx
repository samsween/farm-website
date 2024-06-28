"use client"
import { GalleryImage } from "@/components/gallery-image";
import { SearchResult } from "./page"
import { CldImage } from "next-cloudinary";



export const ImageGalery = ({ images }: { images: SearchResult[] }) => {

  function getColums(colIndex: number) {
    return images.filter((_, idx) => {
      return idx % 4 === colIndex
    })
  }
  return (
    <>
      <div className="grid grid-cols-4 gap-2 ">
        {
          [
            getColums(0),
            getColums(1),
            getColums(2),
            getColums(3),
          ].map((column, idx) => <div className="flex flex-col gap-4" key={idx}>
            {column.map((img, idx) => <GalleryImage img={img} key={img.public_id} />)}

          </div>)
        }
      </div>
    </>
  )
}
