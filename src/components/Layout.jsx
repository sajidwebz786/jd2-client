import { Facebook, Globe2, Heart, Instagram, Mail, Menu, Phone, Search, ShoppingBag, UserRound, X, ChevronDown, Youtube } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { categories, fallbackProducts } from "../data/fallback";
import { productAnchor } from "./ProductGrid.jsx";
import { api, assetUrl } from "../services/api";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(fallbackProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setSearchOpen(false);
  };

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data.length ? res.data : fallbackProducts))
      .catch(() => setProducts(fallbackProducts));
  }, []);

  useEffect(() => {
    const closeSearch = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
      if (event.type === "mousedown" && !event.target.closest(".site-search")) {
        setSearchOpen(false);
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
          <div className="nav-dropdown">
            <span>Products <ChevronDown size={16} /></span>
            <div className="dropdown-panel">
              {categories.map((item) => <Link key={item.key} to={item.path} onClick={close}>{item.label}</Link>)}
            </div>
          </div>
          <NavLink to="/quote" onClick={close}>Request Quote</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          <NavLink to="/admin" onClick={close}>Admin</NavLink>
        </nav>
        <div className="nav-tools">
          {renderSearchBox()}
          <Link className="tool-button" to="/quote" aria-label="Saved products"><Heart size={18} /></Link>
          <Link className="tool-button" to="/products/ventilators" aria-label="Shop products"><ShoppingBag size={18} /></Link>
          <Link className="tool-button" to="/admin" aria-label="Admin login"><UserRound size={18} /></Link>
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <div>
          <img src="/images/logo.png" alt="JD2 Meditech" />
          <p>JD2 Meditech Pvt. Ltd. manufactures orthopedic implants and supplies dependable medical equipment for healthcare facilities.</p>
          <div className="footer-social">
            <span>Follow</span>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={19} /></a>
          </div>
        </div>
        <div>
          <strong>Products</strong>
          {categories.map((item) => <Link key={item.key} to={item.path}>{item.label}</Link>)}
        </div>
        <div>
          <strong>Company</strong>
          <Link to="/about">About</Link>
          <Link to="/quote">Request Quote</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <strong>Contact</strong>
          <p className="footer-contact"><Globe2 size={16} /> www.jd2meditech.com</p>
          <p className="footer-contact"><Phone size={16} /> +91 - 8849304101</p>
          <p className="footer-contact"><Mail size={16} /> info@jd2meditech.com</p>
        </div>
      </footer>
    </>
  );
}
