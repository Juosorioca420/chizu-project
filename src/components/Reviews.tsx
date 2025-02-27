import React from "react";
import payload from "payload";

interface Review {
    id: string;
    review: string;
    user?: string;
    recommend: boolean;
}
interface ReviewsProps {
  productId: string;
}
export const Reviews = async ({ productId }: ReviewsProps) => 
    const response = await payload.find({
        collection: "reviews",
        where: {
            product: {
                equals: productId,
            },
        },
    });

    const reviews: Review[] = response.docs as unknown as Review[];

    const recommendedReviews = reviews.filter((review) => review.recommend);
    const notRecommendedReviews = reviews.filter((review) => !review.recommend);

    return (
        <div className="mt-10 flex flex-col items-center pb-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Reseñas</h1>

            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    {/* ✅ Comentarios que recomiendan el producto */}
                    <div>
                        <h2 className="text-green-600 font-bold text-xl mb-4 text-center">Opiniones Positivas</h2>
                        {recommendedReviews.length > 0 ? (
                            recommendedReviews.map((review) => (
                                <div key={review.id} className="p-5 bg-gray-100 rounded-lg shadow-lg mb-6 max-w-[95%] mx-auto">
                                    <p className="text-teal-700 font-bold text-lg">{review.user || "Usuario desconocido"}</p>
                                    <hr className="border-t border-gray-300 my-3" />
                                    <p className="text-gray-800 text-justify text-base">{review.review}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic text-center">Aún no hay opiniones positivas.</p>
                        )}
                    </div>

                    {/* ✅ Comentarios que NO recomiendan el producto */}
                    <div>
                        <h2 className="text-red-600 font-bold text-xl mb-4 text-center">Opiniones Negativas</h2>
                        {notRecommendedReviews.length > 0 ? (
                            notRecommendedReviews.map((review) => (
                                <div key={review.id} className="p-5 bg-gray-100 rounded-lg shadow-lg mb-6 max-w-[95%] mx-auto">
                                    <p className="text-teal-700 font-bold text-lg">{review.user || "Usuario desconocido"}</p>
                                    <hr className="border-t border-gray-300 my-3" />
                                    <p className="text-gray-800 text-justify text-base">{review.review}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic text-center">Aún no hay opiniones negativas.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 text-center">No hay comentarios aún.</p>
            )}
        </div>
    );
};
