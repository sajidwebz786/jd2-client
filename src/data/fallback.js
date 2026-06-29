export const categories = [
  { key: "patient-monitor", label: "Patient Monitor", path: "/products/patient-monitor", description: "Advanced patient monitoring systems for ICU, OT, and emergency care — TRUSCOPE series from JD2 Meditech.", imageUrl: "/images/equipment/device1.jpg", active: true, sortOrder: 1 },
  { key: "radiology", label: "Radiology", path: "/products/radiology", description: "Mobile and fixed X-ray imaging systems for diagnostic and radiology departments in hospitals and clinics.", imageUrl: "/images/defibs/AgfaGEAMXMobileX-RaySystems.jpg", active: true, sortOrder: 2 },
  { key: "hospital-furniture", label: "Hospital Furniture", path: "/products/hospital-furniture", description: "Ergonomic hospital beds, ICU beds, examination tables, patient trolleys, stretchers, and nursing station furniture.", imageUrl: "/images/section3.jpg", active: true, sortOrder: 3 },
  { key: "sterility-disinfection", path: "/products/sterility-disinfection", label: "Sterility & Disinfection", description: "Hospital autoclaves, sterilizers, ethylene oxide sterilizers, and CSSD products for infection control and sterilization.", imageUrl: "/images/section5.jpg", active: true, sortOrder: 4 },
  { key: "cardiology", label: "Cardiology", path: "/products/cardiology", description: "ECG machines, stress test systems, and defibrillators for cardiac care and emergency response in hospitals.", imageUrl: "/images/defibs/defebrillator2.jpg", active: true, sortOrder: 5 },
  { key: "anesthesia", label: "Anesthesia", path: "/products/anesthesia", description: "Anaesthesia workstations and operation theatre support equipment from JD2 Meditech.", imageUrl: "/images/equipment/device10.jpg", active: true, sortOrder: 6 },
  { key: "ventilators", label: "Ventilators", path: "/products/ventilators", description: "Advanced ICU ventilators, transport ventilators, and neonatal ventilation systems for critical care departments.", imageUrl: "/images/ventils/Hamilton-Ventillator.jpg", active: true, sortOrder: 7 },
  { key: "respiratory-care", label: "Respiratory Care", path: "/products/respiratory-care", description: "Oxygen concentrators, CPAP, BPAP, and respiratory therapy systems for patient care.", imageUrl: "/images/ventils/portable-ventilator.jpg", active: true, sortOrder: 8 },
  { key: "defibrillators", label: "Defibrillators", path: "/products/defibrillators", description: "Professional defibrillator monitors and AEDs for emergency cardiac response in hospitals and clinics.", imageUrl: "/images/defibs/Meditech Defibrillator monitor Defi 9.jpg", active: true, sortOrder: 9 },
  { key: "ortho-implants", label: "Ortho Implants", path: "/products/ortho-implants", description: "Spinal fixation systems, trauma plates, pedicle screw systems, and bone fixation implants in titanium alloy and stainless steel.", imageUrl: "/images/ortho-implants/CapLOX II Pedicle Screw System.jpg", active: true, sortOrder: 10 }
];

export const fallbackContent = [
  {
    id: 1,
    page: "certifications",
    section: "quality-approvals",
    eyebrow: "Quality assurance",
    title: "ISO, ISI, NSIC Approved, WHO GMP",
    body: "JD2 Meditech maintains all quality compliances including ISO, ISI Mark, NSIC Approved, and WHO GMP standards across our entire product portfolio.",
    active: true,
    sortOrder: 1
  },
  {
    id: 2,
    page: "certifications",
    section: "compliance-support",
    eyebrow: "Documentation",
    title: "Certificates and compliance documents",
    body: "Product-specific documentation and approval references are available to support hospital procurement and purchase decisions.",
    active: true,
    sortOrder: 2
  },
  {
    id: 3,
    page: "certifications",
    section: "gst-registration",
    eyebrow: "Tax Registration",
    title: "GSTIN: 37AAFCJ6175K1Z2",
    body: "JD2 Meditech Private Limited is registered under GST. GSTIN: 37AAFCJ6175K1Z2 — enabling compliant invoicing and tax credit for all procurement partners.",
    active: true,
    sortOrder: 3
  },
  {
    id: 4,
    page: "certifications",
    section: "nha-registration",
    eyebrow: "National Health Authority",
    title: "Health Facility Registration: IN2810069836",
    body: "Registered with the National Health Authority of India. Health Facility Registration: IN2810069836. Authorised to supply medical equipment, pharmaceuticals, surgical consumables, and critical care products to government healthcare facilities.",
    active: true,
    sortOrder: 4
  },
  {
    id: 5,
    page: "about",
    section: "profile",
    eyebrow: "About JD2 Meditech",
    title: "Complete Healthcare Solutions Under One Roof",
    body: "JD2 Meditech Private Limited is a comprehensive healthcare solutions provider dedicated to supporting hospitals, healthcare institutions, clinics, nursing homes, diagnostic centres, and medical colleges with world-class products and services. We offer an integrated range of healthcare infrastructure, medical equipment, pharmaceuticals, surgical consumables, modular operation theatre solutions, hospital furniture, and injectable products. GST: 37AAFCJ6175K1Z2. NHA: IN2810069836. Trusted by Apollo Group, KIMS Group, Aster Group, ESI Hospitals, Central Government & South Central Railway Hospitals, GGH Hospitals, and Primary Area Hospitals across Andhra Pradesh.",
    imageUrl: "/images/section3.jpg",
    active: true,
    sortOrder: 1
  }
];

export const megaMenuGroups = [
  {
    key: "patient-monitor",
    label: "Patient Monitor",
    items: ["TRUSCOPE III", "TRUSCOPE Q3", "TRUSCOPE Q5", "TRUSCOPE M10"]
  },
  {
    key: "radiology",
    label: "Radiology",
    items: ["MOBILE HF XRAY", "MOBILE LF XRAY", "FIXED HF XRAY", "FIXED LF XRAY", "C ARM", "HANDHELD X RAY"]
  },
  {
    key: "hospital-furniture",
    label: "Hospital Furniture",
    items: ["PATIENT BED", "TRANSFER SUPPORT", "MOTHER CARE", "ICU SUPPORT", "EXAMINATION SUPPORT", "GENERAL SUPPORT"]
  },
  {
    key: "sterility-disinfection",
    label: "Sterility & Disinfection",
    items: ["HOSPITAL AUTOCLAVE", "AUTOCLAVE STERILIZER", "ETHYLENE OXIDE STERILIZER", "TABLETOP AUTOCLAVE", "VERTICAL AUTOCLAVE", "CSSD PRODUCT"]
  },
  {
    key: "cardiology",
    label: "Cardiology",
    items: ["RESTING ECG", "TMT / STRESS TEST ECG", "Defibrillators"]
  },
  {
    key: "anesthesia",
    label: "Anesthesia",
    items: ["A MAC TWO GAS", "A MAC THREE GAS", "AEON 8600A", "AEON 8100 A"]
  },
  {
    key: "ventilators",
    label: "Ventilator",
    items: ["SCHILLER GRAPH NET ADVANCE", "SCHILLER GRAPHNET TS", "AQUILON TS", "BRINA", "AQUILON VX", "SOPHIE", "SCHILLER GRAPHNET NEO"]
  },
  {
    key: "respiratory-care",
    label: "Respiratory Care",
    items: ["OXYGEN CONCENTRATOR", "TRANSPORTABLE OXYGEN CONCENTRATOR", "SLEEP EASY AUTO CPAP", "AIR SMART BILEVEL DEVICE", "SLEEP FAIRY", "COMFIT MASK FOR CPAP & BPAP", "PORTABLE OXYGEN CONCENTRATOR", "BPAP PLUS SERIES"]
  },
  {
    key: "ortho-implants",
    label: "Ortho Implants",
    items: ["Spinal Implants", "Bone Plates", "Pedicle Screw Systems", "Trauma Fixation"]
  }
];

export const fallbackProducts = [
  { id: 1, name: "Hamilton Ventilator", category: "ventilators", shortDescription: "Advanced ICU ventilation with multiple modes and monitoring.", imageUrl: "/images/ventils/Hamilton-Ventillator.jpg", featured: true },
  { id: 2, name: "Portable Ventilator", category: "ventilators", shortDescription: "Compact respiratory support for transport and mobile ICU use.", imageUrl: "/images/ventils/portable-ventilator.jpg", featured: true },
  { id: 3, name: "Infant Incubator", category: "ventilators", shortDescription: "Temperature controlled neonatal intensive care system.", imageUrl: "/images/ventils/Infant Incubator - Yanko Design.jpg" },
  { id: 4, name: "Defibrillator Monitor Defi 9", category: "defibrillators", shortDescription: "Professional AED with integrated patient monitoring.", imageUrl: "/images/defibs/Meditech Defibrillator monitor Defi 9.jpg", featured: true },
  { id: 5, name: "Philips AED", category: "defibrillators", shortDescription: "Reliable automated external defibrillator for emergency care.", imageUrl: "/images/defibs/CalmedEquipmentNewPhilipsAEDs.jpg", featured: true },
  { id: 6, name: "Compact Defibrillator", category: "defibrillators", shortDescription: "Emergency cardiac care device for hospitals and clinics.", imageUrl: "/images/defibs/defebrillator2.jpg" },
  { id: 7, name: "CapLOX II Pedicle Screw System", category: "ortho-implants", shortDescription: "Advanced spinal fixation system in titanium alloy.", imageUrl: "/images/ortho-implants/CapLOX II Pedicle Screw System.jpg", featured: true },
  { id: 8, name: "TowerLOX MIS Pedicle Screw System", category: "ortho-implants", shortDescription: "Minimally invasive spinal solution for advanced procedures.", imageUrl: "/images/ortho-implants/TowerLOX MIS Pedicle Screw System.jpg" },
  { id: 9, name: "Locked Compression Plates", category: "ortho-implants", shortDescription: "Bone plate systems in stainless steel and titanium options.", imageUrl: "/images/ortho-implants/1_5MM Safety Lock Strut Plate.jpg", featured: true }
];
