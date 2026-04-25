import TampilanProduk from "../../view/product";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
    const { products } = props;
    return (
        <div>
            <h1>Halaman Produk Static</h1>
            <TampilanProduk products={products} />
        </div>
    );
}

export default halamanProdukStatic;


// Fungsi getStaticProps akan dipanggil saat build time, dan akan mengambil data produk dari API sebelum merender halaman.
export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/produk");
    //const response : ProdukType[] = await res.json();
    const response: { data: ProductType[] } = await res.json();
    // console.log("Data produk yang diambil dari API:", response);
    return {
        props: {
            products: response.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
        },
        revalidate: 10, // Opsi ini memungkinkan halaman untuk di-regenerate setiap 10 detik jika ada permintaan baru
    };
}