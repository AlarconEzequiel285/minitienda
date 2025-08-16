"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -mt-2">
            {/* Botones de navegación a la izquierda */}
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
                SALE
              </button>
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors px-2">
                CAMPERAS
              </button>
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors px-2">
                REMERAS
              </button>
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors px-2">
                PANTALONES
              </button>
            </div>

            {/*Nombre de la tienda*/}
            <div className="flex-1 flex  justify-center mr-35">
              <h1 className="text-xl font-bold text-gray-900">
                WATERMELON SUGAR
              </h1>
            </div>

            {/* Botones del carrito y mis compras a la derecha */}
            <div className="flex items-center space-x-3">
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors px-8">
                CARRITO
              </button>
              <button className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors">
                MIS COMPRAS
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-black -mt-3"></div>
      </header>
          

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-8 -ml-90">
          {/* Imagen del lado izquierdo */}
          <div className="flex-shrink-0 mt-0">
            <Image
              src="/images/yoru.jpg"
              alt="Yoru"
              width={400}
              height={500}
              className=""
            />
          </div>
          
          {/* Texto en el centro */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              lorem ipsum 
            </h2>
            <p className="text-gray-600 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Imagen del lado derecho */}
          <div className="flex-shrink-0 -mr-86 mt-0">
            <Image
              src="/images/power.jpg"
              alt="Power"
              width={400}
              height={500}
              className=""
            />
          </div>
        </div>
      </main>
    </div>
  );
}
