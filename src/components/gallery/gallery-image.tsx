"use client";
import { SearchResult } from "@/app/(main)/gallery/page";
import { CldImage } from "next-cloudinary";
import { ImageMenu } from "./image-menu";

export const GalleryImage = ({ img }: { img: SearchResult }) => {
  return (
    <div className="relative">
      <div className=" hover:flex absolute inset-0 z-[100] flex justify-end">
        <ImageMenu image={img} />
      </div>

      <CldImage
        key={img.public_id}
        src={img.public_id}
        alt=""
        width="400"
        height="300"
      />
    </div>
  );
};
