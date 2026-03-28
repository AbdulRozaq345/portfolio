// app/work/page.js
import { WorkCard } from "@/components/WorkCard"; 
import { products } from "@/constans/work"; // <--- NGAMBIL DATA DARI GUDANG

export default function Page() {
  return (
    <WorkCard items={products} /> 
  );
}