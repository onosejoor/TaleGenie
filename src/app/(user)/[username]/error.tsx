"use client";

import { AlertIcon } from "@/components/Icons";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-fit flex-col items-center justify-center gap-5p-4 dark:invert">
      <div className="h-fit w-full max-w-md rounded-lg">
        <div className="bg-secondtext-secondary p-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-white/10 p-3 *:fill-red-500">
              <AlertIcon />
            </div>
          </div>
        </div>

        <div className="p-6 text-center md:p-8">
          <h2 className="text-secondary mb-2 text-2xl font-bold">
            Error Getting User Profile
          </h2>
          <div className="bg-primary mx-auto mb-6 h-1 w-16"></div>

          <p className="mb-6 text-neutral-600">
            Our server encountered an unexpected Error, check internet
            connection, and try again
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => reset()}
              className="bg-primary hover:bg-primary/90 w-full rounded-[10px] p-3 text-white"
            >
              Try Again
            </button>

            <Link
              className="border-accent-blue text-accent-blue hover:border-accent-blue/10 w-full rounded-[10px] border-2 p-3"
              href="/"
            >
              Return Home
            </Link>
          </div>
        </div>

        {error.digest && (
          <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-3">
            <p className="text-center text-xs text-neutral-500">
              Error ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
