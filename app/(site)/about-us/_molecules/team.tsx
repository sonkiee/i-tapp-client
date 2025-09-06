// src/MeetOurTeam.js
import Image from "next/image";
import React from "react";
import sam from '@/assets/images/sam.jpg'
import dee from "@/assets/images/dee.jpg";
import egbe from "@/assets/images/egbe.png";
import jutin from "@/assets/images/jutin.png";
import jerry from "@/assets/images/jerry.png";




// Team data remains the same as previously defined
const teamData = [
  {
    name: "Samuel Foluwasho oluwafemi",
    position: "Founder and CEO",
    imageUrl: sam,
    description: "Leading our company with a visionary approach.",
  },
  {
    name: "Egbe Oghenemarho Andrew",
    position: "Co-Founder",
    imageUrl: egbe,
    description: "Oversees the technical direction of the company.",
  },
  {
    name: "Moses Glory Chidimma",
    position: "Lead Product Growth",
    imageUrl: dee,
    description: "Ensures operational efficiency and effectiveness.",
  },
  {
    name: "Jeremiah Argin",
    position: "Product Manager",
    imageUrl: jerry,
    description: "Manages the company's finances with precision.",
  },
  {
    name: "Jutin Dikonu",
    position: "Chief Technology Officer",
    imageUrl: jutin,
    description: "Manages the company's finances with precision.",
  },
];

const Team = () => {
  return (
    <div className="bg-white py-12 px-6">
      <h2 className="text-4xl font-bold text-center mb-4">Meet The Team!</h2>
      <p className="text-center text-gray-600 mb-8">
        Our team is dedicated to transforming the Industrial Training experience
        in Nigeria and empowering students to acquire the necessary training.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {teamData.map((member, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 w-[400px] text-center md:text-left"
          >
            <Image
              src={member.imageUrl}
              alt={member.name}
              width={150}
              height={150}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <p className="text-indigo-500">{member.position}</p>
              {/* <p className="text-gray-600 mt-2">{member.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
