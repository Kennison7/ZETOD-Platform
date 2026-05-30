import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { FAQ_ITEMS } from '../../data/content'
import { useInView } from '../../hooks/useInView'

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left hover:bg-white/[0.03] transition-colors duration-200"
      >
        <span className="font-heading font-medium text-text text-sm lg:text-base">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 lg:px-6 pb-5 lg:pb-6 text-muted text-sm leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const [ref, isInView] = useInView()

  return (
    <section id="faq" className="py-20 lg:py-28">
      <Container>
        <SectionTitle
          eyebrow="FAQ"
          title="Common Questions"
          subtitle="Everything you need to know before starting your assessment."
        />

        <div
          ref={ref}
          className={`max-w-2xl mx-auto space-y-3 transition-all duration-700 ${isInView ? 'in-view opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
