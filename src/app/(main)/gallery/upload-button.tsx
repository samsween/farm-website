"use client";
import { Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {

  return (
    <CldUploadButton
      onSuccess={(result: any) => {
        console.log(result)
      }}
      className="flex gap-2 items-center border border-primary p-2 rounded-md font-semibold"
      uploadPreset="bsbx8znc"
    >
      Upload
      <Upload />
    </CldUploadButton>

  );
}
