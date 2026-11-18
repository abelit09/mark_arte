import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { FREE_SHIPPING_THRESHOLD, formatCurrency } from '../../shared/commerce.js'

export default function CartDrawer({ onClose }) {
  const {
    items,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [order, setOrder] = useState(null)

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const shippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  )

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  async function handleCheckout() {
    setCheckingOut(true)
    setCheckoutError('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo completar el pedido.')
      }

      clearCart()
      setOrder(data)
    } catch (error) {
      setCheckoutError(error.message || 'No se pudo completar el pedido.')
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <>
      <div className="cart-overlay" onClick={onClose} aria-hidden="true" />

      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="cart-header">
          <h3 id="cart-heading">{order ? 'Pedido confirmado' : 'Tu carrito'}</h3>
          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {order ? (
          <div className="order-confirmation">
            <div className="order-icon" aria-hidden="true">✅</div>
            <h4>¡Gracias por tu compra!</h4>
            <p>Tu pedido fue registrado correctamente.</p>
            <p className="order-id">Pedido: {order.orderId}</p>
            <p className="order-total">Total: {formatCurrency(order.total)}</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            {items.length === 0 ? (
              <div className="cart-empty">
                <div className="empty-icon" aria-hidden="true">🛒</div>
                <h4>Tu carrito está vacío</h4>
                <p>Agrega productos artesanales para comenzar.</p>
                <button type="button" className="btn btn-primary" onClick={onClose}>
                  Ver productos
                </button>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {items.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <span className="product-cat">{item.category}</span>
                        <h4>{item.name}</h4>
                        <div className="cart-item-actions">
                          <div
                            className="qty-control"
                            role="group"
                            aria-label={`Cantidad de ${item.name}`}
                          >
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Disminuir cantidad"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Aumentar cantidad"
                              disabled={item.quantity >= 99}
                            >
                              +
                            </button>
                          </div>
                          <strong>{formatCurrency(item.price * item.quantity)}</strong>
                        </div>
                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() => removeItem(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="shipping-progress" aria-live="polite">
                    <p className="shipping-progress-label">
                      {remainingForFreeShipping > 0 ? (
                        <>
                          Te faltan <strong>{formatCurrency(remainingForFreeShipping)}</strong> para
                          envío gratis
                        </>
                      ) : (
                        '¡Envío gratis desbloqueado!'
                      )}
                    </p>
                    <div className="shipping-progress-track" aria-hidden="true">
                      <span style={{ width: `${shippingProgress}%` }} />
                    </div>
                  </div>

                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Envío</span>
                    <span>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</span>
                  </div>
                  <div className="cart-summary-row total">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>

                  {checkoutError ? (
                    <p className="cart-message" role="alert">{checkoutError}</p>
                  ) : null}

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCheckout}
                    disabled={checkingOut}
                  >
                    {checkingOut ? 'Procesando...' : 'Finalizar compra'}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </aside>
    </>
  )
}
