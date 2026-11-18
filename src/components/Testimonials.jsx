const testimonials = [
  {
    name: 'María González',
    quote: 'La calidad de la cerámica es increíble. Se nota que está hecha con mucho cuidado. ¡Volveré a comprar!',
  },
  {
    name: 'Carlos Ramírez',
    quote: 'Me encanta apoyar a artesanos locales. El bolso de cuero superó mis expectativas, vale cada centavo.',
  },
  {
    name: 'Sofía Mendoza',
    quote: 'Envío rápido, empaque precioso y el producto igual a las fotos. MarkArte es mi tienda favorita ahora.',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-heading">
          <h3>Lo que dicen nuestros clientes</h3>
          <p>Miles de personas confían en MarkArte</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <div className="stars" aria-label="5 de 5 estrellas">⭐⭐⭐⭐⭐</div>
              <p>"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>Cliente verificado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
