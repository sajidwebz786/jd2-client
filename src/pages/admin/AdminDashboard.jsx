import {
  Edit,
  Eye,
  FileText,
  ImagePlus,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Plus,
  Save,
  Trash2,
  Upload
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories, fallbackProducts } from "../../data/fallback";
import { api, assetUrl } from "../../services/api";

const blankProduct = {
  name: "",
  slug: "",
  category: "ventilators",
  shortDescription: "",
  description: "",
  imageUrl: "",
  featured: false,
  active: true,
  sortOrder: 0,
  specifications: []
};

const blankContent = {
  page: "home",
  section: "",
  eyebrow: "",
  title: "",
  body: "",
  imageUrl: "",
  ctaLabel: "",
  ctaUrl: "",
  active: true,
  sortOrder: 0
};

const menuItems = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: Package },
  { key: "quotes", label: "Quotes", icon: Inbox },
  { key: "enquiries", label: "Feedback & Enquiries", icon: MessageSquare },
  { key: "content", label: "Website Content", icon: FileText },
  { key: "media", label: "Images", icon: Images }
];

export default function AdminDashboard() {
  const [demoMode, setDemoMode] = useState(localStorage.getItem("jd2_admin_demo") === "true");
  const [activePanel, setActivePanel] = useState("overview");
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [content, setContent] = useState([]);
  const [media, setMedia] = useState([]);
  const [productForm, setProductForm] = useState(blankProduct);
  const [contentForm, setContentForm] = useState(blankContent);
  const [viewProduct, setViewProduct] = useState(null);
  const [mode, setMode] = useState("create");
  const navigate = useNavigate();

  const groupedProducts = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      products: products.filter((product) => product.category === category.key)
    }));
  }, [products]);

  const load = async () => {
    if (localStorage.getItem("jd2_admin_demo") === "true") {
      setDemoMode(true);
      setProducts(fallbackProducts.map((product) => ({
        ...product,
        active: product.active ?? true,
        specifications: product.specifications || []
      })));
      setQuotes([
        {
          id: 1,
          organization: "City Care Hospital",
          contactName: "Demo Buyer",
          email: "purchase@example.com",
          phone: "+91 90000 00000",
          productCategory: "ventilators",
          requirements: "Need ICU ventilator pricing and delivery timeline for a demo discussion.",
          status: "new"
        }
      ]);
      setEnquiries([
        {
          id: 1,
          name: "Dr. Mehta",
          email: "doctor@example.com",
          phone: "+91 98888 88888",
          subject: "Orthopedic implant catalogue",
          message: "Please share available implant categories and quotation process.",
          status: "new"
        }
      ]);
      setContent([
        {
          id: 1,
          page: "home",
          section: "hero",
          eyebrow: "Medical equipment",
          title: "JD2 Meditech Pvt. Ltd.",
          body: "Demo website content record for client walkthrough.",
          active: true,
          sortOrder: 0
        }
      ]);
      setMedia(fallbackProducts.slice(0, 6).map((product) => ({
        id: product.id,
        title: product.name,
        url: product.imageUrl,
        altText: product.name
      })));
      return;
    }

    const [p, q, e, c, m] = await Promise.all([
      api.get("/admin/products"),
      api.get("/admin/quotes"),
      api.get("/admin/enquiries"),
      api.get("/admin/content"),
      api.get("/admin/media")
    ]);
    setProducts(p.data);
    setQuotes(q.data);
    setEnquiries(e.data);
    setContent(c.data);
    setMedia(m.data);
  };

  useEffect(() => {
    load().catch(() => navigate("/admin"));
  }, []);

  function resetProductForm() {
    setProductForm(blankProduct);
    setViewProduct(null);
    setMode("create");
  }

  function editProduct(product) {
    setProductForm({ ...blankProduct, ...product });
    setViewProduct(null);
    setMode("edit");
    setActivePanel("products");
  }

  async function saveProduct(event) {
    event.preventDefault();
    const payload = {
      ...productForm,
      slug: productForm.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    };
    if (demoMode) {
      setProducts((current) => {
        if (payload.id) return current.map((item) => item.id === payload.id ? payload : item);
        return [{ ...payload, id: Date.now() }, ...current];
      });
      resetProductForm();
      return;
    }
    if (productForm.id) await api.put(`/admin/products/${productForm.id}`, payload);
    else await api.post("/admin/products", payload);
    resetProductForm();
    await load();
  }

  async function deleteProduct(product) {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    if (demoMode) {
      setProducts((current) => current.filter((item) => item.id !== product.id));
      if (productForm.id === product.id) resetProductForm();
      if (viewProduct?.id === product.id) setViewProduct(null);
      return;
    }
    await api.delete(`/admin/products/${product.id}`);
    if (productForm.id === product.id) resetProductForm();
    if (viewProduct?.id === product.id) setViewProduct(null);
    await load();
  }

  async function uploadImage(event, target = "product") {
    const file = event.target.files[0];
    if (!file) return;
    if (demoMode) {
      const url = URL.createObjectURL(file);
      const item = { id: Date.now(), title: file.name, url, altText: file.name };
      setMedia((current) => [item, ...current]);
      if (target === "content") setContentForm((current) => ({ ...current, imageUrl: url }));
      else setProductForm((current) => ({ ...current, imageUrl: url }));
      event.target.value = "";
      return;
    }
    const data = new FormData();
    data.append("image", file);
    data.append("title", file.name);
    const res = await api.post("/admin/media", data);
    if (target === "content") setContentForm((current) => ({ ...current, imageUrl: res.data.url }));
    else setProductForm((current) => ({ ...current, imageUrl: res.data.url }));
    event.target.value = "";
    await load();
  }

  function editContent(item) {
    setContentForm({ ...blankContent, ...item });
    setActivePanel("content");
  }

  async function saveContent(event) {
    event.preventDefault();
    if (demoMode) {
      setContent((current) => {
        if (contentForm.id) return current.map((item) => item.id === contentForm.id ? contentForm : item);
        return [{ ...contentForm, id: Date.now() }, ...current];
      });
      setContentForm(blankContent);
      return;
    }
    if (contentForm.id) await api.put(`/admin/content/${contentForm.id}`, contentForm);
    else await api.post("/admin/content", contentForm);
    setContentForm(blankContent);
    await load();
  }

  async function deleteContent(item) {
    if (!window.confirm(`Delete ${item.page} / ${item.section}?`)) return;
    if (demoMode) {
      setContent((current) => current.filter((record) => record.id !== item.id));
      if (contentForm.id === item.id) setContentForm(blankContent);
      return;
    }
    await api.delete(`/admin/content/${item.id}`);
    if (contentForm.id === item.id) setContentForm(blankContent);
    await load();
  }

  async function respond(kind, item, response) {
    if (demoMode) {
      const updater = (current) => current.map((record) => (
        record.id === item.id ? { ...record, response, status: "responded" } : record
      ));
      if (kind === "quote") setQuotes(updater);
      else setEnquiries(updater);
      return;
    }
    const path = kind === "quote" ? "quotes" : "enquiries";
    await api.put(`/admin/${path}/${item.id}`, { ...item, response, status: "responded" });
    await load();
  }

  function logout() {
    localStorage.removeItem("jd2_admin_token");
    localStorage.removeItem("jd2_admin_demo");
    navigate("/admin");
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <img src="/images/logo.png" style={{width:"90%", marginLeft:"auto", marginRight:"auto"}} alt="JD2 Meditech" />
        <Link className="sidebar-link" to="/">View Website</Link>
        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button className={activePanel === item.key ? "active" : ""} key={item.key} onClick={() => setActivePanel(item.key)}>
                <Icon size={18} /> {item.label}
              </button>
            );
          })}
        </nav>
        <button className="logout-button" onClick={logout}><LogOut size={16} /> Logout</button>
      </aside>

      <section className="admin-main">
        <div className="admin-head">
          <h1>Admin Dashboard</h1>
          <p>{demoMode ? "Demo mode with local sample data for client walkthrough." : "Manage products, category tables, uploads, website copy, quote requests, and enquiries."}</p>
        </div>

        {activePanel === "overview" && (
          <>
            <div className="admin-stats">
              <div><Package /><strong>{products.length}</strong><span>Products</span></div>
              <div><Inbox /><strong>{quotes.length}</strong><span>Quotes</span></div>
              <div><MessageSquare /><strong>{enquiries.length}</strong><span>Enquiries</span></div>
              <div><ImagePlus /><strong>{media.length}</strong><span>Images</span></div>
            </div>
            <section className="admin-panel">
              <h2>Quick Links</h2>
              <div className="quick-actions">
                <button onClick={() => setActivePanel("products")}><Plus size={17} /> Add Product</button>
                <button onClick={() => setActivePanel("quotes")}><Inbox size={17} /> View Quotes</button>
                <button onClick={() => setActivePanel("content")}><FileText size={17} /> Edit Website Text</button>
              </div>
            </section>
          </>
        )}

        {activePanel === "products" && (
          <ProductAdmin
            form={productForm}
            mode={mode}
            groupedProducts={groupedProducts}
            media={media}
            viewProduct={viewProduct}
            setForm={setProductForm}
            resetForm={resetProductForm}
            saveProduct={saveProduct}
            uploadImage={uploadImage}
            setViewProduct={setViewProduct}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        )}

        {activePanel === "quotes" && <InboxPanel title="Quote Requests" items={quotes} kind="quote" onRespond={respond} />}
        {activePanel === "enquiries" && <InboxPanel title="Feedback and Enquiries" items={enquiries} kind="enquiry" onRespond={respond} />}

        {activePanel === "content" && (
          <ContentAdmin
            form={contentForm}
            items={content}
            setForm={setContentForm}
            saveContent={saveContent}
            deleteContent={deleteContent}
            editContent={editContent}
            uploadImage={uploadImage}
          />
        )}

        {activePanel === "media" && (
          <MediaAdmin media={media} setProductForm={setProductForm} setContentForm={setContentForm} setActivePanel={setActivePanel} />
        )}
      </section>
    </main>
  );
}

function ProductAdmin({
  form,
  mode,
  groupedProducts,
  media,
  viewProduct,
  setForm,
  resetForm,
  saveProduct,
  uploadImage,
  setViewProduct,
  editProduct,
  deleteProduct
}) {
  return (
    <>
      <section className="admin-panel">
        <div className="panel-title-row">
          <h2>{mode === "edit" ? "Edit Product" : "Create Product"}</h2>
          {mode === "edit" && <button className="secondary-button" onClick={resetForm}>New Product</button>}
        </div>
        <form className="admin-form product-form" onSubmit={saveProduct}>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" required />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((category) => <option key={category.key} value={category.key}>{category.label}</option>)}
          </select>
          <input value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug auto-created if blank" />
          <input type="number" value={form.sortOrder || 0} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} placeholder="Sort order" />
          <input value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" />
          <label className="upload-button"><Upload size={16} /> Upload product image<input type="file" accept="image/*" onChange={(event) => uploadImage(event, "product")} /></label>
          <label className="check-row"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured on home</label>
          <label className="check-row"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Visible on website</label>
          {form.imageUrl && <img className="form-preview" src={assetUrl(form.imageUrl)} alt={form.name || "Product preview"} />}
          <textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} placeholder="Short description" required />
          <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed description" />
          <button className="button primary" type="submit"><Save size={16} /> {mode === "edit" ? "Update Product" : "Create Product"}</button>
        </form>
      </section>

      {viewProduct && (
        <section className="admin-panel view-panel">
          <div>
            <img src={assetUrl(viewProduct.imageUrl)} alt={viewProduct.name} />
          </div>
          <div>
            <span>{viewProduct.category?.replace("-", " ")}</span>
            <h2>{viewProduct.name}</h2>
            <p>{viewProduct.description || viewProduct.shortDescription}</p>
            <p><strong>Status:</strong> {viewProduct.active ? "Visible" : "Hidden"} | <strong>Featured:</strong> {viewProduct.featured ? "Yes" : "No"}</p>
            <div className="row-actions">
              <button onClick={() => editProduct(viewProduct)}><Edit size={16} /> Edit</button>
              <button className="danger-link" onClick={() => deleteProduct(viewProduct)}><Trash2 size={16} /> Delete</button>
            </div>
          </div>
        </section>
      )}

      <section className="admin-panel">
        <h2>Products Category Wise</h2>
        {groupedProducts.map((group) => (
          <div className="category-table" key={group.key}>
            <h3>{group.label}</h3>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {group.products.map((product) => (
                  <tr key={product.id}>
                    <td><img src={assetUrl(product.imageUrl)} alt={product.name} /></td>
                    <td>
                      <strong>{product.name}</strong>
                      <small>{product.shortDescription}</small>
                    </td>
                    <td>{product.active ? "Visible" : "Hidden"}</td>
                    <td>{product.featured ? "Yes" : "No"}</td>
                    <td>
                      <div className="row-actions">
                        <button onClick={() => setViewProduct(product)}><Eye size={15} /> View</button>
                        <button onClick={() => editProduct(product)}><Edit size={15} /> Edit</button>
                        <button className="danger-link" onClick={() => deleteProduct(product)}><Trash2 size={15} /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {group.products.length === 0 && <tr><td colSpan="5">No products in this category yet.</td></tr>}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <section className="admin-panel">
        <h2>Use Uploaded Image for Product</h2>
        <div className="media-grid">
          {media.map((item) => (
            <button key={item.id} onClick={() => setForm({ ...form, imageUrl: item.url })}>
              <img src={assetUrl(item.url)} alt={item.altText || item.title} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function ContentAdmin({ form, items, setForm, saveContent, deleteContent, editContent, uploadImage }) {
  return (
    <>
      <section className="admin-panel">
        <div className="panel-title-row">
          <h2>{form.id ? "Edit Website Text" : "Create Website Text"}</h2>
          {form.id && <button className="secondary-button" onClick={() => setForm(blankContent)}>New Content</button>}
        </div>
        <form className="admin-form product-form" onSubmit={saveContent}>
          <select value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })}>
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="contact">Contact</option>
            <option value="quote">Quote</option>
          </select>
          <input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="Section key, e.g. hero or profile" required />
          <input value={form.eyebrow || ""} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} placeholder="Eyebrow / small label" />
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
          <input value={form.imageUrl || ""} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" />
          <label className="upload-button"><Upload size={16} /> Upload content image<input type="file" accept="image/*" onChange={(event) => uploadImage(event, "content")} /></label>
          <input value={form.ctaLabel || ""} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} placeholder="CTA label" />
          <input value={form.ctaUrl || ""} onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })} placeholder="CTA URL" />
          <label className="check-row"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Visible on website</label>
          {form.imageUrl && <img className="form-preview" src={assetUrl(form.imageUrl)} alt={form.title || "Content preview"} />}
          <textarea value={form.body || ""} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Body text" />
          <button className="button primary" type="submit"><Save size={16} /> {form.id ? "Update Text" : "Create Text"}</button>
        </form>
      </section>

      <section className="admin-panel">
        <h2>Website Text Records</h2>
        <div className="category-table">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Section</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.page}</td>
                  <td>{item.section}</td>
                  <td>{item.title}</td>
                  <td>{item.active ? "Visible" : "Hidden"}</td>
                  <td>
                    <div className="row-actions">
                      <button onClick={() => editContent(item)}><Edit size={15} /> Edit</button>
                      <button className="danger-link" onClick={() => deleteContent(item)}><Trash2 size={15} /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function InboxPanel({ title, items, kind, onRespond }) {
  const [drafts, setDrafts] = useState({});
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      <div className="inbox-list">
        {items.map((item) => (
          <article key={item.id}>
            <h3>{item.organization || item.name}</h3>
            <p>{item.requirements || item.message}</p>
            <small>{item.email} | {item.phone || "No phone"} | {item.status}</small>
            <textarea value={drafts[item.id] || item.response || ""} onChange={(e) => setDrafts({ ...drafts, [item.id]: e.target.value })} placeholder="Write admin response note" />
            <button onClick={() => onRespond(kind, item, drafts[item.id] || item.response || "")}>Mark Responded</button>
          </article>
        ))}
        {items.length === 0 && <p>No records yet.</p>}
      </div>
    </section>
  );
}

function MediaAdmin({ media, setProductForm, setContentForm, setActivePanel }) {
  return (
    <section className="admin-panel">
      <h2>Uploaded Images</h2>
      <div className="media-grid">
        {media.map((item) => (
          <article key={item.id}>
            <img src={assetUrl(item.url)} alt={item.altText || item.title} />
            <strong>{item.title}</strong>
            <small>{item.url}</small>
            <div className="row-actions">
              <button onClick={() => { setProductForm((form) => ({ ...form, imageUrl: item.url })); setActivePanel("products"); }}>Use in Product</button>
              <button onClick={() => { setContentForm((form) => ({ ...form, imageUrl: item.url })); setActivePanel("content"); }}>Use in Content</button>
            </div>
          </article>
        ))}
        {media.length === 0 && <p>No uploaded images yet.</p>}
      </div>
    </section>
  );
}
