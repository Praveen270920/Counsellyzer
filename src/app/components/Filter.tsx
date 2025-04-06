"use client"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Filters {
  categories: string[];
  colleges: string[];
  branches: string[];
  years: string[];
  quotas: string[];
}


export default function Filter() {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    colleges: [],
    branches: [],
    years: [],
    quotas: [],
  });

  const handleCheckboxChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => {
      const newValues = prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value];
      return { ...prev, [field]: newValues };
    });
  };

  return (
    <div className="col-start-1 col-end-3 my-28 fixed">
      <aside className="bg-white p-4 h-full">
        <h2 className="text-lg text-gray-800 font-bold mb-4">Filters</h2>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 pb-4">Category</h3>
          {["General", "OBC", "SC", "ST"].map((cat) => (
            <div key={cat} className="flex items-center gap-2 pb-4">
              <Checkbox id={cat} onCheckedChange={() => handleCheckboxChange("categories", cat)} />
              <label className="text-gray-600" htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 pb-4">Year</h3>
          {["2024", "2023", "2022"].map((year) => (
            <div key={year} className="flex items-center gap-4 pb-4">
              <Checkbox id={year} onCheckedChange={() => handleCheckboxChange("years", year)} />
              <label className="text-gray-600" htmlFor={year}>{year}</label>
            </div>
          ))}
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 pb-4">Quota</h3>
          {["State Quota", "Management Quota"].map((quota) => (
            <div key={quota} className="flex items-center gap-2">
              <Checkbox id={quota} onCheckedChange={() => handleCheckboxChange("quotas", quota)} />
              <label className="text-gray-600" htmlFor={quota}>{quota}</label>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
