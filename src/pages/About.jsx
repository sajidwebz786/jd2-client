import { Award, Eye, Target, ShieldCheck, HeartPulse, Stethoscope, Truck, Headphones } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api, assetUrl } from "../services/api";

export default function About() {
  const [content, setContent] = useState([]);
  const sections = useMemo(() => Object.fromEntries(content.filter((item) => item.page === "about").map((item) => [item.section, item])), [content]);
  const profile = sections.profile || {};

  useEffect(() => {
    api.get("/content").then((res) => setContent(res.data)).catch(() => setContent([]));
  }, []);

  return (
    <main>
      <PageHero title="About JD2 Meditech" subtitle="Complete Healthcare Solutions — Medical Equipment, Pharmaceuticals, Surgical Consumables, Modular Operation Theatres, Hospital Furniture and Injectable Products" />
      <section className="split-section">
        <img src={assetUrl(profile.imageUrl || "/images/section3.jpg")} alt="JD2 Meditech healthcare infrastructure" />
        <div>
          <span className="eyebrow">{profile.eyebrow || "Company Profile"}</span>
          <h2>{profile.title || "JD2 Meditech Private Limited — Your Complete Healthcare Procurement Partner"}</h2>
          <p>{profile.body || "JD2 Meditech Private Limited is a comprehensive healthcare solutions provider dedicated to supporting hospitals, healthcare institutions, clinics, nursing homes, diagnostic centres, and medical colleges with world-class products and services. We offer an integrated range of healthcare infrastructure, medical equipment, pharmaceuticals, surgical consumables, modular operation theatre solutions, hospital furniture, and injectable products, enabling healthcare providers to source all requirements from a single trusted partner. GST: 37AAFCJ6175K1Z2."}</p>
          <p>Registered with the National Health Authority (Health Facility Registration: IN2810069836), JD2 Meditech serves as a one-stop destination for end-to-end hospital procurement and healthcare infrastructure development. We collaborate with Apollo Group, KIMS Group, Aster Group, Ramesh Hospitals, ESI Hospitals, Central Government Hospitals, South Central Government Hospitals, GGH Hospitals, and Primary Area Hospitals across Andhra Pradesh.</p>
          <p>Our extensive portfolio is carefully curated to meet the evolving needs of modern healthcare facilities while ensuring compliance with industry standards and ISO, ISI, NSIC, and WHO GMP regulatory requirements. With a commitment to quality, reliability, innovation, and customer satisfaction, JD2 Meditech delivers competitive pricing, timely logistics support, and technical after-sales service through our logistics and service partners.</p>
        </div>
      </section>
      <section className="section tinted">
        <div className="cards four">
          <div><Award /><h3>Quality Assured</h3><p>ISO, ISI, NSIC Approved, WHO GMP compliant products sourced from reputed manufacturers across all six business segments.</p></div>
          <div><Eye /><h3>Vision</h3><p>To become a leading healthcare solutions provider by delivering innovative, reliable, and comprehensive medical products and infrastructure solutions that contribute to improved healthcare outcomes and patient well-being.</p></div>
          <div><Target /><h3>Mission</h3><p>To empower healthcare providers with quality medical equipment, pharmaceuticals, surgical products, modular OT solutions, hospital furniture, and critical care supplies through excellence in service, integrity, innovation, and customer satisfaction.</p></div>
          <div><ShieldCheck /><h3>Registrations</h3><p>GST: 37AAFCJ6175K1Z2 | NHA Health Facility Registration: IN2810069836 | Government-approved healthcare supplier.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <span>Our Partnerships</span>
          <h2>Trusted by leading healthcare institutions across India</h2>
          <p>JD2 Meditech collaborates with premier hospital groups, government institutions, and healthcare networks.</p>
        </div>
        <div className="services-grid">
          <article className="service-card">
            <div className="service-icon"><Award size={32} /></div>
            <h3>Apollo Group</h3>
            <p>Healthcare equipment and infrastructure supply partner.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><HeartPulse size={32} /></div>
            <h3>KIMS Group</h3>
            <p>Medical equipment and hospital infrastructure solutions provider.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><ShieldCheck size={32} /></div>
            <h3>Aster Group</h3>
            <p>Supplying quality-assured products and surgical consumables.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><Stethoscope size={32} /></div>
            <h3>ESI Hospitals</h3>
            <p>Government employee state insurance hospital procurement partner.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><Truck size={32} /></div>
            <h3>Central & Government Hospitals</h3>
            <p>Supplying critical equipment to Central Government and South Central Railway Hospitals.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><Headphones size={32} /></div>
            <h3>GGH & Area Hospitals AP</h3>
            <p>Government General Hospitals and Primary Area Hospitals across Andhra Pradesh.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

function PageHero({ title, subtitle }) {
  return <section className="page-hero"><h1>{title}</h1><p>{subtitle}</p></section>;
}
