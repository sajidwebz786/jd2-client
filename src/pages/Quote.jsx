import { FileText, Headphones, Send, Truck, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";

const initial = { organization: "", contactName: "", email: "", phone: "", productCategory: "", quantity: "", requirements: "" };

export default function Quote() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const product = searchParams.get("product") || "";
    const quantity = searchParams.get("quantity") || "";

    if (!category && !product && !quantity) return;

    setForm((current) => ({
      ...current,
      productCategory: category,
      quantity,
      requirements: product
        ? `Product: ${product}${quantity ? `\nQuantity: ${quantity}` : ""}`
        : current.requirements
    }));
  }, [searchParams]);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    await api.post("/quotes", form);
    setStatus("Quote request submitted. Our team will contact you shortly.");
    setForm(initial);
  };

  return (
    <main>
      <section className="page-hero"><h1>Request a Quote</h1><p>End-to-end healthcare procurement — medical equipment, pharmaceuticals, surgical consumables, modular OT solutions, hospital furniture, and injectable products.</p></section>
      <section className="form-layout">
        <div>
          <h2>JD2 Meditech Quotation Support</h2>
          <p>JD2 Meditech Private Limited provides comprehensive quotation support for complete hospital procurement. We serve hospitals, nursing homes, diagnostic centres, medical colleges, nursing homes, and government healthcare institutions across India.</p>
          <p><FileText /> Product matching across 6 core business segments — equipment, pharmaceuticals, consumables, OT solutions, furniture & injectables</p>
          <p><Truck /> Competitive pricing and reliable delivery from ISO, ISI & NSIC approved manufacturers</p>
          <p><Headphones /> Technical consultation, installation support, and after-sales service for modular OT projects</p>
          <p><ShieldCheck /> GST Registered (37AAFCJ6175K1Z2) | NHA Health Facility: IN2810069836</p>
        </div>
        <form className="panel-form" onSubmit={submit}>
          <input name="organization" value={form.organization} onChange={update} placeholder="Hospital / Organization Name" required />
          <input name="contactName" value={form.contactName} onChange={update} placeholder="Contact Person" required />
          <input type="email" name="email" value={form.email} onChange={update} placeholder="Email Address" required />
          <input name="phone" value={form.phone} onChange={update} placeholder="Phone Number" required />
          <select name="productCategory" value={form.productCategory} onChange={update} required>
            <option value="">Select Product Category</option>
            {form.productCategory && !["Hospital & Medical Equipment", "Pharmaceuticals & Healthcare Supplies", "Surgical Consumables", "Modular OT Solutions", "Hospital Furniture", "Injectable Products & Critical Care"].includes(form.productCategory) && (
              <option>{form.productCategory}</option>
            )}
            <option>Hospital & Medical Equipment</option>
            <option>Pharmaceuticals & Healthcare Supplies</option>
            <option>Surgical Consumables & Medical Disposables</option>
            <option>Modular Operation Theatre Solutions</option>
            <option>Hospital Furniture & Infrastructure</option>
            <option>Injectable Products & Critical Care Supplies</option>
          </select>
          <input name="quantity" value={form.quantity} onChange={update} placeholder="Required Quantity" />
          <textarea name="requirements" value={form.requirements} onChange={update} placeholder="Describe your hospital's requirements — product type, specifications, quantity, OT project scope, or any other details." required />
          <button className="button primary" type="submit">Submit Request <Send size={17} /></button>
          {status && <small>{status}</small>}
        </form>
      </section>
    </main>
  );
}
