'use client';
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

interface Purchase {
  id: string;
  userId: string;
  cart: CartItem[];
  total: number;
  shipping: number;
  date: string;
}

export default function ComprasPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch("/api/checkout");
        if (res.ok) {
          const data = await res.json();
          setPurchases(data.purchases || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPurchases();
  }, []);

  // Navegación
  const handleCamperasClick = () => router.push("/camperas");
  const handleRemerasClick = () => router.push("/remeras");
  const handlePantalonesClick = () => router.push("/pantalones");
  const handleMainPageClick = () => router.push("/");
  const handleCarritoClick = () => router.push("/carrito");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-5">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex space-x-4">
              <button className="text-sm font-medium text-black">SALE</button>
              <button onClick={handleCamperasClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">CAMPERAS</button>
              <button onClick={handleRemerasClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">REMERAS</button>
              <button onClick={handlePantalonesClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">PANTALONES</button>
            </div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <button onClick={handleMainPageClick} className="text-2xl font-bold text-black hover:scale-110 transition-transform duration-300 cursor-pointer">
                WATERMELON SUGAR
              </button>
            </div>
            <div className="hidden md:flex space-x-3">
              <button onClick={handleCarritoClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">CARRITO</button>
            </div>
            <div className="md:hidden flex-shrink-0">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={28} color="black"/> : <Menu size={28} color="black"/>}
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden absolute top-16 bg-white shadow-lg border-t border-gray-200 w-full">
            <ul className="flex flex-col items-center py-4 space-y-4 text-gray-700">
              <li><button onClick={() => setMenuOpen(false)}>SALE</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handleCamperasClick();}}>CAMPERAS</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handleRemerasClick();}}>REMERAS</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handlePantalonesClick();}}>PANTALONES</button></li>
              <li><button onClick={() =>{setMenuOpen(false); handleCarritoClick();}}>CARRITO</button></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 py-10 w-full pt-28">
        <h1 className="text-2xl text-black mb-8">Mis Compras</h1>

        {purchases.length === 0 ? (
          <p className="text-black text-lg">No tienes compras realizadas.</p>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-3xl">
            {purchases.map(purchase => (
              <div key={purchase.id} className="bg-gray-200 p-4 rounded-xl shadow flex flex-col gap-2">
                <div className="flex justify-between text-black">
                  <span className="font-semibold">Fecha:</span>
                  <span>{new Date(purchase.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span className="font-semibold">Total:</span>
                  <span>${purchase.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span className="font-semibold">Envío:</span>
                  <span>{purchase.shipping === 0 ? "GRATIS" : `$${purchase.shipping.toLocaleString()}`}</span>
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-black mb-1">Productos:</p>
                  <ul className="list-disc list-inside text-black">
                    {purchase.cart.map(item => (
                      <li key={item.productId}>
                        {item.product?.name} x{item.quantity} - ${(item.product!.price * item.quantity).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-5 mt-auto w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <p className="text-sm text-gray-400">
                Información: esta es una tienda ficticia creada como mini proyecto para mi portfolio personal. Las funciones están simplificadas.
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-200">Developed by Eze</p>
            </div>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><FaInstagram className="h-6 w-6" /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors"><FaTiktok className="h-6 w-6" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><FaFacebook className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
