import Script from "next/dist/client/script";
import styles from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
    
const Navbar = () => {
    const { data } = useSession()
    //cosnt { data: session } = useSession();
    // console.log("Session", data);
    return (
    <div className={styles.navbar}>
        {/* <div className={styles.navbar__brand}>
            MyApp 
        </div> */}
        {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
        <div className={styles.navbar__brand} id="title"></div>
        <Script id="title-script" strategy='lazyOnload' >
            {`
                document.getElementById('title').innerHTML = "MyApp";
            `}
        </Script>

        <div className={styles.navbar__right}>
            {data ? (
                <>
                <div className={styles.navbar__user} data-testid="user-welcome">
                    welcome, {data.user?.fullname}
                    {data.user.image && (
                       <Image
                            src={data.user.image}
                            alt={data.user.fullname ?? "User avatar"}
                            width={42}
                            height={42}
                            className={styles.navbar__user__image}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                    )}
                </div>
                <button  data-testid="btn-signout" className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`} onClick={() => signOut()}>
                    Sign Out
                </button>
                </>
            ) : (
                <button data-testid="btn-signin" className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`} onClick={() => signIn()}>
                    Sign In
                </button>
            )}
        </div>
    </div>
    );
};

export default Navbar;