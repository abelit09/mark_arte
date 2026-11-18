import { FREE_SHIPPING_THRESHOLD, formatCurrency } from '../../shared/commerce.js'

export default function ProductCard({ product, onAdd }) {
  const badgeClassName = product.badgeType === 'sale'
    ? 'product-badge badge-sale'
    : 'product-badge'

  return (
    <article className="product-card">
      <div className="product-img">
        <img
          src={product.image}
          alt={product.name}
          width="800"
          height="800"
        />
        {product.badge ? <span className={badgeClassName}>{product.badge}</span> : null}
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span className="product-cat">{product.category}</span>
          {product.artisan ? <span className="product-artisan">{product.artisan}</span> : null}
        </div>
        <h4>{product.name}</h4>
        <div
          className="rating"
          aria-label={`${product.rating} de 5 estrellas, ${product.reviews} reseñas`}
        >
          <span className="rating-stars" aria-hidden="true">
            {'⭐'.repeat(product.rating)}
          </span>
          <span>({product.reviews})</span>
        </div>
        {product.price >= FREE_SHIPPING_THRESHOLD ? (
          <span className="product-shipping">Envío gratis</span>
        ) : null}
        <div className="product-footer">
          <div>
            {product.oldPrice ? (
              <span className="price price-old">{formatCurrency(product.oldPrice)}</span>
            ) : null}
            <span className="price">{formatCurrency(product.price)}</span>
          </div>
          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={() => onAdd(product)}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}
