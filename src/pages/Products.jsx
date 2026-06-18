import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { categories, fallbackProducts } from "../data/fallback";
import { api } from "../services/api";

export default function Products() {
  const { category } = useParams();
  const label = categories.find((item) => item.key === category)?.label || "Products";
  const [products, setProducts] = useState(fallbackProducts.filter((item) => item.category === category));

  useEffect(() => {
    api.get(`/products?category=${category}`)
      .then((res) => setProducts(res.data.length ? res.data : fallbackProducts.filter((item) => item.category === category)))
      .catch(() => setProducts(fallbackProducts.filter((item) => item.category === category)));
  }, [category]);

  return (
    <main>
      <section className="page-hero"><h1>{label}</h1><p>Database-backed catalogue with admin-editable products and images.</p></section>
      <section className="section">
        <ProductGrid products={products} />
      </section>
      {category === "ortho-implants" && (
        <section className="section tinted">
          <div className="section-heading">
            <span>Material quality</span>
            <h2>Stainless steel and titanium implant options</h2>
          </div>
          <div className="cards four">
            <div><h3>316L / 316LVM</h3><p>Commonly used for trauma and fixation systems.</p></div>
            <div><h3>Ti6Al4V ELI</h3><p>Premium titanium alloy for spinal and advanced implant applications.</p></div>
            <div><h3>Locked Systems</h3><p>Plate and screw systems for varied fracture requirements.</p></div>
            <div><h3>Surgeon Tested</h3><p>Developed with clinical feedback and practical operating needs.</p></div>
          </div>
        </section>
      )}
    </main>
  );
}
