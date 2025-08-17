import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("watersugar"); 
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error("❌ Error en GET /products:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// POST 
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("watersugar");

    const result = await db.collection("products").insertOne(body);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error: any) {
    console.error("❌ Error en POST /products:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}

//DELETE
export async function DELETE(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
  
      if (!id) return NextResponse.json({ success: false, error: "Falta el id del producto" });
  
      const client = await clientPromise;
      const db = client.db("watersugar");
  
      const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
  
      return NextResponse.json({
        success: true,
        deletedCount: result.deletedCount,
      });
    } catch (error: any) {
      console.error("❌ Error en DELETE /products:", error.message);
      return NextResponse.json({ success: false, error: error.message });
    }
  }