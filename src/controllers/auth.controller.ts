import { Request, Response } from "express";
import admin from "../firebase/admin";
import { findOrCreateUser } from "../services/user.service";

export const verifyFirebaseToken = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);

    const user = await findOrCreateUser({
      uid: decoded.uid,
      email: decoded.email || "",
      name: decoded.name,
      photoUrl: decoded.picture,
      provider: decoded.firebase.sign_in_provider,
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Token inválido:", error);
    res.status(401).json({ error: "Token no válido" });
  }
};
