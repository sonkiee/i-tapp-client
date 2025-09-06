import { SiteLayoutUi } from "@/components/layouts/site";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayoutUi>{children}</SiteLayoutUi>;
}
