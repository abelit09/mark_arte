export default function PromoBanner({ onShowSales }) {
  return (
    <section id="descuentos" className="promo-banner">
      <div className="container promo-content">
        <div>
          <span className="promo-tag">🔥 Oferta limitada</span>
          <h3>¡Hasta 40% de descuento en artículos seleccionados!</h3>
          <p>No te pierdas estas ofertas exclusivas en productos artesanales únicos.</p>
        </div>
        <button type="button" className="btn btn-primary btn-lg" onClick={onShowSales}>
          Ver ofertas
        </button>
      </div>
    </section>
  )
}
