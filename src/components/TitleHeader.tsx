const TitleHeader = ({ text }: { text: string }) => (
  <div className="grid gap-3">
    <div className="bg-accent-blue h-[5px] w-10 rounded-full"></div>

    <h3 className="font-cherry text-secondary text-2xl font-bold">{text}</h3>
  </div>
);

export default TitleHeader;
