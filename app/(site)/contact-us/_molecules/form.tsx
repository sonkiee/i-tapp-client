import { Happyemoji, Sms } from "iconsax-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wrapper } from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";

export function Form() {
  return (
    <Wrapper className="touch:px-20 flex-1 max-w-[600px]">
      <h2 className="text-h4 md:text-h3">Get in touch!</h2>
      <form action="" className="flex flex-col gap-4 mt-8">
        <Label
          htmlFor="name"
          className="font-regular text-black text-sm sm:text-base"
        >
          Name
        </Label>
        <Input
          type="text"
          id="name"
          startAdornment={<Happyemoji size={24} color="#acb4c3" />}
        />

        <FormField>
          <Label
            htmlFor="email"
            className="font-regular text-black text-sm sm:text-base"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            startAdornment={<Sms size={24} color="#acb4c3" />}
          />
        </FormField>

        <FormField>
          <Label
            htmlFor="message"
            className="font-regular text-black text-sm sm:text-base"
          >
            Message
          </Label>
          <Textarea id="message" className="min-h-24 " />
        </FormField>

        <FormField>
          <Checkbox id="checkbox" className="font-regular text-black" />
          <Label htmlFor="checkbox" className="font-regular text-black text-sm">
            I agree to Privacy Policy and Terms of Use
          </Label>
        </FormField>

        <Button className="block text-sm sm:text-base" size={"md"}>
          Send
        </Button>
      </form>
    </Wrapper>
  );
}
