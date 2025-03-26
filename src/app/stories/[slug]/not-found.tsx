import Img from "@/components/Img";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="xs:px-10 grid h-fit grid-cols-1 items-center gap-10 p-5 py-10 md:grid-cols-2 md:px-20 md:py-20">
      <Img
        src={"/images/torn-book.svg"}
        alt=" torn book indication a page not found (404)"
        className="h-[300px]"
      />
      <div className="w-full text-center md:text-left">
        <h1 className="text-primary text-6xl font-bold md:text-8xl">404</h1>
        <h2 className="text-secondary mt-4 text-2xl font-semibold md:text-3xl">
          Story Not Found
        </h2>
        <p className="mt-4 text-gray-600">
          It seems this page has been torn from our book of stories. Perhaps it
          was never written, or maybe it&lsquo;s still being crafted by our
          storytellers.
        </p>
        <div className="mt-8">
          <Link
            href="/stories"
            className="bg-accent-blue rounded-[10px] px-5 py-3 text-white hover:bg-[#3060d0]"
          >
            Return to Stories
          </Link>
        </div>
      </div>
    </div>
  );
}
