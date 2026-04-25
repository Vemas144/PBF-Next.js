

const MainSection = () => {
    return (
        <div className="max-w-3xl mx-auto p-4 mt-10 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-green-700">Daftar Produk</h2>
            <p className="text-gray-600 mb-4">Berikut adalah beberapa produk unggulan kami:</p>
            <ul className="space-y-2">
                <li>Produk 1: Deskripsi singkat produk 1.</li>  
                <li>Produk 2: Deskripsi singkat produk 2.</li>
                <li>Produk 3: Deskripsi singkat produk 3.</li>
            </ul>
        </div>
    );
};

export default MainSection;