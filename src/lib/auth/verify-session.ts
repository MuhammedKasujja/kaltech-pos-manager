import { redirect } from "next/navigation";
import "server-only";

export async function verifyUser() {
  // const {} = getSession()
  const user = {
    firsName: "Muhammed",
    lastName: "Kasujja",
    email: "kasujja@gmail.com",
  };
  
  if (!user) {
    redirect("/login");
  }
  return user;
}
