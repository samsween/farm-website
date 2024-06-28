import { Upload } from "lucide-react";
import { ImageGalery } from "./image-gallery";
import UploadButton from "./upload-button";
import cloudinary from "@/lib/cloudinary";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage({
  searchParams: { search },
}: {
  searchParams: {
    search: string;
  };
}) {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-8 py-4">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>
      </div>
      <div className="py-8">
        <ImageGalery images={results.resources} />
      </div>
    </section>
  );
}
