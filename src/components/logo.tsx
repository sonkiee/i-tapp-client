import Image from "next/image";

import itappLogo from "@/assets/images/logo.png";

export function Logo() {
  return <Image src={itappLogo} alt="Logo" />;
}
