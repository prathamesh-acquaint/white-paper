import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Navbar />
      <Header />
      <Card className="mx-auto max-w-3xl mt-16">
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
