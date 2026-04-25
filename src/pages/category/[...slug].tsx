import {useRouter} from "next/router";

const HalamanCategory = () => {
    //const Router = useRouter();
    // console.log(Router);
    const {query} = useRouter()
    const slug = query.slug;
    return (
        <div>
            <h1>Halaman Kategori</h1>
            <p>
            Kategori: {Array.isArray(query.slug) ? query.slug.join("-") : query.slug}
          </p>
         
        </div>
    );
};

export default HalamanCategory;