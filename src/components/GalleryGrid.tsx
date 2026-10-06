import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { galleryItems } from '../data/gallery'
import { useCms } from '../data/CmsContext'

export function GalleryGrid() {
  const { site } = useCms()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[number] | null>(null)
  const galleryCategories = ['All', ...new Set(galleryItems.map(item => item.category).filter(Boolean))]

  const filteredGallery = useMemo(() => {
    return activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory, site])

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {galleryCategories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-red-600 bg-red-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:text-red-600'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {filteredGallery.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white text-left shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                {item.category}
              </div>
              <div className="mt-2 text-lg font-bold text-slate-900">{item.title}</div>
              <p className="mt-2 text-sm text-slate-600">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <button
              type="button"
              aria-label="Close gallery image"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg"
              onClick={() => setSelectedItem(null)}
            >
              <X size={18} />
            </button>
            <img src={selectedItem.image} alt={selectedItem.title} className="max-h-[75vh] w-full object-cover" />
            <div className="p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-600">
                {selectedItem.category}
              </div>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">{selectedItem.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{selectedItem.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
