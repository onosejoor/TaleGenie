export default function Loading() {
  return (
    <>
      <div className=" bg-dark-gray fixed inset-0 z-[400] touch-none opacity-50"></div>
      <div className="fixed top-1/2 duration-100 left-1/2 z-[500] h-[4px] w-[200px] -translate-x-1/2 overflow-hidden rounded-md bg-white">
        <div className="animate-marquee bg-primary h-full w-full rounded-md"></div>
      </div>
    </>
  );
}
