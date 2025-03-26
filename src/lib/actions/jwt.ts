import "server-only";

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("14d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedKey);
}

export async function decrypt(session: string | "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("[VERIFY_JWT_ERROR]: ", error);

    return "Failed to veryfy jwt";
  }
}

export async function createSession(userId: string, username: string) {
  const cookie = await cookies();
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, username, expiresAt });

  cookie.set("talegenie_session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
