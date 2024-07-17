import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("secret");

  if (process.env.MY_SECRET_TOKEN != token) {
    return Response.json({ message: "Invalid token" });
  }

  revalidatePath("/");
  return Response.json({ revalidated: true, now: Date.now() });
}
