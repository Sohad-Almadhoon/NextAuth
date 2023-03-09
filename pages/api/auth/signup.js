import { hashingPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password } = data;
  if (
    !email ||
    !password ||
    !email.includes("@") ||
    password.trim().length <3
  ) {
    res.status(422).json({ message: "Sth wrong try again please!" });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();
  const existingUser = await db.collection("users").findOne({
    email,
  });
  if (existingUser) {
    res.status(422).json({ message: " User already exist" });
    client.close();
    return;
  }
  const hashedPassword = await hashingPassword(password);
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });
  console.log(result);
  res.status(201).json({ message: "User is created successfully" });
  client.close();
}

export default handler;
