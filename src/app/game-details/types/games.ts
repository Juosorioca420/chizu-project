export interface GameRequirements {
    processor: string;
    os: string;
    memory: string;
    graphics: string;
    directX: string;
    storage: string;
}

export interface Review {
    username: string;
    rating: number;
    comment: string;
}

export interface RelatedGame {
    id: string;
    title: string;
    category: string;
    price: number;
    imageUrl: string;
}

export interface Game {
    id: string;
    title: string;
    price: number;
    category: string;
    rating: number;
    creator: string;
    description: string;
    images: string[];
    minRequirements: GameRequirements;
    recommendedRequirements: GameRequirements;
    reviews: Review[];
    relatedGames: RelatedGame[];
}