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
      eyebrow: hero.eyebrow || "Healthcare supply partner",
      title: hero.title || "Smarter medical sourcing for modern care teams",
      body:
        hero.body ||
        "JD2 Meditech supports hospitals, surgeons, and procurement teams with dependable equipment sourcing, implant systems, and quotation guidance."
    },
    {
      image: "/images/slider3.jpg",
      eyebrow: "Clinical decision support",
      title: "Technology-ready products for confident care",
      body:
        "Organized medical categories and fast response workflows help teams move from requirement to quotation with clarity."
    },
    {
      image: "/images/section1.jpg",
      eyebrow: "Quality-led procurement",
      title: "Built around people, precision, and service",
      body:
        "From orthopedic programs to critical-care departments, JD2 keeps product discovery simple, responsive, and well supported."
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
          <strong>Implant Systems</strong>
          <span>Spine, trauma, plates and fixation</span>
        </article>

        <article>
          <HeartPulse size={30} />
          <strong>Critical Care</strong>
          <span>Ventilators, monitors and emergency equipment</span>
        </article>

        <article>
          <ShieldCheck size={30} />
          <strong>Quality Guidance</strong>
          <span>ISO process and CE implant ranges</span>
        </article>

        <article>
          <Headphones size={30} />
          <strong>Quotation Desk</strong>
          <span>Fast matching and procurement response</span>
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
          <span className="eyebrow">{profile.eyebrow || "About Our Company"}</span>

          <h2>{profile.title || "Choose a dependable medical supply partner"}</h2>

          <p>
            {profile.body ||
              "JD2 Meditech works with hospitals, surgeons, and procurement teams to provide orthopedic implants, instruments, ventilators, defibrillators, and critical care devices with dependable service support."}
          </p>

          <div className="about-points">
            <p>
              <Award /> Quality-backed product discovery
            </p>
            <p>
              <ShieldCheck /> Technical and quotation support
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
          <h2>A simple procurement workflow</h2>
        </div>

        <div className="process-flow">
          <article>
            <span>01</span>
            <strong>Submit Requirement</strong>
            <p>Share category, quantity, and specifications.</p>
          </article>

          <article className="active">
            <span>02</span>
            <strong>Technical Match</strong>
            <p>JD2 reviews fitment and product options.</p>
          </article>

          <article>
            <span>03</span>
            <strong>Quote & Supply</strong>
            <p>Receive quotation, timelines, and support.</p>
          </article>
        </div>
      </section>

      <section className="section new-arrivals">
        <div className="section-heading">
          <span>New arrivals</span>
          <h2>Fresh catalogue picks for hospital teams</h2>
          <p>
            Products from the JD2 catalogue are structured for database-backed
            display and admin updates.
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
        <span>A Medical Equipment Manufacturing Company</span>
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