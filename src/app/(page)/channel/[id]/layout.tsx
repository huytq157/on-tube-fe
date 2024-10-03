import LayoutDefault from "@/components/layouts/default/LayoutDefault";
import LayoutChannel from "@/components/layouts/layoutChannel";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutDefault>
      <LayoutChannel>{children}</LayoutChannel>
    </LayoutDefault>
  );
}
