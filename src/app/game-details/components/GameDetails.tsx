import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Game } from '../types/games';


interface GameDetailsProps {
    game: Game;
    onAddToCart: () => void;
}

export const GameDetails: React.FC<GameDetailsProps> = ({ game, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = '' }) => {
        const stars = Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`h-5 w-5 ${index < rating ? className : 'text-gray-300'}`}
                viewBox="0 0 24 24"
                fill={index < rating ? 'currentColor' : 'none'}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 17.27L18.18 21 16.54 14.34 22 10.26 15.24 9.63 12 3 8.76 9.63 2 10.26 7.46 14.34 5.82 21z"
                />
            </svg>
        ));

        return <div className="flex">{stars}</div>;
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % game.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + game.images.length) % game.images.length);
    };

    return (
        <div className="bg-[#FCFCFC] max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{game.title}</h1>

            {/* Layout: Carousel and Side Info */}
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
                {/* Image Carousel */}
                <div className="relative w-full md:w-1/2 h-96">
                    <img
                        src={game.images[currentImageIndex]}
                        alt={`${game.title} screenshot ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="w-full md:w-1/2 space-y-8">
                    <div className="h-96 flex flex-col justify-between">
                        <div>
                            <div className="mb-4 border-b border-[#CECECE] dark:border-gray-700 pb-4">
                                <span className="text-3xl text-black dark:text-gray-400">Precio:</span>
                                <span className="text-3xl ml-2 text-black dark:text-white">${game.price.toLocaleString()}</span>
                            </div>
                            <div className="mb-4 border-b border-[#CECECE] dark:border-gray-700 pb-4">
                                <span className="text-3xl text-black dark:text-gray-400">Categoría:</span>
                                <span className="text-3xl ml-2 text-black dark:text-white">{game.category}</span>
                            </div>
                            <div className="mb-4 border-b border-[#CECECE] dark:border-gray-700 pb-4 flex items-center">
                                <span className="text-3xl text-black dark:text-gray-400">Calificación:</span>
                                <StarRating rating={game.rating} className="text-3xl ml-2 text-blue-500" />
                            </div>
                            <div className="mb-6 border-b border-[#CECECE] dark:border-gray-700 pb-4">
                                <span className="text-3xl text-black dark:text-gray-400">Creador:</span>
                                <span className="text-3xl ml-2 text-black dark:text-white">{game.creator}</span>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <button
                                onClick={onAddToCart}
                                className="bg-[#39B5FF] text-[#002D53] text-2xl font-medium py-5 px-7 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Game Info */}
            <div className="mt-8">
                <div className="">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Sobre el Juego</h2>
                    <p className="text-gray-600 dark:text-gray-300">{game.description}</p>
                </div>

                {/* System Requirements */}
                <h2 className="text-2xl font-semibold mb-4 mt-8 ml-4 text-gray-900 dark:text-white">Requisitos de Sistema</h2>
                <div className="bg-[#ADE0E4] dark:bg-gray-700 rounded-t-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:border-r border-gray-600 pr-4 md:pr-4">
                            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Mínimos</h3>
                            <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                                <li><span className="font-medium">OS:</span> {game.minRequirements.os}</li>
                                <li><span className="font-medium">Processor:</span> {game.minRequirements.processor}</li>
                                <li><span className="font-medium">Memory:</span> {game.minRequirements.memory}</li>
                                <li><span className="font-medium">Graphics:</span> {game.minRequirements.graphics}</li>
                                <li><span className="font-medium">DirectX:</span> {game.minRequirements.directX}</li>
                                <li><span className="font-medium">Storage:</span> {game.minRequirements.storage}</li>
                            </ul>
                        </div>
                        <div className="pl-0 md:pl-4">
                            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Recomendados</h3>
                            <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                                <li><span className="font-medium">OS:</span> {game.recommendedRequirements.os}</li>
                                <li><span className="font-medium">Processor:</span> {game.recommendedRequirements.processor}</li>
                                <li><span className="font-medium">Memory:</span> {game.recommendedRequirements.memory}</li>
                                <li><span className="font-medium">Graphics:</span> {game.recommendedRequirements.graphics}</li>
                                <li><span className="font-medium">DirectX:</span> {game.recommendedRequirements.directX}</li>
                                <li><span className="font-medium">Storage:</span> {game.recommendedRequirements.storage}</li>
                            </ul>
                        </div>
                    </div>
                </div>


                {/* Reviews */}
                {/* Mi solucion*/}
                {/* <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Últimas Reseñas</h2>
                    <div className="space-y-4">
                        {game.reviews.map((review, index) => (
                            <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0 border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white">{review.username}</span>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div> */}
                {/* En horizontal */}
                {/* 
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Últimas Reseñas</h2>
                    <div className="flex flex-wrap -mx-2">
                        {game.reviews.map((review, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                                <div className="border p-4 rounded-lg shadow-md border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">{review.username}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Seguir el mockup */}
                {/* <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md mt-8"> */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Últimas Reseñas</h2>
                    <div className="flex flex-wrap -mx-2">
                        {game.reviews.map((review, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                                <div className="p-4">
                                    <span className="font-medium text-gray-900 dark:text-white">{review.username}</span>
                                    <div className="flex space-x-3 mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">Calificación</span>
                                        <StarRating className="text-blue-500" rating={review.rating} />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

                {/* Related Games */}
                <div className="mt-12">
                    <div className="bg-[#ADE0E4] dark:bg-gray-700 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Juegos Relacionados</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:ml-8 sm:ml-4">
                            {game.relatedGames.map((relatedGame) => (
                                <div key={relatedGame.id} className="overflow-hidden">
                                    <img
                                        src={relatedGame.imageUrl}
                                        alt={relatedGame.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="pt-4">
                                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{relatedGame.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{relatedGame.category}</p>
                                        <p className="font-bold text-gray-900 dark:text-white">${relatedGame.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};