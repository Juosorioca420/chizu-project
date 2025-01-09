"use client";

import { useState } from "react";

export default function UploadGame() {
  const [gameFile, setGameFile] = useState(null);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    minRequirements: "",
    recRequirements: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        file: "El archivo debe ser menor a 50 MB.",
      }));
      setGameFile(null);
      return;
    }
    setErrors((prev) => ({ ...prev, file: null }));
    setGameFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );

    if (validImages.length !== files.length) {
      setErrors((prev) => ({
        ...prev,
        images: "Solo se permiten imágenes (JPEG, PNG, WEBP).",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, images: null }));
    setImages(validImages);
    setPreviewImages(validImages.map((file) => URL.createObjectURL(file)));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData({ ...gameData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!gameData.title || gameData.title.length < 3)
      newErrors.title = "El título debe tener al menos 3 caracteres.";
    if (!gameData.description || gameData.description.length < 10)
      newErrors.description = "La descripción debe tener al menos 10 caracteres.";
    if (!gameData.category)
      newErrors.category = "Por favor selecciona una categoría.";
    if (!gameData.price || gameData.price <= 0)
      newErrors.price = "El precio debe ser mayor a 0.";
    if (!gameData.minRequirements || gameData.minRequirements.length < 10)
      newErrors.minRequirements = "Los requisitos mínimos deben tener al menos 10 caracteres.";
    if (!gameData.recRequirements || gameData.recRequirements.length < 10)
      newErrors.recRequirements = "Los requisitos recomendados deben tener al menos 10 caracteres.";
    if (!gameFile)
      newErrors.file = "Por favor selecciona un archivo de videojuego.";
    if (images.length === 0)
      newErrors.images = "Por favor sube al menos una imagen del videojuego.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Game data submitted:", { ...gameData, gameFile, images });
    alert("¡Juego cargado exitosamente!");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Carga tu Videojuego</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título del juego */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Título del juego
          </label>
          <input
            type="text"
            name="title"
            value={gameData.title}
            onChange={handleChange}
            placeholder="Ej. Galaxy Shooter"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Descripción del juego
          </label>
          <textarea
            name="description"
            value={gameData.description}
            onChange={handleChange}
            placeholder="Describe brevemente tu videojuego..."
            className="w-full border border-gray-300 rounded-lg p-3 h-32"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Categorías */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Categorías
          </label>
          <select
            name="category"
            value={gameData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option value="accion">Acción</option>
            <option value="aventura">Aventura</option>
            <option value="puzzle">Puzzle</option>
            <option value="rpg">RPG</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={gameData.price}
            onChange={handleChange}
            placeholder="Ej. 300000"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Requisitos mínimos */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Requisitos mínimos
          </label>
          <textarea
            name="minRequirements"
            value={gameData.minRequirements}
            onChange={handleChange}
            placeholder="Ej. OS: Windows 10, RAM: 8GB, etc."
            className="w-full border border-gray-300 rounded-lg p-3 h-32"
          />
          {errors.minRequirements && (
            <p className="text-red-500 text-sm">{errors.minRequirements}</p>
          )}
        </div>

        {/* Requisitos recomendados */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Requisitos recomendados
          </label>
          <textarea
            name="recRequirements"
            value={gameData.recRequirements}
            onChange={handleChange}
            placeholder="Ej. OS: Windows 10, RAM: 16GB, etc."
            className="w-full border border-gray-300 rounded-lg p-3 h-32"
          />
          {errors.recRequirements && (
            <p className="text-red-500 text-sm">{errors.recRequirements}</p>
          )}
        </div>

        {/* Carga de imágenes */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Imágenes del videojuego
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
        </div>

        {/* Vista previa de imágenes */}
        {previewImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Vista previa ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        {/* Carga del archivo */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Archivo del videojuego
          </label>
          <input
            type="file"
            accept=".zip,.rar,.exe"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
        </div>

        {/* Vista previa del archivo */}
        {preview && (
          <div className="mt-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Vista previa del archivo
            </label>
            <iframe
              src={preview}
              className="w-full h-64 border border-gray-300 rounded-lg"
            ></iframe>
          </div>
        )}

        {/* Botón de carga */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Cargar Videojuego
          </button>
        </div>
      </form>
    </div>
  );
}
