import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors">
          ¿Tengo que proporcionar los productos y equipos de limpieza?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 text-base">
          No, nuestro equipo lleva todos los productos y equipos profesionales necesarios para realizar el trabajo. Si prefieres que usemos algún producto específico tuyo, solo tienes que avisarnos.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-left font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors">
          ¿Necesito estar en casa durante el servicio?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 text-base">
          No es necesario. Muchos de nuestros clientes nos dejan las llaves, nos dan un código de acceso o nos permiten entrar a través del portero del edificio. Todo nuestro personal ha pasado estrictos controles de confianza.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-left font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors">
          ¿Qué pasa si tengo mascotas?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 text-base">
          ¡Amamos a los animales! Solo te pedimos que nos avises con anticipación para usar productos 100% seguros y "pet-friendly". También te recomendamos que si tu mascota es nerviosa con extraños, la ubiques en un área segura durante la limpieza.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger className="text-left font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors">
          ¿Qué sucede si no quedo satisfecho con la limpieza?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 text-base">
          Tu satisfacción es nuestra prioridad. Contamos con una garantía de 24 horas: si alguna área no cumplió tus expectativas, regresaremos y la volveremos a limpiar sin ningún costo adicional.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
