import { Heart, Menu, Search, ShoppingBag, UserRound, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { categories } from "../data/fallback";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" onClick={close}>
          <img src="/images/logo.png" alt="JD2 Meditech" />
         
        </Link>
        <button className="icon-button mobile-only" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav open" : "nav"}>
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
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
          <label className="site-search">
            <Search size={16} />
            <input placeholder="Search here..." />
          </label>
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
      </footer>
    </>
  );
}
