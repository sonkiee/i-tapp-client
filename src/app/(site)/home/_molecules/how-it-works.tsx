import { Wrapper } from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import { data } from "./data";
import Link from "next/link";

export function HowItWorks() {
  return (
    <Wrapper className="flex flex-col items-center gap-16">
      <h2 className="text-h4 sm:text-h3 md:text-h2 text-black max-w-[610px]">
        How it works
      </h2>

      {/* Steps */}

      <div className="flex gap-[35px] flex-wrap justify-center">
        {data.how_it_works.map((step, index) => (
          <HowItWorksCard key={index} step={step} index={index} />
        ))}
      </div>

      <div>
        <Link href="/get-started">
          <Button size="default">Get Started</Button>
        </Link>
      </div>
    </Wrapper>
  );
}

function HowItWorksCard({
  step,
  index,
}: {
  step: { title: string; description: string };
  index: number;
}) {
  return (
    <div className="rounded-[10px] shadow-[0_20px_18px_0px_rgba(101,126,208,0.18)] bg-[url('/how-it-works-card-bg.svg')] bg-no-repeat w-full max-w-[318px] flex flex-col gap-16 items-center text-center">
      <div className="w-full pt-20 px-14 pb-10 text-center flex flex-col gap-4">
        <div className="w-[102px] h-[102px] rounded-full bg-white inline-flex m-auto items-center justify-center">
          <div className="text-h3 sm:text-h2 bg-clip-text text-transparent bg-linear-to-r from-[#477DC0] to-[#CEDCEE]">
            {index + 1}
          </div>
        </div>
        <h3 className="text-md sm:text-lg text-[#445DCB] font-bold">
          {step.title}
        </h3>
      </div>
      <div className="p-16 px-12 pt-5">
        <p className="text-[#23283A] text-base">{step.description}</p>
      </div>
    </div>
  );
}
