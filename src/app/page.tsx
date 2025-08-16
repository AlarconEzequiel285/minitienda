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
              <button className={`text-sm font-medium transition-all duration-500 ${scrolled ? "text-black opacity-100 hover:scale-110" : "text-white opacity-0"}`}>
                SALE
              </button>
              <button className={`text-sm px-2 font-medium transition-all duration-500 ${scrolled ? "text-black opacity-100 hover:scale-110" : "text-white opacity-0"}`}>
                CAMPERAS
              </button>
              <button
                className={`text-sm px-2 font-medium transition-all duration-500 ${scrolled ? "text-black opacity-100 hover:scale-110" : "text-white opacity-0"}`}>
                REMERAS
              </button>
              <button
                className={`text-sm px-2 font-medium transition-all duration-500 ${scrolled ? "text-black opacity-100 hover:scale-110" : "text-white opacity-0"}`}>
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
              <button className={`text-sm px-8 font-medium transition-all duration-500 ${scrolled ? "text-black opacity-100 hover:scale-110" : "text-white opacity-0"}`}>
                CARRITO
              </button>
              <button className={`text-sm font-medium transition-all duration-500 ${scrolled ? "text-black opacity-100 hover:scale-110" : "text-white opacity-0"}`}>
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

      {/* Nueva sección con ANTICIPO SEASON 26 */}
      <section className="bg-white py-9">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ml-60">
          <div className="flex items-center justify-between">
            {/* Texto principal centrado */}
            <div className="flex-1"></div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">
                ANTICIPO SEASON 26
              </h3>
            </div>
            {/* Información adicional a la derecha */}
            <div className="flex-1 text-right mr-25">
              <p className="text-sm text-gray-600 leading-relaxed">
                (locales y online, envíos sin cargo a partir de $100.000)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección con 3 contenedores */}
      <section className="bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-start gap-15">
            {/* Contenedor 1: creá */}
            <div className="flex-1 text-center">
              <h4 className="text-3xl font-semibold text-gray-900 mb-8">creá</h4>
              <div className="relative w-[500] h-[400px]">
              <Image
                src="/images/crea.jpg"
                alt="Creá"
                fill
                className=" rounded-lg shadow-lg mx-auto hover:scale-110 transition-transform duration-300 cursor-pointer object-cover"
              />
              </div>
            </div>

            {/* Contenedor 2: mostrá */}
            <div className="flex-1 text-center">
              <h4 className="text-3xl font-semibold text-gray-900 mb-8">mostrá</h4>
              <div className="relative w-[500] h-[400px]">
              <Image
                src="/images/mostra.jpg"
                alt="Mostrá"
                fill
                className="rounded-lg shadow-lg mx-auto hover:scale-110 transition-transform duration-300 cursor-pointer object-cover"
              />
              </div>
            </div>

            {/* Contenedor 3: innova */}
            <div className="flex-1 text-center">
              <h4 className="text-3xl font-semibold text-gray-900 mb-8">innová</h4>
              <div className="relative w-[500] h-[400px]">
              <Image
                src="/images/innova.jpg"
                alt="Innova"
                fill
                className="rounded-lg shadow-lg mx-auto hover:scale-110 transition-transform duration-300 cursor-pointer object-cover"
              />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
