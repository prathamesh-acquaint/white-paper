import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Navbar />
      <Header />
      <main className="h-full bg-gray-200 ">
        <div className="min-w-full lg:min-w-[1200px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
