import * as React from "react"
import { useTranslation } from "../i18n/LanguageContext"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

export function FAQAccordion() {
  const t = useTranslation()

  return (
    <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      {t.faq.items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i + 1}`}>
          <AccordionTrigger className="text-left font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-base">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
