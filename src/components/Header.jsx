export default function Header({
  query,
  onQueryChange,
  onSearch,
  onOpenCart,
  itemCount,
  onLogin,
}) {
  const cartLabel = itemCount === 1 ? '1 producto' : `${itemCount} productos`

  return (
    <header className="site-header">
      <div className="container nav-container">
        <a className="brand" href="#inicio" aria-label="MarkArte, ir al inicio">
          <h1 className="logo">MarkArte</h1>
          <p className="tagline">Tu tienda online de productos artesanales</p>
        </a>

        <nav className="main-nav" aria-label="Navegación principal">
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#categorias">Categorías</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#novedades">Novedades</a></li>
            <li><a href="#descuentos">Descuentos</a></li>
            <li><a href="#acerca">Acerca de</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <form
            className="search-form"
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              onSearch()
            }}
          >
            <input
              type="search"
              id="Buscar"
              name="Buscar"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
            <button type="submit" aria-label="Buscar">🔍</button>
          </form>

          <button
            className="cart-btn"
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir carrito, ${cartLabel}`}
          >
            🛒 <span className="cart-count">{itemCount}</span>
          </button>

          <button className="btn btn-outline" type="button" onClick={onLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>
  )
}
