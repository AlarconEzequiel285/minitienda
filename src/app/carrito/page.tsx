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

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [removing, setRemoving] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const router = useRouter();

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", { credentials: "include" });
      const data = await res.json();
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, []);

  const handleClearCart = async () => {
    try {
      const res = await fetch("/api/cart", { method: "DELETE", credentials: "include" });
      if (res.ok) setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setRemoving(productId);
    setTimeout(async () => {
      try {
        const res = await fetch("/api/cart/item", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ productId }),
        });
        if (res.ok) {
          const data = await res.json();
          setCart(data.cart || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setRemoving(null);
      }
    }, 200);
  };

  // Navegación
  const handleCamperasClick = () => router.push("/camperas");
  const handleRemerasClick = () => router.push("/remeras");
  const handlePantalonesClick = () => router.push("/pantalones");
  const handleMainPageClick = () => router.push("/");
  const handleCarritoClick = () => router.push("/carrito");
  const handleComprasClick = () => router.push("/compras");

  const cartWithProducts = cart
    .map(item => ({ ...item, product: products.find(p => p._id === item.productId) }))
    .filter(item => item.product);

  const totalPrice = cartWithProducts.reduce(
    (sum, item) => sum + item.quantity * item.product!.price,
    0
  );
  const shipping = totalPrice >= 500_000 ? 0 : 10_000;

  // Finalizar compra
  const handleCheckout = async () => {
    if (cartWithProducts.length === 0) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <--- esto asegura que se use la sessionId
        body: JSON.stringify({
          cart: cartWithProducts,
          total: totalPrice + shipping,
          shipping,
        }),
      });

      if (res.ok) {
        // Vaciar carrito backend
        await fetch("/api/cart", { method: "DELETE", credentials: "include" });

        // Vaciar carrito local
        setCart([]);

        // Redirigir a página de compras
        router.push("/compras");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckoutLoading(false);
    }
  };

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
              <button onClick={handleComprasClick} className="text-sm font-medium text-black hover:scale-110 transition-transform">MIS COMPRAS</button>
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
              <li><button onClick={() =>{setMenuOpen(false); handleComprasClick();}}>MIS COMPRAS</button></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 py-10 w-full pt-28">
        <h1 className="text-2xl text-black mb-8">Mi Carrito</h1>

        {cartWithProducts.length === 0 ? (
          <p className="text-black text-lg">Tu carrito está vacío.</p>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-3xl">
            {cartWithProducts.map(item => (
              <div key={item.productId} className={`flex items-center gap-6 bg-gray-200 p-4 rounded-xl shadow transition-all duration-300 transform ${removing === item.productId ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                <img src={item.product!.imageUrl} alt={item.product!.name} className="w-28 h-28 object-contain rounded"/>
                <div className="flex flex-col justify-center flex-1">
                  <h2 className="text-xl font-semibold text-black">{item.product!.name} {item.quantity > 1 && `x${item.quantity}`}</h2>
                  <p className="text-lg text-black mt-1">${(item.product!.price * item.quantity).toLocaleString()}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.productId)} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">Eliminar</button>
              </div>
            ))}

            <div className="bg-gray-200 p-4 rounded-xl shadow flex flex-col gap-2 text-black mt-4">
              <div className="flex justify-between"><span className="font-semibold">TOTAL:</span><span className="font-semibold">${totalPrice.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="font-semibold">ENVÍO:</span><span className="font-semibold">{shipping === 0 ? "GRATIS" : `$${shipping.toLocaleString()}`}</span></div>
              <div><span className="text-gray-500">(sin la promoción, todos los envíos tienen una tarifa de $10.000)</span></div>
            </div>

            <div className="flex justify-end gap-4 mt-4 items-center">
              <button onClick={handleClearCart} className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition font-semibold">Vaciar carrito</button>
              <button onClick={handleCheckout} disabled={checkoutLoading} className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition font-semibold">
                {checkoutLoading ? "Procesando..." : "Finalizar Compra"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-5 mt-auto w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <p className="text-sm text-gray-400">
                Información: esta es una tienda ficticia creada como mini proyecto para mi portfolio personal. Las funciones están simplificadas. Para más información leer README.md
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
