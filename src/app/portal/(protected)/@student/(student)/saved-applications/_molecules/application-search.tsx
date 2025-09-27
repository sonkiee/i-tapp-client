"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { SearchNormal1, ArrowDown2 } from "iconsax-reactjs";
import { Sort } from "./sort";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function ApplicationSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-y-4 text-center justify-center sm:flex-row  sm:justify-between px-10 mb-5">
      <h6 className="text-h6 self-center">Saved Application</h6>
      <div className="flex gap-4 whitespace-nowrap  ">
        <Input
          startAdornment={<SearchNormal1 color="#7E7E7E" size="24" />}
          className="rounded-xl bg-[#F9FBFF] border-none h-9 "
          id="search"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <Sort />
        <ArrowDown2
          color="black"
          size="35"
          className="bg-[#F9FBFF] p-1 px-4 w-14 rounded-lg sm:hidden"
        />
      </div>
    </div>
  );
}
