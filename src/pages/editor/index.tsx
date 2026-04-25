import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const EditorPage = () => {
  const { data: session } = useSession();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Halaman Editor</h1>
      <p>Selamat datang, {session?.user?.fullname}</p>
      <p>Role: {session?.user?.role}</p>

      <section>
        <h2>Panel Editor</h2>
        <ul>
          <li>Buat artikel baru</li>
          <li>Edit artikel yang ada</li>
          <li>Kelola kategori konten</li>
        </ul>
      </section>
    </div>
  );
};

// Proteksi halaman: hanya editor & admin yang boleh masuk
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }

  const allowedRoles = ["editor", "admin"];
  if (!allowedRoles.includes(session.user?.role ?? "")) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
};

export default EditorPage;