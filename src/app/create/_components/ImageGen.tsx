"use client";

import Img from "@/components/Img";
import { usePollinationsImage } from "@pollinations/react";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function ImageGen({
  description,
  setCoverImage,
}: {
  description?: string;
  setCoverImage: Dispatch<SetStateAction<string>>;
}) {
  const imageUrl = usePollinationsImage(description!, {
    width: 600,
    height: 600,
    model: "flux",
    enhance: true,
    seed: 10,
    nologo: true,
  });

  useEffect(() => {
    if (imageUrl) {
      setCoverImage(imageUrl);
    }
  }, [imageUrl, setCoverImage]);

  return (
    <Img
      className="dark:shadow-story-card-dark h-[300px] w-full rounded-md object-cover active:scale-90 sm:h-[500px] sm:w-[400px] md:w-[500px]"
      src={imageUrl}
      alt={description || ""}
    />
  );
}
