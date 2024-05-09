import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="h-calc bg-gray-200 flex items-center justify-center">
        <div className="min-w-[1200px] ">{children}</div>
      </main>
    </div>
  );
}
