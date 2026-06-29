import { ArrowRight, CheckCircle2, ClipboardCheck, Headphones, PhoneCall } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { services } from "../data/services";
import { assetUrl } from "../services/api";

export default function ServiceDetail() {
  const { serviceKey } = useParams();
  const service = services.find((item) => item.key === serviceKey);

  if (!service) return <Navigate to="/services/biomedical-contract-services" replace />;

  return (
    <main className="service-detail-page">
      <section className="service-detail-hero">
        <div>
          <span>JD2 Meditech Services</span>
          <h1>{service.title}</h1>
          <p>{service.tagline}</p>
          <Link className="button primary" to={`/quote?category=${encodeURIComponent(service.title)}`}>
            Request Service Plan <ArrowRight size={18} />
          </Link>
        </div>
        <img src={assetUrl(service.imageUrl)} alt={service.title} />
      </section>

      <section className="service-detail-content">
        <div className="service-copy">
          <span>Service Overview</span>
          <h2>{service.tagline}</h2>
          <p>{service.intro}</p>
          <p>{service.body}</p>
        </div>
        <aside className="service-feature-panel">
          <h3>What We Support</h3>
          {service.bullets.map((item) => (
            <p key={item}><CheckCircle2 size={18} /> {item}</p>
          ))}
        </aside>
      </section>

      <section className="service-connect">
        <div>
          <span><Headphones size={18} /> Let's Connect</span>
          <h2>We are here to help you better</h2>
          <p>Have a question, need support, or want a service plan suited to your facility? Share your requirement and the JD2 team will respond with practical next steps.</p>
        </div>
        <div className="service-connect-actions">
          <Link to={`/quote?category=${encodeURIComponent(service.title)}`}><ClipboardCheck size={18} /> Request Service Quote</Link>
          <a href="tel:+918849304101"><PhoneCall size={18} /> +91 88493 04101</a>
        </div>
      </section>
    </main>
  );
}
