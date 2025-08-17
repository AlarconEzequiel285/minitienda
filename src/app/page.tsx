"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Truck, CreditCard, Headphones, Instagram, Music2, Facebook, Menu, X} from "lucide-react";
import { Swiper, SwiperSlide} from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";


export default function Home() {
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

  const [scrolled, setScrolled] = useState(false);// Header transparente segun el scroll del usuario
  const [menuOpen, setMenuOpen] = useState(false); //Menu hamburguersa responsive

  //Sección creá, mostrá e innová adaptada para escritorio y moviles con un carrusel (carrusel solo en este ultimo)
  const items = [
    { title: "creá", src: "/images/crea.jpg" },
    { title: "mostrá", src: "/images/mostra.jpg" },
    { title: "innová", src: "/images/innova.jpg" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120); // elapse time eraser para que el header se vuelva blanco al scrollear hacia abajo
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Sube suavemente al inicio al hacer click en el logo de la pagina del header
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-white shadow" : "bg-transparent"}`}>
  <div className="w-full px-4 sm:px-6 lg:px-5">
    <div className="flex items-center justify-between h-16">

      {/* Botones de escritorio */}
      {scrolled && (
      <div className="hidden md:flex space-x-4">
        <button className={`text-sm font-medium ${scrolled ? "text-black" : "text-white"}`}>SALE</button>
        <button onClick={handleCamperasClick} className={`text-sm font-medium ${scrolled ? "text-black hover:scale-110 transition-transform" : "text-white"}`}>CAMPERAS</button>
        <button onClick={handleRemerasClick} className={`text-sm font-medium ${scrolled ? "text-black hover:scale-110 transition-transform" : "text-white"}`}>REMERAS</button>
        <button onClick={handlePantalonesClick} className={`text-sm font-medium ${scrolled ? "text-black hover:scale-110 transition-transform" : "text-white"}`}>PANTALONES</button>
       </div>
      )}

      {/* Nombre de la tienda */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={handleHomeClick}
          className="text-2xl font-bold text-black hover:scale-110 transition-transform duration-300 cursor-pointer"
        >
          WATERMELON SUGAR
        </button>
      </div>

      {/* Botones de escritorio a la derecha */}
      {scrolled && (
      <div className="hidden md:flex space-x-3">
        <button className={`text-sm font-medium ${scrolled ? "text-black" : "text-white"}`}>CARRITO</button>
        <button className={`text-sm font-medium ${scrolled ? "text-black" : "text-white"}`}>MIS COMPRAS</button>
      </div>
      )}

      {/* Botón hamburguesa móvil */}
      <div className="md:hidden flex-shrink-0 ">
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
            <h2 className="text-4xl font-semibold text-white mt-50">
              creá, mostrá, innova
            </h2>
          </div>
        </div>
      </main>

      {/* Nueva sección con ANTICIPO SEASON 26 */}
      <section className="bg-white py-9">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Texto principal centrado */}
            <div className="flex-1 text-center">
              <h3 className="text-3xl font-bold text-black">
                ENFANT DE DIEU // 26&apos;s SEASON
              </h3>
            </div>
          </div>
            {/* Información adicional a la derecha */}
            <div className="flex-1 text-center">
              <p className="text-sm text-gray-600">
                (locales y online, envíos sin cargo a partir de $100.000)
              </p>
            </div>
        </div>
      </section>

{/* Sección con creá, mostrá, innová */}
<section className="bg-white py-5">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Desktop: fila de tres */}
    <div className="hidden md:flex justify-center items-start gap-8">
      {items.map((item) => (
        <div key={item.title} className="flex-1 text-center w-full md:w-auto">
          <h4 className="text-3xl font-semibold text-black mb-4">{item.title}</h4>
          <div className="relative mx-auto w-[500px] h-[400px] max-w-full">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="rounded-lg shadow-lg mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
            />
          </div>
        </div>
      ))}
    </div>
        {/* Mobile: carrusel con autoplay */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]} // Activar autoplay
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 2000, // Cambia cada 3 segundos
              disableOnInteraction: false, // No se detiene si el usuario lo toca
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.title}>
                <div className="text-center">
                  <h4 className="text-2xl font-semibold text-black mb-4">{item.title}</h4>
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="rounded-lg shadow-lg mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>



{/* Sección con recomendaciones de la marca */}
<section className="bg-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h3 className="text-3xl font-bold text-black mb-8">
        Recomendaciones de la casa
      </h3>
    </div>

    {/* Contenedor flexible con espacio */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-12">
      {/* Contenedor 1: Hombre */}
      <div className="text-center w-full md:w-auto">
        <h4 className="text-2xl text-black mb-6">Caballeros</h4>
        <div className="relative mx-auto w-[700px] h-[400px] max-w-full">
          <Image
            src="/images/diego.jpg"
            alt="Hombre"
            fill
            className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer object-cover"
          />
        </div>
      </div>

      {/* Contenedor 2: Mujer */}
      <div className="text-center w-full md:w-auto">
        <h4 className="text-2xl text-black mb-6">Damas</h4>
        <div className="relative mx-auto w-[700px] h-[400px] max-w-full">
          <Image
            src="/images/margaret.jpg"
            alt="Mujer"
            fill
            className="rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>






    {/* Sección Beneficios*/}
<section className="bg-white py-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
      
      {/* Envío gratis */}
      <div>
        <Truck className="mx-auto h-10 w-10 text-black mb-4" />
        <h4 className="text-lg font-semibold text-black">Envío gratis</h4>
        <p className="text-sm text-gray-600">a partir de $100.000</p>
      </div>

      {/* 3 cuotas sin interés */}
      <div>
        <CreditCard className="mx-auto h-10 w-10 text-black mb-4" />
        <h4 className="text-lg font-semibold text-black">3 cuotas sin interés</h4>
        <p className="text-sm text-gray-600">con todas las tarjetas</p>
      </div>

      {/* Atención al cliente */}
      <div>
        <Headphones className="mx-auto h-10 w-10 text-black mb-4" />
        <h4 className="text-lg font-semibold text-black">Atención al cliente</h4>
        <p className="text-sm text-gray-600">contactanos +123456789</p>
      </div>

    </div>
  </div>
</section>
{/* Footer */}
<footer className="bg-black text-white py-5 mt-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      
      {/* Información */}
      <div className="text-sm text-gray-400">
        Información: esta es una tienda ficticia creada como mini proyecto para mi portfolio personal.  
        Las funciones están simplificadas. Para más información leer README.md
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
