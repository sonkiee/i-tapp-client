"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { filters } from "@/config/student";
import company from "@/data/company";
import { cn } from "@/utils/tailwind";
import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import React from "react";

export default function FilterCompanies({
  filter,
  setFilter,
  filterActive,
  setFilterActive,
}) {
  const handleMonthChange = (id, checked) => {
    const duration = filter.duration.map((month) => {
      if (month.id === id) {
        return { ...month, checked: checked };
      } else {
        return month;
      }
    });

    setFilter({ ...filter, duration: duration });
  };

  const handleFieldChange = (id, checked) => {
    const field = filter.field.map((field) => {
      if (field.id === id) {
        return { ...field, checked: checked };
      } else {
        return field;
      }
    });
    setFilter({ ...filter, field: field });
  };

  return (
    <div
      className={cn(
        "hidden w-full sm:block sm:w-1/3 bg-white p-8 rounded-xl self-start",
        filterActive && "block"
      )}
    >
      <div className=" pb-6 border-b  flex justify-between  ">
        <ArrowLeft2
          onClick={() => setFilterActive(false)}
          className="sm:hidden"
        />
        <h6 className="text-h6 hidden sm:block">Filters</h6>

        <p className="  text-primary underline underline-offset-3 text-sm lg:text-base">
          <Link href="" onClick={() => setFilter(filters)}>
            Reset All
          </Link>
        </p>
      </div>

      <div className="py-6 border-b">
        <h6 className="text-h6 mb-4">Sort by</h6>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label
              htmlFor="option-one "
              className="font-regular text-sm sm:text-base"
            >
              Most Recent
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="py-6 border-b">
        <h6 className="text-h6 mb-4">Duration</h6>
        <div className="flex flex-wrap gap-2 gap-x-6">
          {filter.duration.map((month, i) => (
            <div className=" whitespace-nowrap" key={i}>
              <Checkbox
                id={month.id}
                checked={month.checked}
                onCheckedChange={() =>
                  handleMonthChange(month.id, !month.checked)
                }
              />
              <Label
                className="font-regular text-sm sm:text-base"
                htmlFor={month.id}
              >
                {month.time} Months
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="py-6 border-b">
        <h6 className="text-h6 mb-4">Location</h6>
        <div>
          <Input
            value={filter.location}
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
            placeholder="e.g Lagos"
          />
        </div>
      </div>

      <div className="py-6">
        <h6 className="text-h6 mb-4">Industry</h6>
        <div className="flex flex-wrap gap-2 gap-x-6">
          {filter.field.map((field, i) => (
            <div className=" whitespace-nowrap" key={i}>
              <Checkbox
                id={field.id}
                checked={field.checked}
                onCheckedChange={() =>
                  handleFieldChange(field.id, !field.checked)
                }
              />
              <Label
                className="font-regular text-sm sm:text-base"
                htmlFor={field.id}
              >
                {field.industry}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const handleFilter = (companyData, filter) => {
  let filteredCompanies = companyData;
  // -------------handling filter when a month duration is chosen-------------

  // to get the months that have been checked by the user
  const filteredDuration = filter.duration
    .filter((month) => month.checked === true)
    .map((month) => month.time);

  if (filteredDuration.length) {
    // to return an array of months with the range of months checked by the user
    const monthCount = filteredDuration
      .map((duration) => {
        if (duration === "0-3") return [0, 1, 2, 3];
        else if (duration === "3-6") return [3, 4, 5, 6];
        else if (duration === "6-12") return [6, 7, 8, 9, 10, 11, 12];
      })
      .flat();

    // filter companies that have months selected by the user
    filteredCompanies = filteredCompanies.filter((company) =>
      monthCount.includes(company.duration)
    );
  }

  // ---------filter by location------------//
  if (filter.location) {
    filteredCompanies = filteredCompanies.filter((company) =>
      company.state.toLowerCase().includes(filter.location.toLowerCase())
    );
  }

  // ------filter by field-------------
  // to get the fields that have been checked by the user

  const filteredField = filter.field
    .filter((field) => field.checked === true)
    .map((field) => field.industry);

  if (filteredField.length) {
    filteredCompanies = filteredCompanies.filter((company) =>
      filteredField.includes(company.industry.trim())
    );
  }

  return filteredCompanies;
};
