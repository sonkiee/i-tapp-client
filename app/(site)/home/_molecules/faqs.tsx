import { Wrapper } from "@/components/wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { data } from "./data";

export function Faqs() {
  return (
    <>
      <Wrapper className="flex flex-col gap-[73px] items-center justify-center">
        <h3 className="text-h6 sm:text-h5">Frequently Asked Questions</h3>
        <Accordion className="w-full" type="single">
          {data.faqs.map((faq, index) => (
            <AccordionItem value={faq.question} key={index} className="m-auto">
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Wrapper>
    </>
  );
}
