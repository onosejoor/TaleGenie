type Color = "default" | "white";

export default function Spinner({ color }: { color?: Color }) {
  return (
    <div
      className={`${color === "default" ? "border-accent-blue" : `border-${color}`} h-[30px] w-[30px] animate-spin rounded-full border-5 border-b-transparent [animation-duration:.5s]`}
    ></div>
  );
}
