"use client";

import { FC } from "react";
import { Button } from "./ui/button";

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onCancel,
  title = "¿Está seguro que quiere eliminar su cuenta?",
  description = "Esta acción no se puede deshacer.",
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 !m-0 p-0">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="mb-4 text-gray-700">{description}</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button className="bg-red-500" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
