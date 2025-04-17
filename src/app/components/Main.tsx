"use client"
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Post = {
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
  selectedCategories: string[];
}

const ITEMS_PER_LOAD = 10;

export default function Home({ selectedCategories }: MainProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("c");
  const [filter, setFilter] = useState<string>("4");
  const [sortKey, setSortKey] = useState<keyof Post | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  
   // Fetch when dropdowns change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
    if (category && filter) {
      fetchData(category, filter);
    }
  }, [category, filter]);

  const fetchData = (categoryVal: string, filterVal: string): void => {
    setLoading(true);
    setError(null);

    const query = `${categoryVal}${filterVal}`;

    fetch(`/api/${query}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
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

  const sortedPosts = [...posts].sort((a, b) => {
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

  const handleSort = (key: keyof Post) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredPosts = sortedPosts.filter((post) => {
    const matchesSearch =
      post.con.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.brn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) => Number(post[cat as keyof Post]) > 0);

    return matchesSearch && matchesCategory;
  });
  
  const visibleItems = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => {
    if (!hasMore) return;
  
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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
    <div className="min-h-screen p-6 mt-24 col-start-3 col-end-13">
      
      <div className="flex items-center gap-4 w-full pt-6">
        <div>
        <select
          className="p-2 m-4 rounded border cursor-pointer border-gray-300 bg-white/50"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option className='cursor-pointer' value="c">Cutoffs</option>
          <option className='cursor-pointer' value="r">Ranks</option> 
        </select>
        

        <select
          className="p-2 m-4 rounded border border-gray-300 cursor-pointer bg-white/50"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="4">2024</option>
          <option value="3">2023</option>
          <option value="2">2022</option>
          <option value="1">2021</option>
          <option value="0">2020</option>
        </select>
        </div>
        <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded border border-gray-300 w-96 bg-white/50 placeholder-gray-800"
        />

        </div>
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

          {(selectedCategories.length === 0 ? ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"] : 
            selectedCategories).map((cat) => (
            <div key={cat} className='justify-items-center' onClick={() => handleSort(cat as keyof Post)}>
              <div className='cursor-pointer  flex gap-1 items-center'>
               <p className={`uppercase transition-colors duration-200 
                ${sortKey === cat ? 'text-red-600' : 'text-gray-800'}`}>{cat}</p>

               {(sortKey === cat as keyof Post) && (<span className="text-xs text-red-600 transition-transform duration-200">
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

        {!loading && !error && visibleItems.map((post) => (
          <li key={post._id} className="border overflow-clip overflow-hidden rounded-sm cursor-pointer p-6 mx-auto grid grid-cols-12 gap-4 
          bg-white/50 hover:shadow-lg mb-6 h-40 duration-600">

            <div className='col-start-1 col-end-4 cursor-pointer justify-items-center'>
              <p className="font-semibold mb-2 text-center text-gray-800">{post.con}</p>
              <p className="mb-2 text-gray-400 align-center">{post.coc}</p>
            </div>
            <div className='col-start-4 col-end-6 justify-items-center'>
              <p className="font-semibold mb-2 text-center text-blue-400">{post.brn}</p>
              <p  className="mb-2 text-gray-400">{post.brc}</p>
            </div>
            {(selectedCategories.length === 0 ? ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"] : 
            selectedCategories).map((cat) => (
                <div key={cat} className='text-gray-800 justify-items-center'>
                  <p> {Number(post[cat as keyof Post]) ? Math.round(Number(post[cat as keyof Post]) * 100) / 100 : "-"}</p>
                </div>
              ))}
          </li>
        ))}
         {hasMore && <div ref={loaderRef} className="h-10" />}
      </ul>
    </div>
  );
}