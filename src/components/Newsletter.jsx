import { useState } from 'react'

export default function Newsletter({ onSubscribe }) {
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubscribe(email)
    setEmail('')
  }

  return (
    <section className="newsletter">
      <div className="container newsletter-content">
        <div>
          <h3>¡Suscríbete a nuestro newsletter!</h3>
          <p>
            Recibe ofertas exclusivas, novedades y consejos sobre productos artesanales
            directamente en tu correo.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Tu correo electrónico"
            aria-label="Correo electrónico"
            required
          />
          <button type="submit" className="btn btn-primary">Suscribirme</button>
        </form>
      </div>
    </section>
  )
}
