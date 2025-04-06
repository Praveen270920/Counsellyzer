"use client"
import { useEffect, useState } from 'react';

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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("c");
  const [filter, setFilter] = useState<string>("4");

  // Fetch when dropdowns change
  useEffect(() => {
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


  return (
    <div className="min-h-screen p-6 mt-24 col-start-3 col-end-13">
      
      <div className="flex items-center justify-between gap-4 w-full">
        <div>
        <select
          className="p-2 m-4 rounded border border-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="c">Cutoffs</option>
          <option value="r">Ranks</option> 
        </select>

        <select
          className="p-2 m-4 rounded border border-gray-300"
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
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded border border-gray-300"
        />

        <button
         // onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 mr-16 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
        </div>
      </div>

      <ul>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && posts.map((post) => (
          <li key={post._id} className="border p-6 mx-auto grid grid-cols-12 gap-4 bg-grey-500 hover:shadow-lg my-6 h-40 duration-800">
            <div className='col-start-1 col-end-4 justify-items-center'>
              <p className="font-semibold mb-6 text-center text-gray-600">{post.con}</p>
              <p className="mb-2 text-gray-400 align-center">{post.coc}</p>
            </div>
            <div className='col-start-4 col-end-6 justify-items-center'>
              <p className="font-semibold mb-6 text-center text-gray-600">{post.brn}</p>
              <p  className="mb-2 text-gray-400">{post.brc}</p>
            </div>
            <div className='text-gray-400 justify-items-center'>
              <p>{Math.round(post.OC * 100) / 100}</p>
            </div>
            <div className='text-gray-400 justify-items-center'>
              <p>{Math.round(post.BC * 100) / 100}</p>
            </div>
            <div className='text-gray-400 justify-items-center'>
              <p>{Math.round(post.BCM * 100) / 100}</p>
            </div>
            <div className='text-gray-400 justify-items-center'>
              <p>{Math.round(post.MBC * 100) / 100}</p>
            </div>
            <div className='text-gray-400 justify-items-center'>
              <p>{Math.round(post.SC * 100) / 100}</p>
            </div>
            <div className='text-gray-400 justify-items-center'>
              <p>{Math.round(post.SCA * 100) / 100}</p>
            </div>
            <div className='text-gray-400 justify-items-center'>
              <p>{Math.round(post.ST * 100) / 100}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}