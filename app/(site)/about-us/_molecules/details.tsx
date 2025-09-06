import { Wrapper } from "@/components/wrapper";
import Image from "next/image";
import AboutImg from "@/assets/images/about-us.jpg";

export function Details() {
  return (
    <Wrapper>
      <h3 className="text-h4 sm:text-h3">I-Tapp</h3>
      <p className=" max-w-[45em] mt-4 text-sm sm:text-base">
        The usual approach of students finding and applying for SIWES
        opportunities was inefficient, time-consuming, and often resulted in
        delays. We recognized the need for a better solution and i-Tapp was
        created to meet this need. i-Tapp offers a more efficient and
        streamlined process for securing placements with companies, thereby
        bridging the gap between students and companies.
      </p>
      <div className="bg-red-100 w-full h-[25em] rounded-tr-[3em] my-16 relative ">
        <Image
          className="rounded-tr-[3em]"
          src={AboutImg}
          alt="Company Banner"
          layout="fill" // Makes the image cover the div
          quality={100} // Adjusts image quality (optional)
          priority // Optional: loads the image with priority
        />
        <div className="md:flex flex-col absolute w-32  -bottom-16 right-16 hidden">
          <div className=" bg-primary w-[4.8em] h-20 rounded-br-[1.5em] "></div>
          <div className=" bg-grey-3 w-12 h-[3.3em] rounded-tl-[1.5em] self-end"></div>
        </div>
      </div>
      <p className="max-w-[48em] text-sm sm:text-base">
        Our platform uses technology to digitize the entire process thereby
        streamlining the entire application process and reducing the
        administrative burden on both sides. Unlike other platforms, i-Tapp is
        specifically tailored to the needs of Nigerian university students,
        offering resources and guidance throughout the entire training
        experience. At i-Tapp, we provide a user-friendly interface, transparent
        communication, and commitment to continuous improvementz <br />
        {/* <span className="font-bold mt-8">
          Phasellus scelerisque eros felis, ut lobortis ipsum mattis
          ullamcorper. Morbi magna orci, ornare vel auctor non, malesuada sed
          dolor. Pellentesque facilisis
        </span> */}
      </p>
    </Wrapper>
  );
}
