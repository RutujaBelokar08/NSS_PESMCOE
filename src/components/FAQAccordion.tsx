import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { faqs } from '../data/faq'

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-base font-semibold text-slate-800">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen ? <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{faq.answer}</p> : null}
          </div>
        )
      })}
    </div>
  )
}
