import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { assetUrl } from "../services/api";

export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id || product.slug || product.name}>
          <div className="product-image-wrap">
            <img src={assetUrl(product.imageUrl)} alt={product.name} />
          </div>
          <div>
            <span>{product.category?.replace("-", " ")}</span>
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <Link to="/quote">Request details <ArrowRight size={16} /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
