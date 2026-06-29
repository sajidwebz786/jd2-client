import { CheckCircle2, ChevronRight, Minus, Plus, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductGrid, { productAnchor, productSlug } from "../components/ProductGrid.jsx";
import { assetUrl, api } from "../services/api";
import { categories as fallbackCategories, fallbackProducts } from "../data/fallback";

function sortByOrder(items) {
  return [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0) || a.label?.localeCompare(b.label || "") || 0);
}

function normalizeCategory(category) {
  return { ...category, path: `/products/${category.key}` };
}

function publicProductText(text = "") {
  return String(text)
    .replace(/\bCE\b\s*&?\s*/g, "")
    .replace(/\bCE\b,?\s*/g, "")
    .replace(/Admin-editable product details and images/gi, "Product details and technical guidance available on request")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .trim();
}

export default function Products() {
  const { category, slug } = useParams();
  const location = useLocation();
  const [categories, setCategories] = useState(fallbackCategories);
  const [products, setProducts] = useState(category ? fallbackProducts.filter((item) => item.category === category) : fallbackProducts);

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data.length ? sortByOrder(res.data.map(normalizeCategory)) : fallbackCategories))
      .catch(() => setCategories(fallbackCategories));
  }, []);

  useEffect(() => {
    const endpoint = category ? `/products?category=${category}` : "/products";
    api.get(endpoint)
      .then((res) => {
        const fallback = category ? fallbackProducts.filter((item) => item.category === category) : fallbackProducts;
        setProducts(res.data.length ? res.data : fallback);
      })
      .catch(() => setProducts(category ? fallbackProducts.filter((item) => item.category === category) : fallbackProducts));
  }, [category]);

  useEffect(() => {
    if (!location.hash || !products.length || slug) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("product-card-target");
      window.setTimeout(() => target.classList.remove("product-card-target"), 1800);
    }, 120);
  }, [location.hash, products, slug]);

  const selectedCategory = categories.find((item) => item.key === category);
  const selectedProduct = useMemo(() => {
    if (!slug) return null;
    return products.find((item) => productSlug(item) === slug || String(item.id) === slug);
  }, [products, slug]);

  if (!category) {
    return (
      <main>
        <section className="products-index-hero">
          <span>JD2 Meditech Product Portfolio</span>
          <h1>Complete Healthcare Solutions by Category</h1>
          <p>Browse medical equipment, hospital furniture, surgical consumables, critical care devices, and implant systems with quality assurance and competitive pricing.</p>
        </section>
        <section className="category-gallery-section">
          <div className="category-gallery">
            {categories.map((item) => (
              <Link className="category-photo-card" to={`/products/${item.key}`} key={item.key}>
                <img src={assetUrl(item.imageUrl)} alt={item.label} />
                <div>
                  <span>{String(item.key).replace(/-/g, " ")}</span>
                  <strong>{item.label}</strong>
                  <p>{item.description || "Browse products and request details."}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (slug) {
    return (
      <main>
        <section className="product-detail-page">
          {selectedProduct ? (
            <ProductDetail product={selectedProduct} category={selectedCategory} />
          ) : (
            <div className="empty-catalogue">
              <span>{selectedCategory?.label || "Product"}</span>
              <h2>Product details are loading</h2>
              <p>Please open the category listing to view the latest available products.</p>
              <Link className="button primary" to={`/products/${category}`}>Back to Category</Link>
            </div>
          )}
        </section>
      </main>
    );
  }

  const label = selectedCategory?.label || "Products";

  return (
    <main>
      <section className="page-hero"><h1>{label}</h1><p>{selectedCategory?.description || "Explore available products and request detailed specifications."}</p></section>
      <section className="product-catalog-layout">
        <aside className="catalog-sidebar">
          <h2>Categories</h2>
          {categories.map((item) => (
            <Link className={item.key === category ? "active" : ""} key={item.key} to={`/products/${item.key}`}>
              {item.label}<ChevronRight size={15} />
            </Link>
          ))}
        </aside>
        <div className="catalog-products">
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <div className="empty-catalogue">
              <span>{label}</span>
              <h2>No products available</h2>
              <p>Please request this category and our team will share suitable options.</p>
              <Link className="button primary" to={`/quote?category=${encodeURIComponent(label)}`}>Request This Category</Link>
            </div>
          )}
        </div>
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

function ProductDetail({ product, category }) {
  const [qty, setQty] = useState(1);
  const specs = Array.isArray(product.specifications) && product.specifications.length
    ? product.specifications
    : [
      publicProductText(product.shortDescription),
      "ISO, ISI Mark, NSIC Approved, WHO GMP",
      "Designed for hospital, clinic, and procurement workflows",
      "Product details and technical guidance available on request"
    ].filter(Boolean);

  return (
    <div className="product-detail-shell">
      <SmoothZoomImage src={assetUrl(product.imageUrl)} alt={product.name} />
      <div className="product-detail-info">
        <Link className="detail-back-link" to={`/products/${product.category}`}>Back to {category?.label || "category"}</Link>
        <h1>{product.name}</h1>
        <p className="detail-price"><span>Quotation based</span> Request latest price</p>
        <h2><ShieldCheck size={21} /> ISO, ISI Mark, NSIC Approved, WHO GMP</h2>
        <ul>
          {specs.map((item, index) => <li key={`${item}-${index}`}><CheckCircle2 size={17} /> {publicProductText(item)}</li>)}
        </ul>
        <div className="detail-quantity">
          <span>Quantity</span>
          <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
          <strong>{qty}</strong>
          <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
        </div>
        <Link
          className="detail-quote-button"
          to={`/quote?category=${encodeURIComponent(category?.label || product.category)}&product=${encodeURIComponent(product.name)}&quantity=${qty}`}
        >
          Request quote
        </Link>
        <p className="detail-category">Category: <Link to={`/products/${product.category}`}>{category?.label || product.category}</Link></p>
      </div>
    </div>
  );
}

function SmoothZoomImage({ src, alt }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  return (
    <div
      className="smooth-zoom-frame"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
      onMouseLeave={() => setPosition({ x: 50, y: 50 })}
    >
      <img style={{ transformOrigin: `${position.x}% ${position.y}%` }} src={src} alt={alt} />
    </div>
  );
}
