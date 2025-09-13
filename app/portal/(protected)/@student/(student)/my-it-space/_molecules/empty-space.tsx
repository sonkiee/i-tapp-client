import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmptySpace = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg lg:max-w-xl w-4/5">
      <div className="p-6 flex flex-col items-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Keep refreshing this space, something good is coming...
        </h2>
        <p className="text-gray-500 text-center text-sm">
          We are curating amazing IT opportunities just for you.
        </p>
        <Link
          href="/portal/find-it-space"
          className={buttonVariants({ variant: "default", size: "default" })}
        >
          Find IT Space
        </Link>
      </div>
    </div>
  );
};

export default EmptySpace;
