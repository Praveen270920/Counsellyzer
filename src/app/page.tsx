"use client";
import { useState } from "react";
import Main from "./components/Main";
import Filter from "./components/Filter";


export default function Home() {
  
  const [selectedfilters, setSelectedfilters] = useState<string[]>([]);

  return (

   <div className="grid grid-cols-12 gap-2 min-h-screen bg-white font-sans">

    <Filter selectedfilters={selectedfilters}
        setSelectedfilters={setSelectedfilters}
        />

    <Main selectedfilters={selectedfilters}/>

   </div>

  );
}
