"use client"

import { FC, useState } from "react"
import { Button } from "../ui/button"

interface SupportFormModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (subject: string, message: string) => void
}

const SupportFormModal: FC<SupportFormModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  if (!show) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(subject, message)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Enviar Mensaje de Soporte</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject" className="block mb-1 font-medium">
              Asunto
            </label>
            <input
              id="subject"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Mensaje
            </label>
            <textarea
              id="message"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SupportFormModal
