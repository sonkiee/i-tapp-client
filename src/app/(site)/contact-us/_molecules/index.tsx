import { Wrapper } from "@/components/wrapper";
import { Form } from "./form";
import { Banner } from "./banner";

export function ContactUs() {
  return (
    <Wrapper className="md:flex justify-between items-center sm:py-0 h-auto min-h-[calc(100vh-64px)] relative">
      <Form />
      <Banner />
    </Wrapper>
  );
}
