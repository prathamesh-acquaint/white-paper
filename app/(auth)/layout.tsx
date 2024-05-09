export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center  bg-gray-100">
      {children}
    </div>
  );
}
