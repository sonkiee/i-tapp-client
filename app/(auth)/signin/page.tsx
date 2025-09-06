import { Metadata } from "next";

import { CompanySignIn } from "./_molecules";

export const metadata: Metadata = {
  title: "I-TAPP | Login",
  description: "",
};

export default function SigninPage() {
  return <CompanySignIn />;
}
