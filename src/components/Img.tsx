"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = {
  className?: string;
  alt: string;
  src: string;
} & ImageProps;

export default function Img({ className, src, alt, ...props }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div
          className={`bg-light-gray animate-pulse backdrop-brightness-0 ${className}`}
        ></div>
      )}

      <Image
        src={src}
        alt={alt}
        className={className + ` ${loading ? " absolute opacity-0 -z-10" : "block"}`}
        width={1080}
        height={1080}
        loading="lazy"
        onLoad={() => setLoading(false)}
        {...props}
      />
    </>
  );
}
