"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrls = [
      { key: "c0", url: "c0" },
      { key: "c1", url: "c1" },
      { key: "c2", url: "c2" },
      { key: "c3", url: "c3" },
      { key: "c4", url: "c4" },
      { key: "r0", url: "r0" },
      { key: "r1", url: "r1" },
      { key: "r2", url: "r2" },
      { key: "r3", url: "r3" },
      { key: "r4", url: "r4" },
    ];

    const fetchData = async () => {
      try {
        const results = await Promise.all(
          apiUrls.map(api =>
            fetch(`http://127.0.0.1:8080//${api.url}`).then(res => res.json())
          )
        );

        const updatedData = apiUrls.reduce((acc: { [key: string]: any[] }, api, index) => {
          acc[api.key] = results[index] || []; // Handle undefined data
          return acc;
        }, {} as { [key: string]: any[] });

        setData(updatedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h1>Loading data...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="flex justify-end inline-block align-end w-3/4">
      {Object.keys(data).map((key) => (
        <div key={key} className="flex justify-end inline-block w-3/4">
          <div className="flex justify-end w-3/4 inline-block">
            {data[key].length > 0 ? (
              data[key].map((item, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-lg shadow">
                  {item.con}
                </div>
              ))
            ) : (
              <p>No data found</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
