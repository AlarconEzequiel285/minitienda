"use client";
import { Product } from "@/lib/getProduct";
import { FaCcVisa, FaCcMastercard, FaCcApplePay, FaCcAmazonPay, FaPaypal, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Instagram, Facebook, Music2} from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);

  const router = useRouter();

  // Funciones de navegación
  const handleCamperasClick = () => router.push("/camperas");
  const handleRemerasClick = () => router.push("/remeras");
  const handlePantalonesClick = () => router.push("/pantalones");
  const handleMainPageClick = () => router.push("/");
  const handleCarritoClick = () => router.push("/carrito");
  const handleComprasClick = () => router.push("/");

  // Función para agregar al carrito
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      if (res.ok) {
        const data = await res.json();

        // Guardamos el carrito actualizado en estado
        setCart(data.cart || []);

        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // mensaje desaparece después de 2s
      } else {
        console.error("Error agregando al carrito");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
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
        <main className="p-4 flex-1 flex justify-center pt-15">
          <div className="p-6 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {/* Imagen del producto */}
            <div className="flex justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full max-w-md md:max-w-lg h-auto rounded shadow-lg object-contain"
              />
            </div>
            {/* Información del producto */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold text-black">{product.name}</h1>
              <p className="text-2xl text-green-700 font-semibold">
                ${product.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 -mt-2">
                3 cuotas sin interés de ${(product.price / 3).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Actualmente trabajamos con los siguientes métodos de pago:</p>
              <div className="flex gap-4 -mt-1">
                <div className="text-blue-500 text-4xl"><FaCcVisa/></div>
                <div className="text-red-500 text-4xl"><FaCcMastercard/></div>
                <div className="text-black text-4xl"><FaCcApplePay/></div>
                <div className="text-gray-600 text-4xl"><FaCcAmazonPay/></div>
                <div className="text-blue-900 text-4xl"><FaPaypal/></div>
              </div>

              {/* Botón funcional para agregar al carrito */}
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="bg-black text-white px-5 py-3 rounded-4xl hover:bg-gray-800 transition font-semibold mt-5"
              >
                {loading ? "Agregando..." : "Agregar al carrito"}
              </button>

              {/* Mensaje de confirmación */}
              <div>
              {added && (
                <p className="absolute text-green-600 font-semibold ml-3">Producto agregado al carrito.</p>
              )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white py-5 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Información */}
              <div>
                <p className="text-sm text-gray-400">Información: esta es una tienda ficticia creada como mini proyecto para mi portfolio personal.  Las funciones están simplificadas. Para más información leer README.md</p>
              </div>
              {/* Centro */}
              <div className="text-center">
                <p className="text-sm text-gray-200">Developed by Eze</p>
              </div>
              {/* Redes */}
              <div className="flex justify-center md:justify-end space-x-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                  <FaTiktok className="h-6 w-6" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                  <FaFacebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
