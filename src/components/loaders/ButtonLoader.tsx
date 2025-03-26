export default function ButtonLoader() {
  return (
    <div className="mx-auto flex h-[25px] w-[100px] items-center justify-center gap-1.5">
      <span
        className={`[animation-delay:0.7s] animate-scale h-full w-1 rounded-full bg-white`}
      ></span>
      <span
        className={`[animation-delay:0.6s] animate-scale h-full w-1 rounded-full bg-white`}
      ></span>
      <span
        className={`[animation-delay:0.5s] animate-scale h-full w-1 rounded-full bg-white`}
      ></span>
      <span
        className={`[animation-delay:0.4s] animate-scale h-full w-1 rounded-full bg-white`}
      ></span>
    </div>
  );
}
