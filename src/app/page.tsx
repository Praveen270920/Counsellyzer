"use client";
import { useState } from "react";
import Main from "./components/Main";
import Filter from "./components/Filter";


export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
   <div className="grid grid-cols-12 gap-2">
    <Filter selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        />
    <Main selectedCategories={selectedCategories}/>
   </div>
  );
}
