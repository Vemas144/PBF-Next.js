import { useRouter } from "next/router";
import Navbar from "../navbar";
import { Roboto } from "next/font/google";

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

type AppShellProps = {
  children: React.ReactNode;
};
  
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


export default function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <main className={roboto.className} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {!disableNavbar.includes(pathname) && <Navbar />}

      <div style={{ flex: 1, padding: "0px" }}>
        {children}
      </div>

      <footer
        style={{
          background: "#333",
          color: "white",
          textAlign: "center",
          padding: "15px",
        }}
      >
        2026 Pemrograman Framework
      </footer>

    </main>
  );
}