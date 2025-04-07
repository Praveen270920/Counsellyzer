"use client"
interface FiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export default function Filter({ selectedCategories, setSelectedCategories }: FiltersProps) {
  const handleCheckboxChange = (value: string) => {
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter((item) => item !== value)
      : [...selectedCategories, value];
    setSelectedCategories(updated);
  };

  return (
    <div className="col-start-1 col-end-3 my-28 fixed">
      <aside className="bg-white p-4 h-full">
        <h2 className="text-lg text-gray-800 font-bold mb-4">Filters</h2>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-600 pb-4">Category</h3>
          {["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"].map((cat) => (
            <div key={cat} className="flex items-center gap-2 pb-4">
              <input
                type="checkbox"
                id={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCheckboxChange(cat)}
              />
              <label className="text-gray-600" htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
