export default function StoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-20 px-10 md:flex-row md:px-20">
      {children}
    </div>
  );
}
