import { Wrapper } from "@/components/wrapper";

export function Intro() {
  return (
    <div className=" bg-gradient-to-b from-[#9499dd1a] from-0% to-[#0010ff1a] to-100% max-w-full">
      <Wrapper className=" relative">
        <h2 className="text-h2 sm:text-h1">About i-Tapp</h2>
        <p className="max-w-96 mt-4 text-sm sm:text-base">
          The inception of i-Tapp was driven by a desire to improve the
          Industrial Training and SIWES application process in Nigeria.
        </p>

        <div className="gap-4 flex-col absolute right-40 -bottom-20 hidden md:flex">
          <div className="flex gap-4 ">
            <div className=" bg-grey-3 w-[4.7em] h-20 rounded-tl-[1.5em] self-end"></div>
            <div className=" bg-primary w-28 h-32 rounded-br-[1.5em] "></div>
          </div>
          <div className="flex gap-4">
            <div className=" bg-primary w-28 h-32 rounded-br-[1.5em]"></div>
            <div className=" bg-grey-3 w-[4.7em] h-20 rounded-tl-[1.5em]"></div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
