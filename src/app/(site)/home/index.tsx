import React from "react";
import { Hero } from "./_molecules/hero";
import { Services } from "./_molecules/services";
import { HowItWorks } from "./_molecules/how-it-works";
import { Faqs } from "./_molecules/faqs";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Faqs />
    </>
  );
}
