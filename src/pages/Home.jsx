import { ArrowRight, Award, Headphones, Hospital, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { fallbackProducts } from "../data/fallback";
import { api, assetUrl } from "../services/api";

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [content, setContent] = useState([]);
  const featured = products.filter((item) => item.featured);
  const sections = useMemo(() => Object.fromEntries(content.filter((item) => item.page === "home").map((item) => [item.section, item])), [content]);
  const hero = sections.hero || {};
  const profile = sections.profile || {};

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data.length ? res.data : fallbackProducts)).catch(() => setProducts(fallbackProducts));
    api.get("/content").then((res) => setContent(res.data)).catch(() => setContent([]));
  }, []);

  return (
    <main>
      <section className="hero">
        <img src={assetUrl(hero.imageUrl || "/images/slider1.jpg")} alt="Medical equipment" />
        <div className="hero-copy">
          <span>{hero.eyebrow || "Orthopedic implants and critical care equipment"}</span>
          <h1>{hero.title || "JD2 Meditech Pvt. Ltd."}</h1>
          <p>{hero.body || "Professional medical product sourcing, orthopedic implant manufacturing, and quotation support for hospitals and healthcare procurement teams."}</p>
          <div className="actions">
            <Link className="button primary" to={hero.ctaUrl || "/quote"}>{hero.ctaLabel || "Request Quote"} <ArrowRight size={18} /></Link>
            <Link className="button ghost" to="/products/ortho-implants">View Products</Link>
          </div>
        </div>
      </section>

      <section className="metrics">
        <div><Hospital /><strong>50+</strong><span>Hospitals Served</span></div>
        <div><Award /><strong>ISO</strong><span>Quality Process</span></div>
        <div><ShieldCheck /><strong>CE</strong><span>Implant Standards</span></div>
        <div><Headphones /><strong>24/7</strong><span>Support Guidance</span></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span>Product range</span>
          <h2>Reliable medical solutions for clinical teams</h2>
          <p>Products from the existing JD2 site are now structured for database-backed display and admin updates.</p>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="split-section">
        <img src={assetUrl(profile.imageUrl || "/images/section3.jpg")} alt="JD2 medical products" />
        <div>
          <span className="eyebrow">{profile.eyebrow || "Since 2017"}</span>
          <h2>{profile.title || "Built for long-term healthcare partnerships"}</h2>
          <p>{profile.body || "JD2 Meditech works with hospitals, surgeons, and procurement teams to provide orthopedic implants, instruments, ventilators, defibrillators, and critical care devices with dependable service support."}</p>
          <div className="feature-list">
            <p><ShieldCheck /> International quality standards</p>
            <p><Truck /> Delivery and procurement coordination</p>
            <p><Award /> Surgeon-informed orthopedic product range</p>
          </div>
        </div>
      </section>
    </main>
  );
}
