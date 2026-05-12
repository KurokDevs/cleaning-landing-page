import * as React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { supabase } from "../lib/supabase"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Guardamos la referencia del formulario ANTES de la operación asíncrona
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const service = formData.get("service") as string
    const message = formData.get("message") as string

    try {
      // 1. Guardar en Supabase
      const { error } = await supabase
        .from('contact_requests')
        .insert([
          { name, email, service, message }
        ])

      if (error) throw error

      setSubmitStatus('success')
      
      // Limpiar el formulario usando la referencia guardada
      form.reset()

    } catch (error) {
      console.error('Error al guardar:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-transparent">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Solicitar Cotización</h3>
        <p className="text-gray-600 text-sm">
          Completa el formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
      </div>
      
      {submitStatus === 'success' ? (
        <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="font-bold text-lg mb-2">¡Solicitud enviada!</h4>
          <p>Hemos recibido tus datos correctamente. Te contactaremos muy pronto.</p>
          <Button 
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 h-auto" 
            onClick={() => setSubmitStatus('idle')}
          >
            Enviar otra solicitud
          </Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" name="name" placeholder="Ej: Juan Pérez" required disabled={isSubmitting} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" name="email" type="email" placeholder="ejemplo@correo.com" required disabled={isSubmitting} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service">Servicio de interés</Label>
            <Select name="service" required defaultValue="residencial" disabled={isSubmitting}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residencial">Limpieza Residencial</SelectItem>
                <SelectItem value="comercial">Limpieza Comercial</SelectItem>
                <SelectItem value="profunda">Limpieza Profunda</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje (Opcional)</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="Cuéntanos más sobre lo que necesitas..." 
              className="resize-none"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo o contáctanos por teléfono.
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 h-auto hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            *Tus datos están seguros. No enviamos spam.
          </p>
        </form>
      )}
    </div>
  )
}
