import ProductCard from './ProductCard.jsx'

export default function NewArrivals({ products, onAdd }) {
  if (products.length === 0) return null

  return (
    <section id="novedades" className="new-arrivals">
      <div className="container">
        <div className="section-heading">
          <h3>Novedades</h3>
          <p>Las últimas piezas añadidas a nuestra colección</p>
        </div>
        <div className="product-grid cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  )
}
