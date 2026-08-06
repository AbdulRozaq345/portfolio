

// Define interface biar TS nggak pusing
export interface Product {
  title: string;
  link: string;
  thumbnail: string[]; // Karena lu pake logic carousel, ini harus array string
  location?: string;   // Tambahan buat Card di page "Recent Work" nanti
  dev?: string;
}
export const products: Product[] = [
  {
    title: "KediriKita",
    link: "https://www.kedirikita.id/",
    thumbnail: ["/KediriKita.png"],
    location: "Indonesia",
    dev: "Nexxacodeid team",
  },
  {
    title: "AikoCare",
    link: "https://aikocare.vercel.app/",
    thumbnail: ["/aikocare.png"], // Gue bikin array string biar aman
    location: "Indonesia",
    dev: "Fang Xiao",
  },
  {
    title: "ThunderAi (Demo Version)",
    link: "https://chat-ai-sigma.vercel.app/",
    thumbnail: ["/thunderAi.png"],
    location: "Indonesia",
    dev: "Fang Xiao",
  },
  {
    title: "YayasanNivara",
    link: "https://yayasan-nivara-indonesia.vercel.app/",
    thumbnail: ["/yayasannivara.png"],
    location: "Indonesia",
    dev: "Fang Xiao",
  },
  {
    title: "Nocturn",
    link: "https://nocturn.web.id/",
    thumbnail: ["/nocturn.png"],
    location: "Indonesia",
    dev: "Fang Xiao",
  },
  
];
