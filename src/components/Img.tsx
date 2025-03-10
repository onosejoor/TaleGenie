import Image, { ImageProps } from "next/image";

type Props = {
  className?: string;
  alt: string;
  src: string;
} & ImageProps;

export default function Img({ className, src, alt, ...props }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={1080}
      height={1080}
      {...props}
    />
  );
}
