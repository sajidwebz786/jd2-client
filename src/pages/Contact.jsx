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
    setStatus("Message submitted. Admin can respond from the dashboard.");
    setForm(initial);
  };

  return (
    <main>
      <section className="page-hero"><h1>Contact Us</h1><p>We are ready to help your healthcare facility.</p></section>
      <section className="form-layout">
        <div className="contact-list">
          <h2>Get in touch</h2>
          <p><MapPin /> 20-1-113/A, Korlagunta Block-1, Chittoor, Tirupati Urban, Andhra Pradesh, India - 517501</p>
          <p><Phone /> +91 9xxxx xxxxx</p>
          <p><Mail /> info@jd2meditechpvtltd.com</p>
          <p><Clock /> Mon-Fri: 9AM - 6PM, Sat: 10AM - 4PM</p>
        </div>
        <form className="panel-form" onSubmit={submit}>
          <input name="name" value={form.name} onChange={update} placeholder="Your Name" required />
          <input type="email" name="email" value={form.email} onChange={update} placeholder="Email Address" required />
          <input name="phone" value={form.phone} onChange={update} placeholder="Phone Number" />
          <input name="subject" value={form.subject} onChange={update} placeholder="Subject" />
          <textarea name="message" value={form.message} onChange={update} placeholder="Your Message" required />
          <button className="button primary" type="submit">Send Message <Send size={17} /></button>
          {status && <small>{status}</small>}
        </form>
      </section>
    </main>
  );
}
