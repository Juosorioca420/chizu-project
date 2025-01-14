import { Category, ProductFile } from "@/payload-types";

// types.ts
export interface ProductImage {
    url: string;
    alt: string;
}

export interface ProductCategory {
    id: string;
    name: string;
}

export interface ProductPrice {
    current: number;
    original: number;
    discount: number;
}

export interface SystemRequirements {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    directX: string;
    storage: string;
}

export interface ProductReview {
    id: string;
    username: string;
    rating: number;
    comment: string;
    date: string;
}

export interface ProductReviews {
    average: number;
    total: number;
    items: ProductReview[];
}

export interface RelatedProduct {
    id: string;
    name: string;
    price: ProductPrice;
    rating: number;
    mainImage: string;
    categories: string[];
}

export interface ProductMetadata {
    approvedForSale: boolean;
    platform: string;
    features: string[];
}

export interface ProductLocal {
    id: string;
    name: string;
    description: string;
    rating: number;
    categories: string[];
    price: ProductPrice;
    developer: string;
    releaseDate: string;
    images: ProductImage[];
    logo: ProductImage;
    systemRequirements: {
        minimum: SystemRequirements;
        recommended: SystemRequirements;
    };
    reviews: ProductReviews;
    relatedProducts: RelatedProduct[];
    metadata: ProductMetadata;
    qty: number;
    category:  (string | Category)[] | string;
    product_files:  string | ProductFile;
    updatedAt: string;
    createdAt : string;
}

export interface APIResponse {
    status: 'success' | 'error';
    data: ProductLocal;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'secondary';
    children: React.ReactNode;
    className?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export interface PageProps {
    params: {
        productId: string;
    };
}

