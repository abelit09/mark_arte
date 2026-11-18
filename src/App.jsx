import { useCallback, useEffect, useMemo, useState } from 'react'
import About from './components/About.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CategoryGrid from './components/CategoryGrid.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import NewArrivals from './components/NewArrivals.jsx'
import Newsletter from './components/Newsletter.jsx'
import ProductSection from './components/ProductSection.jsx'
import PromoBanner from './components/PromoBanner.jsx'
import Testimonials from './components/Testimonials.jsx'
import Toast from './components/Toast.jsx'
import TrustBar from './components/TrustBar.jsx'
import { useCart } from './context/CartContext.jsx'
import { catalogUrl } from './lib/config.js'

function scrollToProducts() {
  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const { itemCount, addItem } = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [catalogLoading, setCatalogLoading] = useState(true)
  const [catalogError, setCatalogError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [saleOnly, setSaleOnly] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCatalog() {
      setCatalogLoading(true)
      setCatalogError('')

      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(catalogUrl('products'), { signal: controller.signal }),
          fetch(catalogUrl('categories'), { signal: controller.signal }),
        ])

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('No se pudo cargar el catálogo.')
        }

        const [productData, categoryData] = await Promise.all([
          productsResponse.json(),
          categoriesResponse.json(),
        ])

        setProducts(Array.isArray(productData) ? productData : [])
        setCategories(Array.isArray(categoryData) ? categoryData : [])
        setCatalogLoading(false)
      } catch (error) {
        if (error.name === 'AbortError') return
        setCatalogError(error.message || 'No se pudo cargar la tienda.')
        setCatalogLoading(false)
      }
    }

    loadCatalog()
    return () => controller.abort()
  }, [reloadKey])

  const normalizedQuery = query.trim().toLocaleLowerCase('es')
  const hasFilters = Boolean(normalizedQuery || activeCategory || saleOnly)

  const filteredProducts = useMemo(() => products.filter((product) => {
    const searchableText = `${product.name} ${product.category} ${product.artisan ?? ''}`
      .toLocaleLowerCase('es')
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
    const matchesCategory = !activeCategory || product.category === activeCategory
    const matchesSale = !saleOnly || Boolean(product.oldPrice)
    return matchesQuery && matchesCategory && matchesSale
  }), [products, normalizedQuery, activeCategory, saleOnly])

  const featuredProducts = useMemo(
    () => filteredProducts.filter((product) => !product.isNew),
    [filteredProducts],
  )
  const newProducts = useMemo(
    () => products.filter((product) => product.isNew),
    [products],
  )
  const visibleProducts = hasFilters ? filteredProducts : featuredProducts

  const isPureSaleView = hasFilters && saleOnly && !normalizedQuery && !activeCategory
  const sectionTitle = hasFilters
    ? (isPureSaleView ? 'Ofertas artesanales' : 'Resultados')
    : 'Productos destacados'
  const sectionSubtitle = hasFilters
    ? (isPureSaleView
      ? 'Piezas seleccionadas con descuento'
      : 'Productos que coinciden con tus filtros')
    : 'Los favoritos de nuestros clientes'

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message })
  }, [])

  const handleAddToCart = useCallback((product) => {
    addItem(product)
    showToast(`Agregaste ${product.name} al carrito.`)
  }, [addItem, showToast])

  const handleSearch = useCallback(() => {
    scrollToProducts()
  }, [])

  const handleSelectCategory = useCallback((category) => {
    setActiveCategory((currentCategory) => (
      currentCategory === category ? '' : category
    ))
    setQuery('')
    setSaleOnly(false)
    scrollToProducts()
  }, [])

  const handleShowSales = useCallback(() => {
    setQuery('')
    setActiveCategory('')
    setSaleOnly(true)
    scrollToProducts()
  }, [])

  const handleClearFilters = useCallback(() => {
    setQuery('')
    setActiveCategory('')
    setSaleOnly(false)
    scrollToProducts()
  }, [])

  const handleLogin = useCallback(() => {
    showToast('Inicio de sesión disponible en la versión completa de MarkArte.')
  }, [showToast])

  const handleSubscribe = useCallback(() => {
    showToast('Gracias por suscribirte al newsletter de MarkArte.')
  }, [showToast])

  const handleOpenCart = useCallback(() => setCartOpen(true), [])
  const handleCloseCart = useCallback(() => setCartOpen(false), [])
  const handleCloseToast = useCallback(() => setToast(null), [])
  const handleRetry = useCallback(() => setReloadKey((currentKey) => currentKey + 1), [])

  return (
    <>
      <Header
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onOpenCart={handleOpenCart}
        itemCount={itemCount}
        onLogin={handleLogin}
      />

      <main>
        <Hero />
        <TrustBar />
        <CategoryGrid
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleSelectCategory}
        />
        <ProductSection
          products={visibleProducts}
          onAdd={handleAddToCart}
          loading={catalogLoading}
          error={catalogError}
          onRetry={handleRetry}
          hasFilters={hasFilters}
          activeCategory={activeCategory}
          saleOnly={saleOnly}
          query={query}
          onClearFilters={handleClearFilters}
          onShowAll={handleClearFilters}
          title={sectionTitle}
          subtitle={sectionSubtitle}
        />
        <PromoBanner onShowSales={handleShowSales} />
        {!hasFilters ? <NewArrivals products={newProducts} onAdd={handleAddToCart} /> : null}
        <About />
        <Testimonials />
        <Newsletter onSubscribe={handleSubscribe} />
      </main>

      <Footer />

      {cartOpen ? <CartDrawer onClose={handleCloseCart} /> : null}
      <Toast toast={toast} onClose={handleCloseToast} />
    </>
  )
}
