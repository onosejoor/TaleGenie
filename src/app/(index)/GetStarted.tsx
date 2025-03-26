import Link from "next/link";

export default function GetStarted() {
  return (
    <section className="bg-secondary/5 px-10 py-20 lg:px-20">
      <div className="mx-auto grid h-fit w-fit gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-secondary font-cherry text-center text-3xl font-bold md:text-6xl">
            Start Creating Stories Today!
          </h2>
          <p className="text-secondary mx-auto text-center text-lg sm:w-3/4">
            Feeling inspired? Now&apos;s the perfect time to turn those ideas
            into compelling stories. Start creating stories today
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          <Link
            href={"/create"}
            className="bg-primary dark:hover:text-primary hover:text-secondary border-primary w-fit rounded-md border-2 px-5 py-3 font-semibold text-white hover:bg-white"
          >
            Get Started
          </Link>
          <Link
            href={"/stories"}
            className="bg-accent-blue hover:text-secondary dark:hover:text-accent-blue border-accent-blue w-fit rounded-md border-2 px-5 py-3 font-semibold text-white hover:bg-white"
          >
            Discover Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
