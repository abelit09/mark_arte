export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4>MarkArte</h4>
          <p>
            Tu tienda online de productos artesanales únicos, hechos a mano con amor por
            artesanos locales.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Pinterest">📌</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Tienda</h4>
          <ul>
            <li><a href="#productos">Todos los productos</a></li>
            <li><a href="#categorias">Categorías</a></li>
            <li><a href="#novedades">Novedades</a></li>
            <li><a href="#descuentos">Ofertas</a></li>
            <li><a href="#acerca">Artesanos</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Envíos y entregas</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
            <li><a href="#">Métodos de pago</a></li>
            <li><a href="#">Contáctanos</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <ul className="contact-list">
            <li>📍 Dirección: Av. Principal 123, Ciudad</li>
            <li>📞 Teléfono: +34 600 000 000</li>
            <li>✉️ Email: hola@markarte.com</li>
            <li>🕐 Lun-Vie: 9:00 - 18:00</li>
          </ul>
          <div className="payment-methods">
            <span className="payment-icon">💳 Visa</span>
            <span className="payment-icon">💳 Mastercard</span>
            <span className="payment-icon">🏦 PayPal</span>
            <span className="payment-icon">💰 Transferencia</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 MarkArte. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#">Política de privacidad</a>
            <a href="#">Términos y condiciones</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
