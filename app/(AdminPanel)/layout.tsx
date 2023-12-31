import { Roboto } from "next/font/google";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";
import { authOptions } from "@/libs/authOptions";

const SS3 = Roboto({ subsets: ["latin"], weight: "400" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  if ((session.user as { role?: string })?.role !== "admin") {
    redirect("/playground");
  }

  return (
    <main className={SS3.className}>
      <UserProfile />
      <Navbar />
      {children}
    </main>
  );
}
