'use client';
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook, Music2} from "lucide-react";
import { useRouter } from "next/navigation";


interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

interface Props {
  category: string;
}

export default function CategorySection({ category }: Props) {

  const [products, setProducts] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

    //Redirecciones 
    const router = useRouter();

    //Redirección a camperas desde el header
    const handleCamperasClick = () => {
      router.push("/camperas");
    };
  
    //Redirección a remeras desde el header
    const handleRemerasClick = () => {
    router.push("/remeras");
    };
  
    //Redirección a remeras desde el header
    const handlePantalonesClick = () => {
    router.push("/pantalones");
    };

    //Redirección a main page desde Header
    const handleMainPageClick = () => {
    router.push("/");
    };


  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          const filtered: Product[] = data.products.filter((p: Product) => p.category === category);
          setProducts(filtered);
        }
      } catch (err) {
        console.error(err);
      } 
    }
    fetchProducts();
  }, [category]);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 bg-white`}>
        <div className="w-full px-4 sm:px-6 lg:px-5">
          <div className="flex items-center justify-between h-16">
                {/* Botones de escritorio (categorías) */}
                <div className="hidden md:flex space-x-4">
                <button className="text-sm font-medium text-black">SALE</button>
                <button onClick={handleCamperasClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">CAMPERAS</button>
                <button onClick={handleRemerasClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">REMERAS</button>
                <button onClick={handlePantalonesClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">PANTALONES</button>
                </div>
            {/* Nombre de la tienda */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={handleMainPageClick}
                className="text-2xl font-bold text-black hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                WATERMELON SUGAR
              </button>
            </div>

{/* Botones de escritorio a la derecha */}
<div className="hidden md:flex space-x-3">
  <button className="text-sm font-medium text-black">CARRITO</button>
  <button className="text-sm font-medium text-black">MIS COMPRAS</button>
</div>

            {/* Botón hamburguesa móvil */}
            <div className="md:hidden flex-shrink-0">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={28} color="black" /> : <Menu size={28} color="black" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <nav className="md:hidden absolute top-16 bg-white shadow-lg border-t border-gray-200 w-full">
            <ul className="flex flex-col items-center py-4 space-y-4 text-gray-700">
              <li><button onClick={() => setMenuOpen(false)}>SALE</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handleCamperasClick();}}>CAMPERAS</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handleRemerasClick();}}>REMERAS</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handlePantalonesClick();}}>PANTALONES</button></li>
              <li><button onClick={() => setMenuOpen(false)}>CARRITO</button></li>
              <li><button onClick={() => setMenuOpen(false)}>MIS COMPRAS</button></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Contenido */}
      <main className="pt-20 p-4">
        <h2 className="text-3xl font-bold mb-4 text-black">{category.toUpperCase()}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p: Product) => (
            <div key={p._id} className="border p-2 rounded shadow hover:shadow-lg transition">
              <img src={p.imageUrl} alt={p.name} className="w-full h-120 object-cover mb-2" />
              <h3 className="font-semibold text-black text-center">{p.name}</h3>
              <p className="text-black text-center">${p.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 text-center">3 cuotas sin interés de ${(p.price/3).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
    <footer className="bg-black text-white py-5 mt-31">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      
      {/* Información */}
      <div className="">
        <p className="text-sm text-gray-400">Información: esta es una tienda ficticia creada como mini proyecto para mi portfolio personal.  
        Las funciones están simplificadas. Para más información leer README.md</p>
      </div>

      {/* Centro */}
      <div className="text-center">
        <p className="text-sm text-gray-200">Developed by Eze</p>
      </div>

      {/* Redes */}
      <div className="flex justify-center md:justify-end space-x-6">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
          <Instagram className="h-6 w-6" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
          <Music2 className="h-6 w-6" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
          <Facebook className="h-6 w-6" />
        </a>
      </div>

    </div>
  </div>
</footer>
    </div>
  );
}
