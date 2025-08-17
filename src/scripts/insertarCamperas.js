// Script para insertar 3 camperas de prueba sin stock, usando fetch nativo de Node 22+

const products = [
    {
      name: "Campera Negra",
      category: "camperas",
      price: 150000,
      imageUrl: "/images/camperas/negra.jpg"
    },
    {
      name: "Campera Violeta",
      category: "camperas",
      price: 150000,
      imageUrl: "/images/camperas/violeta.jpg"
    },
    {
      name: "Campera Azul",
      category: "camperas",
      price: 150000,
      imageUrl: "/images/camperas/azul.jpg"
    }
  ];
  
  async function insertProducts() {
    for (const p of products) {
      try {
        const res = await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p)
        });
  
        const data = await res.json();
        console.log("Inserted:", data);
      } catch (error) {
        console.error("Error al insertar producto:", error);
      }
    }
  }
  
  insertProducts();
  