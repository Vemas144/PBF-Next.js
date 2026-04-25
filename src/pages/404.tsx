import styles from "@/styles/404.module.scss";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Custom404 = () => {
    return (
        <div className={styles.error}>
            {/*<img src="/page-not-found.png" alt="404" className={styles.error_image} /> */}
            <Image
                src="/page-not-found.png"
                alt="404"
                width={400}
                height={200}
                className={styles.error_image}
            />
            <h1 className={styles.title}>404 - Halaman Tidak Ditemukan</h1>
            <p className={styles.description}>Maaf, halaman yang Anda cari tidak ditemukan.</p>
            <Link href="/">
                <button className={styles.button}>
                    Kembali ke Home
                </button>
            </Link>
        </div>
    );
};

export default Custom404;