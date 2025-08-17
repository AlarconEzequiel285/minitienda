// Script para insertar 3 remeras de prueba sin stock, usando fetch nativo de Node 22+

const products = [
  {
    name: "Remera Negra",
    category: "remeras",
    price: 90000,
    imageUrl: "/images/remeras/negra.jpg"
  },
  {
    name: "Remera Roja",
    category: "remeras",
    price: 90000,
    imageUrl: "/images/remeras/roja.jpg"
  },
  {
    name: "Remera Especial",
    category: "remeras",
    price: 150000,
    imageUrl: "/images/remeras/dibujo.jpg"
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

