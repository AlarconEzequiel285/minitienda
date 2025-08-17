// Script para insertar 3 pantalones de prueba sin stock, usando fetch nativo de Node 22+

const products = [
    {
      name: "Pantalón Azul",
      category: "pantalones",
      price: 120000,
      imageUrl: "/images/pantalones/azul.jpg"
    },
    {
      name: "Pantalón Gris",
      category: "pantalones",
      price: 120000,
      imageUrl: "/images/pantalones/gris.jpg"
    },
    {
      name: "Pantalón Marrón",
      category: "pantalones",
      price: 120000,
      imageUrl: "/images/pantalones/marron.jpg"
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
  