import Link from "next/link";
import styles from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";


const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const [error, setError] = useState("");
  const callbackUrl: any = query.callbackUrl || "/";

const handleSubmit = async (event: any) => {
  setError("");
  setIsLoading(true);
  event.preventDefault();
//   const form = event.currentTarget;
//   const formData = new FormData(event.currentTarget);

//   const email = formData.get("email") as string;
//   const fullname = formData.get("Fullname") as string;
//   const password = formData.get("Password") as string;

//   // VALIDASI
//   if (!email) {
//     setError("Email wajib diisi");
//     setIsLoading(false);
//     return;
//   }

//   if (password.length < 6) {
//     setError("Password minimal 6 karakter");
//     setIsLoading(false);
//     return;
//   }

//   const response = await fetch("/api/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, fullname, password }),
//   });

//   // const result = await response.json();
//   // console.log(result);

//   if (response.status === 200) {
//     form.reset();
//     // event.currentTarget.reset();
//     setIsLoading(false);
//     push("/auth/login");
//   } else {
//     setIsLoading(false);
//     setError(
//       response.status === 400
//         ? "Email already exists"
//         : "An error occurred",
//     );
//   }

    try {
        const res = await signIn("credentials", {
            redirect: false,
            email: event.target.email.value,
            password: event.target.password.value,
            callbackUrl,
        });

        if (!res?.error) {
            setIsLoading(false);
            push(callbackUrl as string || "/");
        } else {
            setIsLoading(false);
            setError(res?.error || "Login failed");
        }
    } catch (error) {
        setIsLoading(false);
        setError("wrong email or password");
    }
};

  return (
    <>
    <div className={styles.login}>
      {error && <p className={styles.login__error}>{error}</p>}
      <h1 className={styles.login__title}>Halaman Login</h1>
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label
              htmlFor="email"
              className={styles.login__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.login__form__item__input}
            />
          </div>
          
          <div className={styles.login__form__item}>
            <label
            htmlFor="Password"
            className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={styles.login__form__item__input}
            />
          </div>
          <button type="submit" className={styles.login__form__item__button}
            disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <br /> <br />
            <button 
              onClick={() => signIn("google", { callbackUrl, redirect: false})}
              className={styles.login__form__item__button}
              disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign in with google"}
            </button>
            <br /> <br />
            <button
              onClick={() => signIn("github", { callbackUrl, redirect: false })}
              className={styles.login__form__item__button}
              disabled={isLoading}
              >
              {isLoading ? "Loading..." : "Sign in with github"}
            </button>
        </form>
        <br />
        <p className={styles.login__form__item__text}>
          tidak punya {" "} akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
    </>
    );
};

export default TampilanLogin;