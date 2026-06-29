import { Award, FileCheck2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { assetUrl, api } from "../services/api";
import { fallbackContent } from "../data/fallback";

function publicCertificationText(text = "") {
  return text
    .replace(/\bCE\b,?\s*/g, "")
    .replace(/Admin-managed\s+/gi, "")
    .replace(/The admin panel can maintain certificate text, supporting images, and document links for this page\./gi, "Product-specific documentation and approval references are available to support purchase decisions.")
    .replace(/managed from the admin panel,\s*/gi, "")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .replace(/ISO,\s*ISI/g, "ISO, ISI")
    .trim();
}

export default function Certifications() {
  const [records, setRecords] = useState(fallbackContent.filter((item) => item.page === "certifications"));

  useEffect(() => {
    api.get("/content")
      .then((res) => {
        const items = res.data.filter((item) => item.page === "certifications");
        setRecords(items.length ? items : fallbackContent.filter((item) => item.page === "certifications"));
      })
      .catch(() => setRecords(fallbackContent.filter((item) => item.page === "certifications")));
  }, []);

  const registrationRecords = [
    {
      id: "gst",
      eyebrow: "Tax Registration",
      title: "GSTIN: 37AAFCJ6175K1Z2",
      body: "JD2 Meditech Private Limited is GST-registered under the Goods and Services Tax regime. GSTIN: 37AAFCJ6175K1Z2, enabling compliant invoicing and tax credit for all procurement partners."
    },
    {
      id: "nha",
      eyebrow: "National Health Authority",
      title: "Health Facility Registration: IN2810069836",
      body: "JD2 Meditech Private Limited is registered with the National Health Authority of India. Health Facility Registration: IN2810069836. We are authorised to supply medical equipment, pharmaceuticals, surgical consumables, and critical care products to government healthcare facilities, ESI hospitals, and empanelled hospitals across India."
    },
    {
      id: "quality",
      eyebrow: "Quality Standards",
      title: "ISO, ISI & WHO GMP Compliance",
      body: "Our product portfolio adheres to ISO, ISI Mark, NSIC Approved, and WHO GMP standards. All medical equipment, pharmaceuticals, surgical consumables, and injectable products are sourced from reputed certified manufacturers."
    }
  ];

  const displayRecords = records.length >= 2 ? records : registrationRecords;

  return (
    <main>
      <section className="certifications-hero">
        <span><ShieldCheck size={18} /> Certifications & Registrations</span>
        <h1>Quality, Compliance & Government-Registered Healthcare Supplier</h1>
        <p>JD2 Meditech Private Limited holds all required registrations and compliance credentials to serve government and private healthcare institutions across India.</p>
      </section>
      <section className="certification-list">
        {displayRecords.map((item, index) => (
          <article className="certification-card" key={item.id || item.section || index}>
            <div className="certification-icon">{index % 2 === 0 ? <Award /> : <FileCheck2 />}</div>
            {item.imageUrl && <img src={assetUrl(item.imageUrl)} alt={item.title} />}
            <span>{publicCertificationText(item.eyebrow || item.section)}</span>
            <h2>{publicCertificationText(item.title)}</h2>
            <p>{publicCertificationText(item.body)}</p>
            {item.ctaLabel && item.ctaUrl && <a href={item.ctaUrl}>{item.ctaLabel}</a>}
          </article>
        ))}
      </section>
    </main>
  );
}
