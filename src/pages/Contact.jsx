import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { api } from "../services/api";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    await api.post("/enquiries", form);
    setStatus("Message submitted. Our team will get back to you shortly.");
    setForm(initial);
  };

  return (
    <main>
      <section className="page-hero"><h1>Contact JD2 Meditech</h1><p>Complete healthcare procurement support for hospitals, clinics & government institutions across AP & Telangana.</p></section>
      <section className="form-layout">
        <div className="contact-list">
          <h2>Get in touch</h2>
          <p><MapPin /> 20-1-113/A, Korlagunta Block-1, Chittoor, Tirupati Urban, Andhra Pradesh, India - 517501</p>
          <p><Phone /> +91 99595 90524</p>
          <p><Mail /> info@jd2meditech.com</p>
          <p><Clock /> Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 4:00 PM</p>
        </div>
        <form className="panel-form" onSubmit={submit}>
          <input name="name" value={form.name} onChange={update} placeholder="Your Name" required />
          <input type="email" name="email" value={form.email} onChange={update} placeholder="Email Address" required />
          <input name="phone" value={form.phone} onChange={update} placeholder="Phone Number" />
          <input name="subject" value={form.subject} onChange={update} placeholder="Subject" />
          <textarea name="message" value={form.message} onChange={update} placeholder="Tell us about your hospital's requirements — medical equipment, pharmaceuticals, surgical consumables, modular OT solutions, hospital furniture, or injectable products." required />
          <button className="button primary" type="submit">Send Message <Send size={17} /></button>
          {status && <small>{status}</small>}
        </form>
      </section>
    </main>
  );
}
