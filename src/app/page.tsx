
import Main from "./components/Main";
import Filter from "./components/Filter";


export default function Home() {
  return (
   <div className="grid grid-cols-12 gap-2">
    <Filter/>
    <Main/>
   </div>
  );
}
