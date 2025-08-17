//Este layout se encarga de mostrar cada sección de productos y acomodarlos según orden de agregado en la base de datos.
//Depende de api/products/route.ts

'use client';
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook, Music2} from "lucide-react";
import { useRouter } from "next/navigation";
import  Link  from "next/link";

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

    const handleCarritoClick = () => router.push("/carrito");
    const handleComprasClick = () => router.push("/");
  

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
  <button onClick={handleCarritoClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">CARRITO</button>
  <button onClick={handleComprasClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">MIS COMPRAS</button>
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
              <li><button onClick={() =>{setMenuOpen(false); handleCarritoClick();}}>CARRITO</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handleComprasClick();}}>MIS COMPRAS</button></li>
            </ul>
          </nav>
        )}
      </header>
      <div className="flex flex-col min-h-screen bg-white">
  {/* Contenido */}
  <main className="flex-1 pt-20 pb-10">
    <h2 className="text-3xl font-bold pl-10 text-black">
      {category.toUpperCase()}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-7 px-6 justify-items-center">
      {products.map((p: Product) => (
        <Link
          key={p._id}
          href={`/productos/${p._id}`}
          className="bg-gray-100 border p-3 rounded-lg shadow hover:shadow-lg transition w-full max-w-sm"
        >
          <img
            src={p.imageUrl}
            alt={p.name}
            className="w-full h-96 object-cover mb-3 rounded-md"
          />
          <h3 className="font-semibold text-black text-center">{p.name}</h3>
          <p className="text-black text-center">${p.price.toLocaleString()}</p>
          <p className="text-sm text-gray-500 text-center">
            3 cuotas sin interés de ${(p.price / 3).toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
    <p className="text-center text-black text-lg font-medium mt-25">
        No está lo que te gusta? Pronto renovaremos stock.
      </p>
  </main>

  {/* Footer */}
  <footer className="bg-black text-white py-5 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Información */}
        <div>
          <p className="text-sm text-gray-400">
            Información: esta es una tienda ficticia creada como mini proyecto
            para mi portfolio personal. Las funciones están simplificadas. Para
            más información leer README.md
          </p>
        </div>

        {/* Centro */}
        <div className="text-center">
          <p className="text-sm text-gray-200">Developed by Eze</p>
        </div>

        {/* Redes */}
        <div className="flex justify-center md:justify-end space-x-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <Music2 className="h-6 w-6" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <Facebook className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>
    </div>
  );
}
