"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Location } from "iconsax-react";
import { SearchNormal1 } from "iconsax-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex gap-2 w-full">
      <div className=" px-5 py-4 flex w-full bg-white rounded-xl">
        <Input
          className="border-none p-0 w-full placeholder:text-primary placeholder:text-sm"
          placeholder="Search with company name or field"
          startAdornment={<SearchNormal1 size="18" color="#6E6E9B" />}
          onChange={(e) => handleSearch(e.target.value.trim())}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <span className="flex border-l pl-1 gap-1">
          <Location size="20" color="#6E6E9B" className=" self-center" />
          <span>Lagos</span>
        </span>
      </div>
      {/* <Button size="sm" className="py-7 px-7">
        Search
      </Button> */}
    </div>
  );
}
