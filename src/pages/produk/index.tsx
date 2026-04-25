import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";


// const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TampilanProduk = dynamic(() => import("../../view/product"), {
  loading: () => <p>Loading produk...</p>,
  ssr: false,
});

const kategori = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   if (!isLogin) {
  //     push("/auth/login");
  //   }
  // }, []);

//   useEffect(() => {
//   fetch("/api/produk")
//     .then((response) => response.json())
//     .then((responsedata) => {
//       setProducts(responsedata.data);
//       //console.log("Data produk:", responsedata.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching produk:", error);
//     })
// }, []);

const { data, error,isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data?.data} />
    </div>
  );
};

export default kategori;