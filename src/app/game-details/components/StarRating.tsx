import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, className = '' }) => {
    return (
        <div className={`flex ${className}`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
            ))}
        </div>
    );
};