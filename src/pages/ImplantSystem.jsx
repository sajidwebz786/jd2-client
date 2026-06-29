import { BadgeCheck, MoveRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const implantGroups = [
  {
    title: "Clavicle Plate",
    items: [
      "Lateral Clavicle Plate",
      "Clavicle Hook Plate",
      "Anterior Clavicle Plate"
    ],
    image: "/images/ortho-implants/Safety Lock Periarticular Proximal Humerus Plate.jpg"
  },
  {
    title: "Humerus",
    items: [
      "Proximal Humerus Plate",
      "Multi Angle Humerus Nail",
      "Distal Humerus Plate"
    ],
    image: "/images/ortho-implants/Safety Lock Periarticular Proximal Humerus Plate.jpg"
  },
  {
    title: "Femur",
    items: [
      "Distal Femur Plate",
      "Proximal Femur Nail",
      "Anatomical Femoral Plate"
    ],
    image: "/images/ortho-implants/1_5MM Safety Lock Strut Plate.jpg"
  },
  {
    title: "Foot & Ankle",
    items: [
      "Calcaneum Plate",
      "Ankle Arthrodesis Nail",
      "Metatarsal Plate"
    ],
    image: "/images/ortho-implants/13ea40df965dcbd9c546c03033808a0b.jpg"
  },
  {
    title: "Scapula",
    items: [
      "Lateral Border Scapula",
      "Medial Border Scapula",
      "Glenoid Plate"
    ],
    image: "/images/ortho-implants/TowerLOX MIS Pedicle Screw System.jpg"
  },
  {
    title: "Radius & Ulna",
    items: [
      "Radial Head Rim Plate",
      "Olecranon Plate",
      "Distal Radius Plate"
    ],
    image: "/images/ortho-implants/CapLOX II Pedicle Screw System.jpg"
  },
  {
    title: "Pelvic",
    items: [
      "Infrapectineal Pelvic Plate",
      "Acetabular Plate",
      "Symphysis Plate"
    ],
    image: "/images/ortho-implants/Mmmmm painful_ Spinal fusion. Talk about getting screwed_. Talk about getting screwed.jpg"
  },
  {
    title: "Tibia",
    items: [
      "Proximal Tibial Plate",
      "Distal Medial Tibial Plate",
      "T-Buttress Plate"
    ],
    image: "/images/ortho-implants/1_5MM Safety Lock Strut Plate.jpg"
  }
];

const leftGroups = implantGroups.slice(0, 4);
const rightGroups = implantGroups.slice(4);

function ImplantPanel({ group }) {
  return (
    <article className="implant-panel">
      <h2>{group.title}</h2>
      <div className="implant-panel-body">
        <img src={group.image} alt={group.title} />
        <ul>
          {group.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function AnatomyFigure() {
  return (
    <div className="anatomy-figure" aria-hidden="true">
      <img src="/images/implant-skeleton-reference.png" alt="" />
    </div>
  );
}

export default function ImplantSystem() {
  return (
    <main className="implant-page">
      <section className="implant-poster" aria-label="Implant system catalogue">
        <div className="implant-title-block">
          <h1>Implant System</h1>
          <div className="implant-mark">
            <img src="/images/logo.png" alt="JD2 Meditech" />
            <span>Orthopedic implant range</span>
          </div>
        </div>

        <div className="implant-diagram">
          <div className="implant-column">
            {leftGroups.map((group) => (
              <ImplantPanel group={group} key={group.title} />
            ))}
          </div>

          <div className="implant-center">
            <AnatomyFigure />
            <div className="implant-center-note">
              <BadgeCheck size={18} />
              <span>Trauma, spine, pelvic and extremity systems</span>
            </div>
          </div>

          <div className="implant-column">
            {rightGroups.map((group) => (
              <ImplantPanel group={group} key={group.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="implant-detail-section">
        <div className="implant-showcase-card">
          {implantGroups.slice(0, 6).map((group) => (
            <div key={group.title}>
              <img src={group.image} alt={group.title} />
              <strong>{group.title}</strong>
            </div>
          ))}
        </div>
        <div className="implant-detail-copy">
          <span>Orthopedic implant systems by JD2 Meditech</span>
          <h2>Comprehensive implant ranges for trauma, spine and extremity procedures</h2>
          <p>
            JD2 Meditech is a comprehensive healthcare solutions provider — beyond orthopedic implants, we also supply medical equipment, pharmaceuticals, surgical consumables, modular OT solutions, hospital furniture, and injectable products. Our implant portfolio covers clavicle, humerus, femur, foot & ankle, scapula, radius & ulna, pelvic, and tibia systems, available with specifications, sizing support, and quotation assistance.
          </p>
          <div className="implant-checks">
            <p><ShieldCheck size={19} /> ISO, ISI Mark, NSIC Approved, WHO GMP — all implant systems are quality certified.</p>
            <p><ShieldCheck size={19} /> Available to hospitals across Andhra Pradesh including GGH, Area Hospitals, Apollo, KIMS, Aster, ESI, and Central Government Hospitals.</p>
            <p><ShieldCheck size={19} /> Request a quote with procedure details, preferred material, sizes, and quantity requirements.</p>
          </div>
          <Link className="button primary" to="/quote">Request Implant Quote <MoveRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
