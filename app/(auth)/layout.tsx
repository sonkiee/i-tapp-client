import AuthLayoutUi from "@/components/layouts/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutUi>{children}</AuthLayoutUi>;
}
