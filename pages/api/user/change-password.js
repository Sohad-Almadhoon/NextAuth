import { getSession } from "next-auth/react";
import { hashingPassword, verifingPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method != "PATCH") {
    return;
  }
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    return;
  }
  const data = req.body;
  const { oldPassword, newPassword } = data;
  const userEmail = session.user.email;
  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");
  const user = await userCollection.findOne({
    email: userEmail,
  });
  if (!user) {
    res.status(404), json({ message: "User Not Found!" });
    client.close();
    return;
  }
  const checkOldPassword = await verifingPassword(oldPassword, user.password);
  if (!checkOldPassword) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }
  const newHashedPassword = await hashingPassword(newPassword);
  await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password is changed sucssefully!" });
}
