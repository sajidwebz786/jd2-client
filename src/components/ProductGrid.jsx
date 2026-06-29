import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { assetUrl } from "../services/api";

export function productAnchor(product) {
  const key = product.id || product.slug || product.name;
  return `product-${String(key).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function productSlug(product) {
  return String(product.slug || product.name || product.id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" id={productAnchor(product)} key={product.id || product.slug || product.name}>
          <div className="product-image-wrap">
            <img src={assetUrl(product.imageUrl)} alt={product.name} />
          </div>
          <div>
            <span>{product.category?.replace("-", " ")}</span>
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <Link to={`/products/${product.category}/${productSlug(product)}`}>View details <ArrowRight size={16} /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
