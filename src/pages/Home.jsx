import { ArrowRight, Award, Headphones, HeartPulse, Hospital, ShieldCheck, Stethoscope, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { categories, fallbackProducts } from "../data/fallback";
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
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-copy">
          <span className="promo-pill">{hero.eyebrow || "Upto 50% off on selected equipment"}</span>
          <h1>{hero.title || "JD2 Meditech Pvt. Ltd."}</h1>
          <p>{hero.body || "Professional medical product sourcing, orthopedic implant manufacturing, and quotation support for hospitals and healthcare procurement teams."}</p>
          <div className="actions">
            <Link className="button primary" to={hero.ctaUrl || "/quote"}>{hero.ctaLabel || "Request Quote"} <ArrowRight size={18} /></Link>
            <Link className="button ghost" to="/products/ortho-implants">Shop Products</Link>
          </div>
        </div>
        <div className="hero-stage">
          <img src={assetUrl(hero.imageUrl || "/images/ventils/medical-ventilator.jpg")} alt="Medical equipment" />
          <div className="floating-icon stetho"><Stethoscope size={28} /></div>
          <div className="floating-icon pulse"><HeartPulse size={28} /></div>
          <div className="floating-icon award"><Award size={28} /></div>
        </div>
      </section>

      <section className="metrics">
        <div><Hospital /><strong>50+</strong><span>Hospitals Served</span></div>
        <div><Award /><strong>ISO</strong><span>Quality Process</span></div>
        <div><ShieldCheck /><strong>CE</strong><span>Implant Standards</span></div>
        <div><Headphones /><strong>24/7</strong><span>Support Guidance</span></div>
      </section>

      <section className="section category-showcase">
        <div className="section-heading">
          <span>Shop by categories</span>
          <h2>Explore bright, clinical-ready product ranges</h2>
          <p>Fast access to critical care equipment, cardiac devices, and orthopedic implant systems.</p>
        </div>
        <div className="category-strip">
          {categories.map((item, index) => {
            const categoryProduct = fallbackProducts.find((product) => product.category === item.key) || fallbackProducts[index];
            return (
              <Link className="category-tile" to={item.path} key={item.key}>
                <img src={assetUrl(categoryProduct.imageUrl)} alt={item.label} />
                <strong>{item.label}</strong>
              </Link>
            );
          })}
          <Link className="category-tile" to="/quote">
            <img src="/images/equipment/device1.jpg" alt="Hospital equipment" />
            <strong>Hospital Equipment</strong>
          </Link>
          <Link className="category-tile" to="/contact">
            <img src="/images/defibs/AgfaGEAMXMobileX-RaySystems.jpg" alt="Imaging systems" />
            <strong>Imaging Systems</strong>
          </Link>
        </div>
      </section>

      <section className="section deals-section">
        <div className="section-heading">
          <span>Deal of this week</span>
          <h2>Procurement-ready offers with vivid product focus</h2>
          <p>Designed for quick buying decisions, demos, and quotation conversations.</p>
        </div>
        <div className="deal-grid">
          <Link className="deal-card deal-orange" to="/products/ventilators">
            <div>
              <span>Critical care</span>
              <h3>Ventilator Systems</h3>
              <p>ICU and transport support</p>
              <small>30% OFF</small>
            </div>
            <img src="/images/ventils/portable-ventilator.jpg" alt="Portable ventilator" />
          </Link>
          <Link className="deal-card deal-blue" to="/products/defibrillators">
            <div>
              <span>Emergency care</span>
              <h3>Defibrillator Monitors</h3>
              <p>Cardiac response equipment</p>
              <small>Fast Quote</small>
            </div>
            <img src="/images/defibs/Meditech Defibrillator monitor Defi 9.jpg" alt="Defibrillator monitor" />
          </Link>
          <Link className="deal-card deal-purple" to="/products/ortho-implants">
            <div>
              <span>Orthopedic</span>
              <h3>Implant Systems</h3>
              <p>Spine, trauma and plates</p>
              <small>CE Range</small>
            </div>
            <img src="/images/ortho-implants/CapLOX II Pedicle Screw System.jpg" alt="Orthopedic implant" />
          </Link>
        </div>
      </section>

      <section className="section new-arrivals">
        <div className="section-heading">
          <span>New arrivals</span>
          <h2>Fresh catalogue picks for hospital teams</h2>
          <p>Products from the JD2 catalogue are structured for database-backed display and admin updates.</p>
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
