import ProductCard from "./ProductCard";

const ProductList = ({ phones }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {phones.map((phone) => (
          <ProductCard key={phone._id} phone={phone} id={phone._id} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
