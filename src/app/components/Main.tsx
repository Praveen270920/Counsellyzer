"use client"
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Collagelist = {
  _id: number;
  con: string;
  brn: string;
  coc: number;
  brc: string;
   OC: number;
   BC: number;
  BCM: number;
  MBC: number;
   SC: number;
  SCA: number;
   ST: number;
};

interface MainProps {
  selectedfilters: string[];
}

const ITEMS_PER_LOAD = 10;

export default function Home({ selectedfilters }: MainProps) {
  const [collagelists, setCollagelists] = useState<Collagelist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cutoff, setCutoff] = useState<string>("c");
  const [year, setYear] = useState<string>("4");
  const [sortKey, setSortKey] = useState<keyof Collagelist | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  
   // Fetch when dropdowns change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
    if (cutoff && year) {
      fetchData(cutoff, year);
    }
  }, [cutoff, year]);

  const fetchData = (cutoff: string, year: string): void => {
    setLoading(true);
    setError(null);

    const data = `${cutoff}${year}`;

    fetch(`/api/${data}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((res) => {
        setCollagelists(res);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sortedcollagelists = [...collagelists].sort((a, b) => {
    if (!sortKey) return 0;
  
    const valA = a[sortKey];
    const valB = b[sortKey];
  
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
  
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
  
    return 0;
  });

  const handleSort = (key: keyof Collagelist) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredcollagelists = sortedcollagelists.filter((collagelist) => {
    const matchesSearch =
      collagelist.con.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collagelist.brn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedfilters.length === 0 ||
      selectedfilters.some((cat) => Number(collagelist[cat as keyof Collagelist]) > 0);

    return matchesSearch && matchesCategory;
  });
  
  const visibleCollagelists = filteredcollagelists.slice(0, visibleCount);
  const hasMore = visibleCount < filteredcollagelists.length;

  useEffect(() => {
    if (!hasMore) return;
  
    const observer = new IntersectionObserver((collagelist) => {
      if (collagelist[0].isIntersecting) {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      }
    });
  
    const currentLoader = loaderRef.current;
  
    if (currentLoader instanceof Element) {
      observer.observe(currentLoader);
    }
  
    return () => {
      if (currentLoader instanceof Element) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore]);  

  return (
    <div className="min-h-screen p-6 mt-24 col-start-5 col-end-11">
      <div className='ml-24 w-1/2 flex items-center justify-center border border-2 rounded-lg'>
        <input
          type="text"
          placeholder="Search colleges by name or location or branch  .  .  ."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-l-lg w-full bg-gray-50 placeholder-gray-800"
        />
        <select
          className="p-2 cursor-pointer border-gray-300 bg-gray-50"
          value={cutoff}
          onChange={(e) => setCutoff(e.target.value)}
        >
          <option className='cursor-pointer' value="c">Cutoffs</option>
          <option className='cursor-pointer' value="r">Ranks</option>
        </select>
        <select
          className="p-2 pl-8 cursor-pointer bg-gray-50"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option className='text-gray-600' value="4">2024</option>
          <option className='text-gray-600' value="3">2023</option>
          <option className='text-gray-600' value="2">2022</option>
          <option className='text-gray-600' value="1">2021</option>
          <option className='text-gray-600' value="0">2020</option>
        </select>
        <button onClick={() => { /* Handle Search Button Action */ }}
          className="pl-8 p-2 rounded-r-lg bg-gray-50 hover:bg-blue-500 focus:outline-none"
          >
          Search
        </button>
      </div>

        <div className='mx-auto grid grid-cols-12 gap-4 bg-grey-500 px-8 pt-8 pb-4'>

          <div className='col-start-1 col-end-2 items-center'>
            <p className='uppercase font-semibold text-center text-gray-800'>sort by :</p>
          </div>

          <div className='col-start-2 col-end-4 cursor-pointer flex gap-1 items-center justify-items-start'
           onClick={() => handleSort('con')}>
            <p className={`capitalize transition-colors duration-200 
              ${sortKey === 'con' ? 'text-red-600' : 'text-gray-800'}`}>college name</p>

            {(sortKey === 'con') && (<span className="text-xs text-red-600 transition-transform duration-200">
              {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}</span>)}
          </div>

          <div className='col-start-4 col-end-6 justify-items-center'onClick={() => handleSort('brn')}>
            <div className='cursor-pointer flex gap-1 items-center'>
            <p className={`capitalize transition-colors duration-200 
              ${sortKey === 'brn' ? 'text-red-600' : 'text-gray-800'}`}>branch name</p>

            {(sortKey === 'brn') && (<span className="text-xs text-red-600 transition-transform duration-200">
              {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}</span>)}
            </div>
          </div>

          {(selectedfilters.length === 0 ? ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"] : 
            selectedfilters).map((cat) => (
            <div key={cat} className='justify-items-center' onClick={() => handleSort(cat as keyof Collagelist)}>
              <div className='cursor-pointer  flex gap-1 items-center'>
               <p className={`uppercase transition-colors duration-200 
                ${sortKey === cat ? 'text-red-600' : 'text-gray-800'}`}>{cat}</p>

               {(sortKey === cat as keyof Collagelist) && (<span className="text-xs text-red-600 transition-transform duration-200">
                {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}</span>)}
               </div>
            </div>
          ))}  
        </div>

      <ul>
        {loading && <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>}

        {error && <p className="text-center cursor-pointer text-red-500">Error: {error}</p>}

        {!loading && !error && visibleCollagelists.map((collagelist) => (
          <li key={collagelist._id} className="border overflow-clip overflow-hidden rounded-sm cursor-pointer p-4 mx-auto grid grid-cols-12 gap-2
          bg-gray-50 hover:shadow-lg mb-4 h-32 duration-600">

            {/* <div className="font-medium">
              <div>{collagelist.con}</div>
              <div className="text-xs text-muted-foreground">{collagelist.coc}</div>
            </div> */}

            <div className='col-start-1 col-end-4 cursor-pointer justify-items-center'>
              <p className="mb-2 text-center text-gray-800">{collagelist.con}</p>
              <p className="mb-2 text-gray-400 align-center">{collagelist.coc}</p>
            </div>
            <div className='col-start-4 col-end-6 justify-items-center'>
              <p className="capitalize mb-2 text-center text-gray-800">{collagelist.brn}</p>
              <p  className="mb-2 text-gray-400">{collagelist.brc}</p>
            </div>
            {(selectedfilters.length === 0 ? ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"] : 
            selectedfilters).map((cat) => (
                <div key={cat} className='text-gray-800 justify-items-center'>
                  <p> {Number(collagelist[cat as keyof Collagelist]) ? Math.round(Number(collagelist[cat as keyof Collagelist]) * 100) / 100 : "-"}</p>
                </div>
              ))}
          </li>
        ))}
         {hasMore && <div ref={loaderRef} className="h-10" />}
      </ul>
    </div>
  );
}