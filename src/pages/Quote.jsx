import { FileText, Headphones, Send, Truck } from "lucide-react";
import { useState } from "react";
import { api } from "../services/api";

const initial = { organization: "", contactName: "", email: "", phone: "", productCategory: "", quantity: "", requirements: "" };

export default function Quote() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    await api.post("/quotes", form);
    setStatus("Quote request submitted. Admin can now view it in the dashboard.");
    setForm(initial);
  };

  return (
    <main>
      <section className="page-hero"><h1>Request a Quote</h1><p>Get tailored pricing and product guidance.</p></section>
      <section className="form-layout">
        <div>
          <h2>Quotation support</h2>
          <p>Submit your requirement for implants, ventilators, defibrillators, or hospital equipment. JD2 can support product matching, specifications, pricing, and delivery planning.</p>
          <p><FileText /> Custom pricing by volume and configuration</p>
          <p><Truck /> Delivery and installation coordination</p>
          <p><Headphones /> Technical consultation for procurement teams</p>
        </div>
        <form className="panel-form" onSubmit={submit}>
          <input name="organization" value={form.organization} onChange={update} placeholder="Hospital / Organization" required />
          <input name="contactName" value={form.contactName} onChange={update} placeholder="Contact Person" required />
          <input type="email" name="email" value={form.email} onChange={update} placeholder="Email Address" required />
          <input name="phone" value={form.phone} onChange={update} placeholder="Phone Number" required />
          <select name="productCategory" value={form.productCategory} onChange={update} required>
            <option value="">Select Product Category</option>
            <option>Ventilators</option>
            <option>Defibrillators</option>
            <option>Ortho Implants</option>
            <option>Other Medical Equipment</option>
          </select>
          <input name="quantity" value={form.quantity} onChange={update} placeholder="Required Quantity" />
          <textarea name="requirements" value={form.requirements} onChange={update} placeholder="Requirements and specifications" required />
          <button className="button primary" type="submit">Submit Request <Send size={17} /></button>
          {status && <small>{status}</small>}
        </form>
      </section>
    </main>
  );
}
