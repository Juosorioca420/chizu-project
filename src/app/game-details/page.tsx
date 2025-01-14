"use client";
import React from 'react';
import { GameDetails } from './components/GameDetails';
import { ThemeProvider } from '../../shared/context/ThemeContext';
import { Navbar } from '../../shared/components/Navbar';
import { Game } from './types/games';

// Sustuituir por el objeto de juego que se obtenga de la API
const mockGame: Game = {
    id: '1',
    title: 'Halo 7',
    price: 300000,
    category: 'FPS',
    rating: 5,
    creator: 'OsoPerezoso343',
    description: 'Este es un juego de disparos en primera persona en el que debes salvar a la galaxia de una invasión alienígena.',
    images: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2940',
        'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&q=80&w=2940',
    ],
    minRequirements: {
        processor: 'AMD Ryzen™ 5 1400 or Intel® Core™ i5-6600',
        os: 'Windows® 10 64 Bit (latest update)',
        memory: '8 GB RAM',
        graphics: 'AMD Radeon™ RX 470, NVIDIA® GeForce® GTX 960 or Intel® Arc™ A580',
        directX: 'Version 12',
        storage: 'SSD with 128 GB available space at launch'
    },
    recommendedRequirements: {
        processor: 'AMD Ryzen™ 5 2600 or Intel® Core™ i5-6600',
        os: 'Windows® 10 64 Bit (latest update)',
        memory: '8 GB RAM',
        graphics: 'AMD Radeon™ RX 470, NVIDIA® GeForce® GTX 960 or Intel® Arc™ A580',
        directX: 'Version 12',
        storage: 'SSD with 128 GB available space at launch'
    },
    reviews: [
        {
            username: 'PandaLunar12',
            rating: 5,
            comment: 'Excelente juego, me encantó. Muy recomendado.'
        },
        {
            username: 'Monika0922',
            rating: 4,
            comment: 'Muy buen juego, pero le faltan algunas mejoras.'
        }
    ],
    relatedGames: [
        {
            id: '2',
            title: 'GTA 6',
            category: 'Acción',
            price: 20000,
            imageUrl: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=2940'
        },
        {
            id: '3',
            title: 'Call of Duty: Black Ops 6',
            category: 'FPS',
            price: 20000,
            imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2940'
        },
        {
            id: '4',
            title: 'Counter Strike 2',
            category: 'FPS',
            price: 20000,
            imageUrl: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&q=80&w=2940'
        }
    ]
};

function App() {
    const handleAddToCart = () => {
        console.log('Added to cart');
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-[#FCFCFC] dark:bg-gray-800 transition-colors duration-300">
                {/* <Navbar /> */}
                <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
                    <GameDetails game={mockGame} onAddToCart={handleAddToCart} />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;