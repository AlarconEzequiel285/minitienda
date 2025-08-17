import clientPromise from "./mongodb";
import { v4 as uuidv4 } from "uuid";

const DB_NAME = "watersugar";

export async function createSession() {
  const client = await clientPromise;
  const db = client.db("watersugar");
  const sessions = db.collection("sessions");

  const sessionId = uuidv4();

  await sessions.insertOne({
    sessionId,
    cart: [],
    createdAt: new Date(),
  });

  return sessionId;
}

export async function getSession(sessionId: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const sessions = db.collection("sessions");

  return sessions.findOne({ sessionId });
}

export async function updateCart(sessionId: string, cart: any[]) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const sessions = db.collection("sessions");

  await sessions.updateOne(
    { sessionId },
    { $set: { cart } }
  );
}
