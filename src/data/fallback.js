export const categories = [
  { key: "patient-monitor", label: "Patient Monitor", path: "/products/patient-monitor" },
  { key: "radiology", label: "Radiology", path: "/products/radiology" },
  { key: "hospital-furniture", label: "Hospital Furniture", path: "/products/hospital-furniture" },
  { key: "sterility-disinfection", label: "Sterility & Disinfection", path: "/products/sterility-disinfection" },
  { key: "cardiology", label: "Cardiology", path: "/products/cardiology" },
  { key: "anesthesia", label: "Anesthesia", path: "/products/anesthesia" },
  { key: "ventilators", label: "Ventilators", path: "/products/ventilators" },
  { key: "respiratory-care", label: "Respiratory Care", path: "/products/respiratory-care" },
  { key: "defibrillators", label: "Defibrillators", path: "/products/defibrillators" },
  { key: "ortho-implants", label: "Ortho Implants", path: "/products/ortho-implants" }
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
