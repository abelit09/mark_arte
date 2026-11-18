import { assetUrl } from '../lib/config.js'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-badge">✨ Hecho a mano con amor</span>
          <h2>Descubre piezas únicas<br />hechas por artesanos</h2>
          <p>
            Calidad, tradición y creatividad en cada producto. Apoya el trabajo independiente y
            lleva a casa algo especial.
          </p>
          <div className="hero-actions">
            <a href="#productos" className="btn btn-primary">Ver productos</a>
            <a href="#categorias" className="btn btn-secondary">Explorar categorías</a>
          </div>
          <div className="hero-stats">
            <div><strong>+500</strong><span>Productos</span></div>
            <div><strong>+120</strong><span>Artesanos</span></div>
            <div><strong>100%</strong><span>Artesanal</span></div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={assetUrl('images/hero-artisan.svg')}
            alt="Mesa de taller con cerámica, textiles y decoración artesanal"
          />
          <div className="hero-float-card">
            <span className="hero-float-icon" aria-hidden="true">🏺</span>
            <div>
              <strong>Piezas únicas</strong>
              <span>Hechas a mano por artesanos locales</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
