"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import SupportFormModal from "./SupportFormModal"
import { toast } from "sonner"

export default function SupportButton() {
  const [showModal, setShowModal] = useState(false)

  // Abrimos el modal
  const handleOpenModal = () => {
    setShowModal(true)
  }

  // Cerramos el modal
  const handleCloseModal = () => {
    setShowModal(false)
  }

  // Se llama cuando el usuario envía el formulario
  const handleSubmit = async (subject: string, message: string) => {
    try {
      // Cerrar el modal
      setShowModal(false)

      // Aquí llamamos a tu endpoint con la estructura solicitada
      const response = await fetch("https://us-central1-chizu-444720.cloudfunctions.net/email", {
        method: "POST", // asumes que tu endpoint use POST, o ajusta si es distinto
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "chizugamessocial@gmail.com",  // correo fijo de los administradores
          subject: subject,
          body: `<div>
                   <h1>Soporte Chizu</h1>
                   <p>${message}</p>
                 </div>`
        }),
      })

      if (!response.ok) {
        throw new Error("Error al enviar mensaje de soporte.")
      }

      toast.success("Mensaje enviado correctamente.")
    } catch (err) {
      toast.error("No se pudo enviar el mensaje. Intente más tarde.")
    }
  }

  return (
    <>
      <Button onClick={handleOpenModal} variant="outline" className="text-red-600">
        Enviar Mensaje de Soporte
      </Button>

      {/* Modal con el formulario */}
      <SupportFormModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  )
}
