import ProductCard from './ProductCard.jsx'

export default function ProductSection({
  id = 'productos',
  className = 'products',
  title = 'Productos destacados',
  subtitle = 'Los favoritos de nuestros clientes',
  products,
  onAdd,
  loading,
  error,
  onRetry,
  hasFilters,
  activeCategory,
  saleOnly,
  query,
  onClearFilters,
  onShowAll,
}) {
  const resultLabel = products.length === 1 ? 'resultado' : 'resultados'

  return (
    <section id={id} className={className}>
      <div className="container">
        <div className="section-heading">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        {loading ? (
          <>
            <p className="sr-only" role="status">Cargando productos...</p>
            <div className="product-grid" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => (
                <div className="product-card skeleton-card" key={index}>
                  <div className="skeleton-image" />
                  <div className="product-info">
                    <div className="skeleton-line short" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line medium" />
                    <div className="skeleton-line short" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {error ? (
          <div className="status-message error" role="alert">
            <p>{error}</p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onRetry}>
              Reintentar
            </button>
          </div>
        ) : null}

        {!loading && !error && hasFilters ? (
          <div className="filter-bar">
            <p>
              <strong>{products.length}</strong> {resultLabel}
              {activeCategory ? ` en ${activeCategory}` : ''}
              {saleOnly ? ' en ofertas' : ''}
              {query.trim() ? ` para “${query.trim()}”` : ''}.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        ) : null}

        {!loading && !error && products.length === 0 ? (
          <div className="empty-state">
            <h4>Sin resultados</h4>
            <p>No encontramos productos con esos filtros.</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClearFilters}
            >
              Ver todos los productos
            </button>
          </div>
        ) : null}

        {!loading && !error && products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        ) : null}

        {!loading && !error && !hasFilters ? (
          <div className="center">
            <button type="button" className="btn btn-secondary" onClick={onShowAll}>
              Ver todos los productos
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
