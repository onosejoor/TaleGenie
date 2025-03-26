export default function StoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="xs:pl-10  flex w-full flex-col justify-between gap-20 px-7.5 sm:px-10 md:flex-row md:pl-20">
      {children}
    </div>
  );
}
