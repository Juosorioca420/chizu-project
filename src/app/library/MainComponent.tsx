'use client';
import React, { useState, useEffect } from 'react';
import { GamepadIcon, Search, SparklesIcon } from 'lucide-react';
import { Header } from './components/header';
import { GameCard } from './components/GameCard';
import { CampaignCard } from './components/CampaignCard';
import { EmptyFavorites } from './components/EmptyFavorites';
import { useFavorites } from './hooks/useFavorites';
import { games as initialGames, campaigns as initialCampaigns } from './data/items';
import { ActiveTab, FavoritesFilter, Game, Campaign, FileItem } from './types';
import DownloadDialog from './components/DownloadingDialog';

interface MainComponentLibraryProps {
    id_user: string;
}

export const MainComponentLibrary: React.FC<MainComponentLibraryProps> = ({ id_user }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('todos');
    const [favoritesFilter, setFavoritesFilter] = useState<FavoritesFilter>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { startAnimation, getAnimationClass } = useFavorites();
    const [games, setGames] = useState<Game[]>(initialGames);
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

    const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
    const [filesToDownload, setFilesToDownload] = useState<FileItem[]>([]);

    const openDownloadDialog = (files: FileItem[]) => {
        setFilesToDownload(files);
        setIsDownloadDialogOpen(true);
    };
    // Fetch library data on component mount
    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const url = new URL("/api/get-library", window.location.origin);
                url.searchParams.append("id_user", id_user);
                const response = await fetch(url.toString());

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                if (Array.isArray(data.games)) {
                    setGames(data.games);
                }
                if (Array.isArray(data.tiers)) {
                    setCampaigns(data.tiers);
                }
            } catch (error) {
                console.error("Error fetching library:", error);
            }
        };

        fetchLibrary();
    }, [id_user]);

    // Filter items based on active tab and favorites filter
    const getFilteredItems = () => {
        let items: (Game | Campaign)[] = [];

        // First, determine which items to include based on the active tab
        if (activeTab === 'todos') {
            items = [...games];
        } else if (activeTab === 'campanas') {
            items = [...campaigns];
        } else if (activeTab === 'favoritos') {
            if (favoritesFilter === 'all') {
                items = [...games.filter(game => game.isFavorite),
                ...campaigns.filter(campaign => campaign.isFavorite)];
            } else if (favoritesFilter === 'games') {
                items = games.filter(game => game.isFavorite);
            } else {
                items = campaigns.filter(campaign => campaign.isFavorite);
            }
        }

        // Then apply search filter if there's a search term
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            return items.filter(item =>
                item.title.toLowerCase().includes(searchLower)
            );
        }

        return items;
    };

    const handleToggleFavorite = async (id: number, type: 'game' | 'campaign') => {
        const item = type === 'game'
            ? games.find(g => g.id === id)
            : campaigns.find(c => c.id === id);

        if (!item) return;

        // Iniciamos la animación
        startAnimation(id, !item.isFavorite);
        if (type === 'game') {
            setGames(prevGames => prevGames.map(game =>
                game.id === id
                    ? { ...game, isFavorite: !game.isFavorite }
                    : game
            ));
        } else {
            setCampaigns(prevCampaigns => prevCampaigns.map(campaign =>
                campaign.id === id
                    ? { ...campaign, isFavorite: !campaign.isFavorite }
                    : campaign
            ));
        }

        try {
            // Hacemos la petición en segundo plano
            if (type === 'game') {
                const response = await fetch(`/api/toggle_favorite_game?id_user=${id_user}&id_game=${id}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Failed to toggle favorite');
                }
            } else if (type === 'campaign') {
                const response = await fetch(`/api/toggle_favorite_tier?id_user=${id_user}&tier_id=${id}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Failed to toggle favorite');
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);

            // En caso de error, revertimos el cambio
            if (type === 'game') {
                setGames(prevGames => prevGames.map(game =>
                    game.id === id
                        ? { ...game, isFavorite: !game.isFavorite } // Revertimos el cambio
                        : game
                ));
            } else {
                setCampaigns(prevCampaigns => prevCampaigns.map(campaign =>
                    campaign.id === id
                        ? { ...campaign, isFavorite: !campaign.isFavorite } // Revertimos el cambio
                        : campaign
                ));
            }

            // Opcionalmente, mostrar un mensaje al usuario
            // toast.error('No se pudo actualizar el favorito');
        }
    };

    const filteredItems = getFilteredItems();
    const favoriteGames = filteredItems.filter((item): item is Game =>
        'type' in item && item.type === 'game' && item.isFavorite
    );
    const favoriteCampaigns = filteredItems.filter((item): item is Campaign =>
        'type' in item && item.type === 'campaign' && item.isFavorite
    );

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black p-6 sm:px-6 lg:px-12 xl:px-32">
            {/* Renderiza el diálogo globalmente */}
            <DownloadDialog isOpen={isDownloadDialogOpen} onClose={() => setIsDownloadDialogOpen(false)} files={filesToDownload} />

            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* Search Bar */}
            <div className="flex items-baseline justify-end border-b border-gray-400 py-6 mb-6">
                <div className="flex items-center">
                    <div className="relative w-full text-gray-700">
                        <input
                            type="search"
                            name="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Busca tu campaña :)"
                            className="bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none border border-gray-400 hover:border-gray-700 focus:border-gray-700"
                        />
                        <div className='absolute -left-8 top-0 mt-2 mr-4'>
                            <Search
                                aria-hidden='true'
                                className='h-6 w-6 flex-shrink-0 text-gray-600'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Favorites Filters */}
            {activeTab === 'favoritos' && (
                <div className="flex items-center my-6">
                    <div className="flex items-center rounded-lg">
                        <button
                            onClick={() => setFavoritesFilter('all')}
                            className={`px-4 py-2 rounded-md transition-colors ${favoritesFilter === 'all' ? 'bg-gray-200 text-black' : 'text-gray-600 hover:text-black'}`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFavoritesFilter('games')}
                            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${favoritesFilter === 'games' ? 'bg-gray-200 text-black' : 'text-gray-600 hover:text-black'}`}
                        >
                            <GamepadIcon className="w-4 h-4" />
                            Juegos
                        </button>
                        <button
                            onClick={() => setFavoritesFilter('campaigns')}
                            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${favoritesFilter === 'campaigns' ? 'bg-gray-200 text-black' : 'text-gray-600 hover:text-black'}`}
                        >
                            <SparklesIcon className="w-4 h-4" />
                            Campañas
                        </button>
                    </div>
                </div>
            )}

            {/* Content Display */}
            {activeTab === 'favoritos' && favoriteGames.length === 0 && favoriteCampaigns.length === 0 ? (
                <EmptyFavorites setActiveTab={setActiveTab} />
            ) : (
                <div>
                    {/* Favorite Games Section */}
                    {activeTab === 'favoritos' && favoriteGames.length > 0 && (
                        <>
                            <h2 className="text-xl font-bold mb-8">Juegos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                                {favoriteGames.map((game) => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        isFavorite={game.isFavorite}
                                        onToggleFavorite={() => handleToggleFavorite(game.id, 'game')}
                                        animationClass={getAnimationClass(game.id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Favorite Campaigns Section */}
                    {activeTab === 'favoritos' && favoriteCampaigns.length > 0 && (
                        <>
                            <h2 className="text-xl font-bold mb-8">Campañas</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                {favoriteCampaigns.map((item) => (
                                    <CampaignCard
                                    key={item.id}
                                    product={item}
                                    isFavorite={item.isFavorite}
                                    onToggleFavorite={() => handleToggleFavorite(item.id, 'campaign')}
                                    animationClass={getAnimationClass(item.id)}
                                    onDownloadClick={() => openDownloadDialog(
                                        item.rewards.map((url, index) => ({
                                            name: item.reward_labels[index] || `Recompensa ${index + 1}`, // Nombre del archivo
                                            url: url, // URL del archivo
                                        }))
                                    )}
                                />
                                
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* All Items Grid */}
            {activeTab !== 'favoritos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {filteredItems.map((item) => {
                        if ('type' in item && item.type === 'campaign') {
                            return (
                                <CampaignCard
                                    key={item.id}
                                    product={item}
                                    isFavorite={item.isFavorite}
                                    onToggleFavorite={() => handleToggleFavorite(item.id, 'campaign')}
                                    animationClass={getAnimationClass(item.id)}
                                    onDownloadClick={() => openDownloadDialog(
                                        item.rewards.map((url, index) => ({
                                            name: item.reward_labels[index] || `Recompensa ${index + 1}`, // Nombre del archivo
                                            url: url, // URL del archivo
                                        }))
                                    )}
                                />

                            );
                        } else {
                            return (
                                <GameCard
                                    key={item.id}
                                    game={item as Game}
                                    isFavorite={item.isFavorite}
                                    onToggleFavorite={() => handleToggleFavorite(item.id, 'game')}
                                    animationClass={getAnimationClass(item.id)}
                                />
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};