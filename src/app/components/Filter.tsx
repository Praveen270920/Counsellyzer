"use client"

import { Funnel } from "lucide-react";

interface FiltersProps {
  selectedfilters: string[];
  setSelectedfilters: (filters: string[]) => void;
}

export default function Filter({ selectedfilters, setSelectedfilters }: FiltersProps) {
  const handleCheckboxChange = (value: string) => {
    const updated = selectedfilters.includes(value)
      ? selectedfilters.filter((item) => item !== value)
      : [...selectedfilters, value];
    setSelectedfilters(updated);
  };

  return (
    <div className="col-start-3 col-end-5 my-24">
      <aside className="p-4 border pr-12 rounded-2xl fixed">
        <h2 className="text-lg text-gray-800 font-bold mb-4 flex items-center gap-2"> <Funnel size={20}/> Filters</h2>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 pb-4">Category</h3>
          {["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"].map((cat) => (
            <div key={cat} className="flex items-center gap-2 pb-4 cursor-pointer">
              <input className="cursor-pointer accent-blue-500"
                type="checkbox"
                id={cat}
                checked={selectedfilters.includes(cat)}
                onChange={() => handleCheckboxChange(cat)}
              />
              <label className="text-gray-800 cursor-pointer" htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
