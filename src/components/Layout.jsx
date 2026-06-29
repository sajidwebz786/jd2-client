import { Award, ClipboardList, Facebook, Globe2, Instagram, Mail, Menu, Phone, Search, ShieldCheck, X, ChevronDown, Youtube } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { categories as fallbackCategories, fallbackProducts } from "../data/fallback";
import { services, servicePath } from "../data/services";
import { productAnchor } from "./ProductGrid.jsx";
import { api, assetUrl } from "../services/api";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState(fallbackCategories);
  const [products, setProducts] = useState(fallbackProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  };

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")])
      .then(([categoryRes, productRes]) => {
        setCategories(categoryRes.data.length ? categoryRes.data.map((item) => ({ ...item, path: `/products/${item.key}` })) : fallbackCategories);
        setProducts(productRes.data.length ? productRes.data : fallbackProducts);
      })
      .catch(() => {
        setCategories(fallbackCategories);
        setProducts(fallbackProducts);
      });
  }, []);

  useEffect(() => {
    const closeSearch = (event) => {
      if (event.key === "Escape") { setSearchOpen(false); setOpenDropdown(null); }
      if (event.type === "mousedown" && !event.target.closest(".site-search")) {
        setSearchOpen(false);
      }
      if (event.type === "mousedown" && !event.target.closest(".nav-dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", closeSearch);
    document.addEventListener("keydown", closeSearch);
    return () => {
      document.removeEventListener("mousedown", closeSearch);
      document.removeEventListener("keydown", closeSearch);
    };
  }, []);

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (query.length < 2) return [];
    return products
      .filter((product) => {
        if (!product.category) return false;
        const haystack = [
          product.name,
          product.category,
          product.shortDescription
        ].filter(Boolean).join(" ").toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 6);
  }, [products, searchTerm]);

  const renderSearchBox = () => (
    <div className="site-search">
      <Search size={16} />
      <input
        aria-label="Search products"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setSearchOpen(true);
        }}
        onFocus={() => setSearchOpen(true)}
      />
      {searchOpen && searchTerm.trim().length >= 2 && (
        <div className="search-results-panel">
          {searchResults.length ? searchResults.map((product) => {
            const category = categories.find((item) => item.key === product.category);
            return (
              <Link
                className="search-result-card"
                key={product.id || product.slug || product.name}
                to={`/products/${product.category}#${productAnchor(product)}`}
                onClick={() => {
                  setSearchTerm("");
                  close();
                }}
              >
                <img src={assetUrl(product.imageUrl)} alt={product.name} />
                <span>{category?.label || product.category}</span>
                <strong>{product.name}</strong>
              </Link>
            );
          }) : (
            <div className="search-empty">No matching products</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="top-contact-bar">
        <div>
          <span><Phone size={14} /> +91 99595 90524</span>
          <span><Globe2 size={14} /> www.jd2meditech.com</span>
          <span><Mail size={14} /> info@jd2meditech.com</span>
          <span><ShieldCheck size={14} /> GST: 37AAFCJ6175K1Z2 | NHA: IN2810069836</span>
        </div>
        <Link className="top-quote-button" to="/quote">Request Quote</Link>
        <div className="top-socials">
          <a href="#" aria-label="Facebook"><Facebook size={14} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={14} /></a>
          <a href="#" aria-label="YouTube"><Youtube size={15} /></a>
        </div>
      </div>
      <header className="site-header">
        <Link className="brand" to="/" onClick={close}>
          <img src="/images/logo.png" alt="JD2 Meditech" />
         
        </Link>
        <div className="mobile-search-wrap">{renderSearchBox()}</div>
        <button className="icon-button mobile-only" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav open" : "nav"}>
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/implant-system" onClick={close}>Implant System</NavLink>
          <div className={`nav-dropdown ${openDropdown === "services" ? "dropdown-open" : ""}`}
               onMouseEnter={() => setOpenDropdown("services")}
               onMouseLeave={() => setOpenDropdown(null)}>
            <span className="nav-dropdown-label" onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}>Services <ChevronDown size={16} /></span>
            <div className="dropdown-panel services-mega">
              {services.map((service) => (
                <Link className="service-menu-item" to={servicePath(service.key)} onClick={close} key={service.key}>
                  <img src={assetUrl(service.imageUrl)} alt={service.title} />
                  <span>
                    <strong>{service.shortTitle}</strong>
                    <small>{service.tagline}</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className={`nav-dropdown ${openDropdown === "products" ? "dropdown-open" : ""}`}
               onMouseEnter={() => setOpenDropdown("products")}
               onMouseLeave={() => setOpenDropdown(null)}>
            <span className="nav-dropdown-label" onClick={() => setOpenDropdown(openDropdown === "products" ? null : "products")}>Products <ChevronDown size={16} /></span>
            <div className="dropdown-panel mega-menu">
              {categories.map((group) => {
                const groupProducts = products.filter((product) => product.category === group.key).slice(0, 7);
                return (
                <div className="mega-menu-group" key={group.key}>
                  <Link className="mega-menu-title" to={`/products?category=${group.key}`} onClick={close}>{group.label}</Link>
                  {groupProducts.length ? groupProducts.map((item) => (
                    <Link
                      key={item.id || item.slug || item.name}
                      to={`/products?category=${group.key}#${productAnchor(item)}`}
                      onClick={close}
                    >
                      {item.name}
                    </Link>
                  )) : null}
                </div>
                );
              })}
            </div>
          </div>
          <NavLink to="/certifications.html" onClick={close}>Certifications</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </nav>
        <div className="nav-tools">
          {renderSearchBox()}
          <Link className="tool-button" to="/certifications.html" aria-label="Certifications"><Award size={18} /></Link>
          <Link className="tool-button" to="/quote" aria-label="Request quote"><ClipboardList size={18} /></Link>
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <div>
          <img src="/images/logo.png" alt="JD2 Meditech" />
          <p>JD2 Meditech Private Limited is a comprehensive healthcare solutions provider delivering complete procurement solutions — medical equipment, pharmaceuticals, surgical consumables, modular OT solutions, hospital furniture, and injectable products. GST: 37AAFCJ6175K1Z2 | NHA Health Facility Registration: IN2810069836. Trusted by Apollo Group, KIMS Group, Aster Group, ESI Hospitals, Central Government & South Central Railway Hospitals, GGH and Primary Area Hospitals across Andhra Pradesh.</p>
          <div className="footer-social">
            <span>Follow</span>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={19} /></a>
          </div>
        </div>
        <div>
          <strong>Products</strong>
          {categories.map((item) => <Link key={item.key} to={`/products/${item.key}`}>{item.label}</Link>)}
        </div>
        <div>
          <strong>Company</strong>
          <Link to="/about">About</Link>
          <Link to="/certifications.html">Certifications</Link>
          <Link to="/quote">Request Quote</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <strong>Contact</strong>
          <p className="footer-contact"><Globe2 size={16} /> www.jd2meditech.com</p>
          <p className="footer-contact"><Phone size={16} /> +91 - 99595 90524</p>
          <p className="footer-contact"><Mail size={16} /> info@jd2meditech.com</p>
        </div>
      </footer>
    </>
  );
}
