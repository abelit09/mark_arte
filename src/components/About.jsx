export default function About() {
  return (
    <section id="acerca" className="about">
      <div className="container about-grid">
        <div className="about-img">
          <img
            src="/images/about-artisan.svg"
            alt="Manos de artesano dando forma a una pieza de cerámica"
          />
        </div>
        <div className="about-text">
          <span className="section-label">Nuestra historia</span>
          <h3>Hecho a mano, hecho con corazón</h3>
          <p>
            MarkArte nació con el sueño de conectar a talentosos artesanos locales con personas
            que valoran lo auténtico. Cada pieza que encuentras aquí lleva consigo horas de
            trabajo, dedicación y una historia única.
          </p>
          <ul className="about-list">
            <li>✅ Apoyamos directamente a más de 120 artesanos independientes</li>
            <li>✅ Materiales sostenibles y procesos respetuosos con el ambiente</li>
            <li>✅ Cada pieza es única y lleva la firma de su creador</li>
            <li>✅ Envíos seguros y garantía de satisfacción</li>
          </ul>
          <a href="#testimonios" className="btn btn-primary">Conoce más sobre nosotros</a>
        </div>
      </div>
    </section>
  )
}
