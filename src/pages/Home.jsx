import {
  ArrowRight,
  Award,
  Headphones,
  HeartPulse,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Truck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { fallbackProducts } from "../data/fallback";
import { api, assetUrl } from "../services/api";
import "../../src/styles.css"

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);
  const [content, setContent] = useState([]);
  const featured = products.filter((item) => item.featured);

  const sections = useMemo(
    () =>
      Object.fromEntries(
        content
          .filter((item) => item.page === "home")
          .map((item) => [item.section, item])
      ),
    [content]
  );

  const hero = sections.hero || {};
  const profile = sections.profile || {};

  const heroSlides = [
    {
      image: hero.imageUrl || "/images/section2.jpg",
      eyebrow: hero.eyebrow || "One-Stop Healthcare Solutions Provider",
      title: hero.title || "Complete Healthcare Solutions Under One Roof",
      body:
        hero.body ||
        "JD2 Meditech Private Limited delivers end-to-end hospital procurement — medical equipment, pharmaceuticals, surgical consumables, modular OT solutions, hospital furniture, and injectable products — all sourced from a single trusted partner."
    },
    {
      image: "/images/section1.jpg",
      eyebrow: "Hospital Infrastructure Partner",
      title: "Modular OT Solutions & Critical Care Equipment",
      body:
        "Turnkey operation theatre design, HVAC laminar airflow, medical gas pipelines, ICU ventilators, patient monitors, and surgical consumables delivered with quality assurance and regulatory compliance."
    },
    {
      image: "/images/section3.jpg",
      eyebrow: "Trusted by Hospitals Across AP & Telangana",
      title: "Procurement Partner to Apollo, KIMS, Aster & Government Hospitals",
      body:
        "JD2 Meditech collaborates with Apollo Group, KIMS Group, Aster Group, ESI Hospitals, Ramesh Hospitals, Central Government Hospitals, South Central Railways Hospitals, GGH Hospitals, and Primary Area Hospitals across Andhra Pradesh."
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    api
      .get("/products")
      .then((res) =>
        setProducts(res.data.length ? res.data : fallbackProducts)
      )
      .catch(() => setProducts(fallbackProducts));

    api
      .get("/content")
      .then((res) => setContent(res.data))
      .catch(() => setContent([]));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <main>
      <section className="hero">
        <div className="hero-slider-bg" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              className={index === activeSlide ? "active" : ""}
              src={assetUrl(slide.image)}
              alt=""
              key={slide.image}
            />
          ))}
        </div>

        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-copy">
          <span className="promo-pill">
            <Sparkles size={15} /> {heroSlides[activeSlide].eyebrow}
          </span>

          <h1>{heroSlides[activeSlide].title}</h1>
          <p>{heroSlides[activeSlide].body}</p>

          <div className="actions">
            <Link className="button primary" to={hero.ctaUrl || "/quote"}>
              {hero.ctaLabel || "Request Quote"} <ArrowRight size={18} />
            </Link>

            <Link className="button ghost" to="/products/ortho-implants">
              Explore Catalogue
            </Link>
          </div>

          <div className="hero-dots" aria-label="Hero slides">
            {heroSlides.map((slide, index) => (
              <button
                className={index === activeSlide ? "active" : ""}
                key={slide.title}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home-service-strip">
        <article>
          <Stethoscope size={30} />
          <strong>Hospital & Medical Equipment</strong>
          <span>ICU, ventilators, monitors, imaging & diagnostics</span>
        </article>

        <article>
          <HeartPulse size={30} />
          <strong>Pharmaceuticals & Supplies</strong>
          <span>Branded, generic & critical care medicines</span>
        </article>

        <article>
          <ShieldCheck size={30} />
          <strong>Surgical Consumables</strong>
          <span>Gloves, sutures, drapes & infection control</span>
        </article>

        <article>
          <Truck size={30} />
          <strong>Modular OT Solutions</strong>
          <span>Turnkey OT design, HVAC & medical gas systems</span>
        </article>

        <article>
          <Award size={30} />
          <strong>Hospital Furniture</strong>
          <span>Beds, stretchers, trolleys & clinical furniture</span>
        </article>

        <article>
          <Headphones size={30} />
          <strong>Injectable Products</strong>
          <span>IV fluids, critical care injectables & vaccines</span>
        </article>
      </section>

      <section className="about-panel">
        <div className="about-photo">
          <img
            src={assetUrl(profile.imageUrl || "/images/section2.jpg")}
            alt="Medical professional reviewing healthcare requirements"
          />

          <Link className="play-button" to="/about" aria-label="About JD2 Meditech">
            <ArrowRight size={22} />
          </Link>
        </div>

        <div className="about-copy">
          <span className="eyebrow">{profile.eyebrow || "About JD2 Meditech"}</span>

          <h2>{profile.title || "One-Stop Healthcare Procurement for Hospitals & Institutions"}</h2>

          <p>
            {profile.body ||
              "JD2 Meditech Private Limited is a comprehensive healthcare solutions provider dedicated to supporting hospitals, clinics, nursing homes, diagnostic centres, medical colleges, and government healthcare institutions. We offer an integrated range of hospital and medical equipment, pharmaceuticals, surgical consumables, modular operation theatre solutions, hospital furniture, and injectable products — enabling healthcare providers to source all requirements from a single trusted partner registered under GST (37AAFCJ6175K1Z2) and the National Health Authority."}
          </p>

          <div className="about-points">
            <p>
              <Award /> Quality-assured products compliant with ISO, ISI, and WHO GMP standards
            </p>
            <p>
              <ShieldCheck /> Competitive pricing with India-made supply and reliable logistics
            </p>
            <p>
              <HeartPulse /> Trusted partner to Apollo Group, KIMS Group, Aster Group & Government Hospitals
            </p>
          </div>

          <div className="about-actions">
            <Link className="button primary" to="/quote">
              Contact Us <ArrowRight size={17} />
            </Link>

            <a href="tel:+918849304101">
              <Phone size={18} /> <span>Call for help</span>
              <strong>+91 88493 04101</strong>
            </a>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-heading">
          <span>Our Business Segments</span>
          <h2>Complete Healthcare Solutions Under One Roof</h2>
          <p>End-to-end hospital procurement — equipment, pharmaceuticals, furniture, surgical consumables, OT infrastructure and injectable products from a single partner.</p>
        </div>

        <div className="services-grid">
          <article className="service-card">
            <div className="service-icon">
              <Stethoscope size={32} />
            </div>
            <h3>Hospital & Medical Equipment</h3>
            <p>Advanced ICU and critical care equipment, patient monitoring systems, ventilators, diagnostic and imaging equipment, operation theatre equipment, emergency and trauma care devices, neonatal and paediatric care equipment, rehabilitation and physiotherapy systems, and laboratory instruments from reputed manufacturers.</p>
            <Link to="/products">Explore Products <ArrowRight size={16} /></Link>
          </article>

          <article className="service-card">
            <div className="service-icon">
              <HeartPulse size={32} />
            </div>
            <h3>Pharmaceuticals & Healthcare Supplies</h3>
            <p>Comprehensive range of branded and generic medicines, specialty pharmaceuticals, critical care medications, hospital pharmacy supplies, healthcare consumables, antibiotics, therapeutic drugs, and emergency medicines with stringent quality standards and efficient supply chain management.</p>
            <Link to="/quote">Request Catalogue <ArrowRight size={16} /></Link>
          </article>

          <article className="service-card">
            <div className="service-icon">
              <ShieldCheck size={32} />
            </div>
            <h3>Surgical Consumables & Medical Disposables</h3>
            <p>High-quality surgical gloves, sutures, dressing materials, surgical drapes and gowns, catheters and cannulas, syringes and needles, infection control products, sterilization consumables, and medical disposables ensuring patient safety and infection prevention.</p>
            <Link to="/quote">Request Details <ArrowRight size={16} /></Link>
          </article>

          <article className="service-card">
            <div className="service-icon">
              <Truck size={32} />
            </div>
            <h3>Modular Operation Theatre Solutions</h3>
            <p>State-of-the-art modular OT design, supply, installation, and commissioning. Includes modular wall and ceiling systems, HVAC and laminar airflow, OT lighting, medical gas pipeline systems, hermetic doors, surgeon control panels, and integrated OT solutions for a sterile surgical environment.</p>
            <Link to="/quote">Discuss OT Project <ArrowRight size={16} /></Link>
          </article>

          <article className="service-card">
            <div className="service-icon">
              <Award size={32} />
            </div>
            <h3>Hospital Furniture & Infrastructure</h3>
            <p>Ergonomic and durable hospital beds, ICU beds, examination tables, patient trolleys, stretchers, bedside lockers, overbed tables, wheelchairs, waiting area furniture, and nursing station furniture designed for comfort and healthcare compliance.</p>
            <Link to="/products/hospital-furniture">Explore Furniture <ArrowRight size={16} /></Link>
          </article>

          <article className="service-card">
            <div className="service-icon">
              <Headphones size={32} />
            </div>
            <h3>Injectable Products & Critical Care</h3>
            <p>Reliable IV fluids, injectable medicines, emergency and critical care injectables, oncology injectables, specialty injectables, vaccines, biological products, and hospital emergency kits — ensuring uninterrupted availability of life-saving products.</p>
            <Link to="/quote">Request Supply Info <ArrowRight size={16} /></Link>
          </article>
        </div>
      </section>

      {/* <section className="jd2-range-zone">
        <div className="jd2-range-head">
          <span>Product Showcase</span>
          <h2>Comprehensive Product Range for Modern Healthcare Teams</h2>
          <p>
            Explore high-priority categories with a brighter, faster path to
            product detail and quotation.
          </p>
        </div>

        <div className="jd2-range-list">
          <Link className="jd2-range-item jd2-range-special" to="/products/ortho-implants">
            <div className="jd2-range-content">
              <span>Featured Range</span>
              <h3>Orthopedic Implant Systems</h3>
              <p>
                Spine, trauma, plates, and fixation systems arranged for
                surgeon-led procurement.
              </p>
            </div>

            <div className="jd2-range-media">
              <img
                src="/images/ortho-implants/CapLOX II Pedicle Screw System.jpg"
                alt="Orthopedic implant system"
              />
            </div>

            <div className="jd2-range-cta">
              Explore implants <ArrowRight size={16} />
            </div>
          </Link>

          <Link className="jd2-range-item" to="/products/ventilators">
            <div className="jd2-range-content">
              <span>ICU Ready</span>
              <h3>Ventilator Systems</h3>
              <p>Critical-care and transport ventilation support.</p>
            </div>

            <div className="jd2-range-media">
              <img
                src="/images/ventils/portable-ventilator.jpg"
                alt="Portable ventilator"
              />
            </div>

            <div className="jd2-range-cta">
              Explore ventilators <ArrowRight size={16} />
            </div>
          </Link>

          <Link className="jd2-range-item" to="/products/defibrillators">
            <div className="jd2-range-content">
              <span>Emergency Care</span>
              <h3>Defibrillator Monitors</h3>
              <p>Cardiac response and monitoring equipment.</p>
            </div>

            <div className="jd2-range-media">
              <img
                src="/images/defibs/CalmedEquipmentNewPhilipsAEDs.jpg"
                alt="Defibrillator monitor"
              />
            </div>

            <div className="jd2-range-cta">
              Explore defibrillators <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </section> */}

      <section className="service-band">
        <div className="section-heading">
          <span>JD2 Services</span>
          <h2>Professional medical procurement support</h2>
          <p>Structured support for hospitals, distributors, and clinical teams.</p>
        </div>

        <div className="service-cards">
          <article>
            <HeartPulse size={26} />
            <h3>Critical Care</h3>
            <p>Ventilation, cardiac response, and patient-support categories.</p>
          </article>

          <article>
            <Stethoscope size={26} />
            <h3>Orthopedic Systems</h3>
            <p>Implants and fixation products for surgeon-led programs.</p>
          </article>

          <article>
            <Truck size={26} />
            <h3>Supply Coordination</h3>
            <p>Quotations, product matching, and delivery planning.</p>
          </article>
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading">
          <span>Working Process</span>
          <h2>How we partner with your healthcare facility</h2>
        </div>

        <div className="process-flow">
          <article>
            <span>01</span>
            <strong>Share Requirement</strong>
            <p>Submit your hospital's product and infrastructure requirements — equipment, consumables, OT specifications, or pharmaceutical supplies.</p>
          </article>

          <article className="active">
            <span>02</span>
            <strong>Technical Consultation</strong>
            <p>Our team reviews fitment, regulatory compliance, and product specifications. We propose quality-assured solutions with competitive pricing.</p>
          </article>

          <article>
            <span>03</span>
            <strong>Supply & Commissioning</strong>
            <p>Receive confirmed quotation, delivery timeline, installation support, and after-sales service from JD2 Logistics & Techcell Solutions.</p>
          </article>
        </div>
      </section>

      <section className="section new-arrivals">
        <div className="section-heading">
          <span>Featured Products</span>
          <h2>Quality-assured medical equipment for modern healthcare</h2>
          <p>
            Explore selected medical equipment and implant systems for hospital procurement teams — sourced from reputed ISO and ISI certified manufacturers.
          </p>
        </div>

        <ProductGrid products={featured} />
      </section>

      <ProductMarquee products={products} />
    </main>
  );
}

function ProductMarquee({ products }) {
  const marqueeProducts = products
    .filter((product) => product.imageUrl)
    .slice(0, 14);

  const trackProducts = [...marqueeProducts, ...marqueeProducts];

  if (!marqueeProducts.length) return null;

  return (
    <section className="product-marquee" aria-label="JD2 product showcase">
      <div className="marquee-title">
        <span>Complete Healthcare Solutions — Medical Equipment, Pharmaceuticals, Surgical Consumables, Modular OT, Hospital Furniture & Injectable Products</span>
      </div>

      <div className="marquee-window">
        <div className="marquee-track">
          {trackProducts.map((product, index) => (
            <Link
              className="marquee-product"
              to={`/products/${product.category}`}
              key={`${product.id || product.name}-${index}`}
            >
              <img src={assetUrl(product.imageUrl)} alt={product.name} />
              <strong>{product.name}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
