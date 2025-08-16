"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  // Header transparente segun el scroll del usuario
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120); // elapse time eraser para que el header se vuelva blanco al scrollear hacia abajo
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Redirecciona al home al hacer click en watermelon sugar del header
  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white shadow" : "bg-transparent"}`}>        
        <div className="w-full px-4 sm:px-6 lg:px-5">
          <div className="flex items-center justify-between h-16">
            {/* Botones de navegación a la izquierda */}
            <div className="flex items-center space-x-4">
              <button className={`text-sm font-medium transition-all duration-500 ${scrolled ? "text-gray-900 opacity-100" : "text-white opacity-0"}`}>
                SALE
              </button>
              <button className={`text-sm px-2 font-medium transition-all duration-500 ${scrolled ? "text-gray-900 opacity-100" : "text-white opacity-0"}`}>
                CAMPERAS
              </button>
              <button
                className={`text-sm px-2 font-medium transition-all duration-500 ${scrolled ? "text-gray-900 opacity-100" : "text-white opacity-0"}`}>
                REMERAS
              </button>
              <button
                className={`text-sm px-2 font-medium transition-all duration-500 ${scrolled ? "text-gray-900 opacity-100" : "text-white opacity-0"}`}>
                PANTALONES
              </button>
            </div>

            {/* Nombre de la tienda */}
            <div className="flex-1 flex justify-center mr-35">
              <button 
                onClick={handleHomeClick} 
                className="text-2xl font-bold text-black hover:scale-110 transition-transform duration-300 cursor-pointer"
              >
                WATERMELON SUGAR
              </button>
            </div>

            {/* Botones del carrito y mis compras a la derecha */}
            <div className="flex items-center space-x-3">
              <button className={`text-sm px-8 font-medium transition-all duration-500 ${scrolled ? "text-gray-900 opacity-100" : "text-white opacity-0"}`}>
                CARRITO
              </button>
              <button className={`text-sm font-medium transition-all duration-500 ${scrolled ? "text-gray-900 opacity-100" : "text-white opacity-0"}`}>
                MIS COMPRAS
              </button>
            </div>
          </div>
        </div>
      </header>
          

      {/* Contenido principal */}
      <main className="relative h-screen">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/firstbg.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Contenido sobre la imagen de fondo */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-50">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-white mb-10">
              creá, mostrá, innova
            </h2>
            <p className="text-white text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
