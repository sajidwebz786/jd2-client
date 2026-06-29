import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import ImplantSystem from "./pages/ImplantSystem.jsx";
import Quote from "./pages/Quote.jsx";
import Contact from "./pages/Contact.jsx";
import Certifications from "./pages/Certifications.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

function RequireAuth({ children }) {
  const authed = localStorage.getItem("jd2_admin_token") || localStorage.getItem("jd2_admin_demo");
  if (!authed) return <Navigate to="/admin" replace />;
  return children;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const selector = [
      ".page-hero",
      ".section-heading",
      ".category-tile",
      ".showcase-card",
      ".home-service-strip article",
      ".about-panel > *",
      ".product-card",
      ".split-section > img",
      ".split-section > div",
      ".cards div",
      ".form-layout > *",
      ".contact-list p",
      ".admin-panel"
    ].join(",");
    const elements = Array.from(document.querySelectorAll(selector));

    elements.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 55}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/implant-system" element={<ImplantSystem />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/:category/:slug" element={<Products />} />
        <Route path="/certifications.html" element={<Certifications />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
    </Routes>
  );
}
