import { Award, CircleCheck, Eye, Target } from "lucide-react";
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
      <PageHero title="About JD2 Meditech" subtitle="Orthopedic implants and medical equipment solutions" />
      <section className="split-section">
        <img src={assetUrl(profile.imageUrl || "/images/section3.jpg")} alt="Company profile" />
        <div>
          <span className="eyebrow">{profile.eyebrow || "Company profile"}</span>
          <h2>{profile.title || "Professionally managed medical technology partner"}</h2>
          <p>{profile.body || "JD2 Meditech Pvt. Ltd. is a manufacturer and exporter in orthopedic implants and instruments. The company has served the orthopedic market since 2017 with a focus on quality, service, and long-term client relationships."}</p>
          <p>We work with specialized orthopedic surgeons and healthcare teams to support global product exploration, procurement, and reliable supply of implants and medical equipment.</p>
        </div>
      </section>
      <section className="section tinted">
        <div className="cards four">
          <div><Award /><h3>CE Certified</h3><p>Orthopedic implant standards for surgical use.</p></div>
          <div><CircleCheck /><h3>ISO Process</h3><p>Quality management and inspection discipline.</p></div>
          <div><Target /><h3>Mission</h3><p>Provide premium medical products that improve patient outcomes.</p></div>
          <div><Eye /><h3>Vision</h3><p>Become a globally trusted orthopedic implant partner.</p></div>
        </div>
      </section>
    </main>
  );
}

function PageHero({ title, subtitle }) {
  return <section className="page-hero"><h1>{title}</h1><p>{subtitle}</p></section>;
}
