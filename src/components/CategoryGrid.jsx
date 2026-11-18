export default function CategoryGrid({ categories, activeCategory, onSelect }) {
  if (categories.length === 0) return null

  return (
    <section id="categorias" className="categories">
      <div className="container">
        <div className="section-heading">
          <h3>Categorías</h3>
          <p>Encuentra lo que buscas por tipo de artesanía</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const isActive = activeCategory === category.name
            return (
              <button
                key={category.name}
                type="button"
                className={`category-card${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => onSelect(category.name)}
              >
                <div className="category-img" aria-hidden="true">{category.icon}</div>
                <h4>{category.name}</h4>
                <span>{category.count} {category.count === 1 ? 'producto' : 'productos'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
