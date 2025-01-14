import React from 'react';
import { Moon, Sun, GamepadIcon, Bell, Heart, ShoppingCart, CircleUser, Search, Home } from 'lucide-react';
import { useTheme } from '../../shared/context/ThemeContext';

export const Navbar: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <nav className="fixed w-full top-0 z-50 bg-[#F5F5F5] dark:bg-gray-900 border-b border-b-gray-400 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-2 flex-1 justify-start">
                        <img
                            src="logos/logo_chizu.svg"
                            alt="Logo Chizu"
                            className="h-16 w-auto max-w-[120px]"
                        />
                        <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                            Chizu
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
                        {/* Botón + azul */}
                        <a href="#" className="bg-blue-500 font-medium text-[#001853] px-4 py-2 rounded">
                            <span className="text-xl">+</span>
                        </a>
                        {/* Botón Juegos */}
                        <a href="#" className="bg-blue-500 font-medium text-[#001853] px-4 py-2 rounded text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                            Juegos
                        </a>
                        {/* Botón Campañas */}
                        <a href="#" className="bg-green-500 font-medium text-[#003800] px-4 py-2 rounded dark:text-gray-200 hover:text-gray-500 dark:hover:text-green-400 transition-colors">
                            Campañas
                        </a>
                        {/* Botón + verde */}
                        <a href="#" className="bg-green-500 font-medium text-[#003800] px-4 py-2 rounded">
                            <span className="text-xl">+</span>
                        </a>
                    </div>

                    {/* Account Options */}
                    <div className="flex items-center space-x-8 flex-1 justify-end">
                        {/* Botón Cuenta */}
                        <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-gray-400 transition-colors flex items-left space-x-2">
                            <CircleUser className="h-5 w-5 text-gray-700 dark:text-gray-200 transform rotate-0 transition-transform duration-500" />
                            <span>Cuenta</span>
                        </a>
                        {/* Botón Tienda */}
                        <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-gray-400 transition-colors">
                            Tienda
                        </a>
                        {/* Botón Carrito */}
                        <a href="#" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-gray-400 transition-colors flex items-center space-x-2">
                            <ShoppingCart className="h-5 w-5 text-gray-700 transform rotate-0 transition-transform duration-500" />
                            <span>0</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
