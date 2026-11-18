const benefits = [
  { icon: '🚚', title: 'Envío gratis', text: 'En pedidos desde $75' },
  { icon: '🤝', title: 'Artesanos locales', text: 'Compra directa y justa' },
  { icon: '✨', title: 'Piezas únicas', text: 'Hechas a mano, sin series' },
  { icon: '🌿', title: 'Materiales nobles', text: 'Procesos responsables' },
]

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Ventajas de comprar en MarkArte">
      <div className="container trust-grid">
        {benefits.map((benefit) => (
          <div className="trust-item" key={benefit.title}>
            <span className="trust-icon" aria-hidden="true">{benefit.icon}</span>
            <div>
              <strong>{benefit.title}</strong>
              <span>{benefit.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
