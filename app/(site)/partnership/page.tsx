import { Wrapper } from "@/components/wrapper";
import Image from "next/image";
import React from "react";

export default function Partnership() {
  return (
    <Wrapper>
      <h2 className="text-lg font-bold">Our partners</h2>
      <div className="mt-5">
        <Image
          src={"/FUPRE-Logo.png"}
          width={200}
          height={100}
          alt="fupre_logo"
        />
      </div>
    </Wrapper>
  );
}
