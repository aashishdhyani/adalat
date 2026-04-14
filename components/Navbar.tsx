"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const linkStyle = (route: string) =>
    `px-4 py-2 rounded ${
      path === route ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">

      {/* LOGO / TITLE */}
      <h1 className="font-bold text-lg">ADALAT AI</h1>

      {/* LINKS */}
      <div className="flex gap-4">
        <Link href="/" className={linkStyle("/")}>
          Home
        </Link>

        <Link href="/scheme" className={linkStyle("/scheme")}>
          Scheme
        </Link>

        <Link href="/Laws" className={linkStyle("/Laws")}>
          Laws
        </Link>

        <Link href="/News" className={linkStyle("/News")}>
          News
        </Link>
      </div>
    </nav>
  );
}