import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Check, Shield, X } from "lucide-react";
import Slider from "@/components/Slider";
import ProductReel from "@/components/ProductReel";
import AddCartButton from "@/components/AddToCartButton";
import { Product } from "@/payload-types"
import {
  ProductLocal,
  APIResponse,
  BadgeProps,
  CardProps,
  PageProps,
  SystemRequirements
} from "./product-types";

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Catalogo', href: '/products' },
] as const;

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseStyles = "inline-flex items-center rounded-md px-2 py-1 text-sm text-black font-medium ring-1 ring-inset";
  const variants = {
    default: "bg-blue-500 text-white ring-blue-600",
    secondary: "bg-gray-700 text-black-200 ring-gray-600"
  } as const;

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`rounded-lg bg-card text-card-foreground shadow-xl ${className}`} {...props}>
      {children}
    </div>
  );
};

const DEFAULT_PRODUCT: ProductLocal = {
  id: "default-product",
  name: "Marvel's Spider-Man: Miles Morales",
  description: "Tras los acontecimientos de Marvel's Spider-Man Remasterizado, el adolescente Miles Morales se adapta a su nuevo barrio al tiempo que sigue los pasos de Peter Parker, su mentor, para convertirse en un nuevo Spider-Man. Pero cuando una feroz lucha de poderes amenaza con destruir su nuevo hogar, el aspirante a héroe se da cuenta de que un gran poder conlleva una gran responsabilidad. Para salvar la Nueva York de Marvel, Miles debe tomar el relevo de Spider-Man y estar a la altura.",
  rating: 5,
  categories: ["FPS", "sci-fi"],
  price: {
    current: 50000,
    original: 50000,
    discount: 0
  },
  developer: "Sin desarrollador",
  releaseDate: "Sin fecha",
  // Para el carrusel
  images: [{ url: "/spidergetta.webp", alt: "Default Image" }, { url: "/logo.png", alt: "Default Image2" }],
  logo: {
    url: "/spidegettaLogo.png",
    alt: "Default Logo"
  },
  systemRequirements: {
    minimum: {
      os: "Windows 10",
      processor: "Intel Core i3",
      memory: "4 GB RAM",
      graphics: "Intel HD Graphics",
      directX: "Version 11",
      storage: "50 GB"
    },
    recommended: {
      os: "Windows 10",
      processor: "Intel Core i5",
      memory: "8 GB RAM",
      graphics: "NVIDIA GTX 1060",
      directX: "Version 12",
      storage: "50 GB SSD"
    }
  },
  reviews: {
    average: 5,
    total: 1,
    items: [
      {
        id: "1",
        username: "JuanNaCl",
        rating: 4,
        comment: "tremenda basura que el game este tan mal optimizado parece que lo hicieron con los pies parece que no les pagaron centavo para hacer la version de pc", 
        date: "2024-09-01",
      },
      {
        id: "2",
        username: "FlopaMaster",
        rating: 4,
        comment: "Si estas pensando en comprarlo hay unas cosas a tener en cuenta.1. El online de multijugador si esta vivo, pero solo un modo de juego y es duelo por equipos, el resto de modos esta muerto e intentar buscar partida en esos modos es esperar por lo menos 3 a 4 horas a que encuentres un alma en pena en una sala tambien vacia y juntos esperar por el resto de la eternidad2. Zombies esta vivo, pero tampoco todos los mapas(los tres primeros mapas antes del dlc y zombies chronicles estan vivos excluyendo al pobre de zetsubou no shima y el resto de mapas de jungla :v), siendo honesto yo compre este juego por zombies y puedo decir que valen la pena desde mi punto de vista, aunque recomiendo tener el ultimo dlc de los mapas de zombies chronicles, de todas maneras no es necesario comprarlo ya que este juego posee algo muy bueno que son los custom maps que te permiten traer mapas como nuketown zombien o hasta mob of the dead sin tener que pagar nada en lo absoluto, ademas de mods creados por la comunidad de entre los que destaco poner mas jugadores en sala, huds de otros juegos y armas como cold war, etc. (hay un monton es cuestion de buscar un poco ;) 3. Requisitos: Este juego aunque ya es antiguo requiere de un pc medianamente decente asi que por lo menos agenciate una buena tarjeta grafica y unas 8gb de ram. De lo contrario tendras demasiado stutter al jugar ya que este juego esta mal optimizado.", 
        date: "2024-09-01",
      }
    ]
  },
  relatedProducts: [
    {
      id: "1",
      name: "halo 4",
      price: {
        current: 45,
        original: 50,
        discount: 10,
      },
      rating: 4.5,
      mainImage: "https:halo 4.jpg",
      categories: ["fps", "sci-fi"],
    }
  ],
  metadata: {
    approvedForSale: true,
    platform: "PC",
    features: []
  },
  //TODO: Quitar esto de cantidad, no tiene sentido que exista en el producto
  qty: 12,
  category: "casos",
  //TODO: Quitar esto de product_files, no tiene sentido que exista en el producto, ya que se podria interceptar el enlace y obtener el archivo
  product_files: "file",
  updatedAt: "2024-09-01T00:00:00.000Z",
  createdAt: "2021-09-01T00:00:00.000Z",
};

const SystemRequirementsSection: React.FC<{
  title: string;
  requirements: SystemRequirements;
  className?: string;
}> = ({ title, requirements, className = '' }) => (
  <div className={className}>
    <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
      {(Object.entries(requirements) as [keyof SystemRequirements, string][]).map(([key, value]) => (
        <li key={key}>
          <span className="font-light">{key}<br /></span>
          <span className="font-semibold">{value}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Page: React.FC<PageProps> = async ({ params }) => {
  const { productId } = params;
  let productData: ProductLocal;

  try {
    const response = await fetch(`/api/products/${productId}`);
    const result = await response.json() as APIResponse;

    if (result.status === "success") {
      productData = result.data;
    } else {
      productData = DEFAULT_PRODUCT;
    }
  } catch (error) {
    productData = DEFAULT_PRODUCT;
  }

  if (!productData || !productData.metadata.approvedForSale) {
    return notFound();
  }


  // Función auxiliar para convertir ProductLocal a Product
  const convertToProduct = (productLocal: ProductLocal): Product => {
    return {
      id: productLocal.id,
      name: productLocal.name,
      description: productLocal.description,
      price: productLocal.price.current,
      qty: productLocal.qty,
      category: productLocal.categories,
      product_files: productLocal.product_files,
      images: productLocal.images.map((img) => ({
        image: img.url,
        id: null,
      })),
      updatedAt: productLocal.updatedAt,
      createdAt: productLocal.createdAt,
    };
  };

  const productDataCart: Product = convertToProduct(productData);

  const validUrls = productData.images.map(img => img.url);
  const categories = productData.categories;

  return (
    <div className='bg-[#FCFCFC]'>
      <div className="min-h-screen bg-[#FCFCFC] xl:mx-20 lg:mx-14 md:mx-10 sm:mx-4">
        <div className="w-full px-4 py-6">
          <h1 className="text-4xl font-bold">{productData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center pr-2 border-r border-gray-600">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#30AEB6] text-2xl pb-1">★</span>
              ))}
              <span className="ml-1 text-[#30AEB6]">{productData.rating}</span>
            </div>
            {categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="bg-transparent text-gray-400">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          <div className="lg:col-span-2">
            <Slider urls={validUrls} />
          </div>

          <div className="space-y-6 lg:row-span-2">
            <img
              src={productData.logo.url}
              alt={productData.logo.alt}
              className="w-full 2xl:h-48 xl:h-40 lg:h-32 object-contain lg:block hidden"
            />

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                {productData.price.discount > 0 && (
                  <Badge className="bg-blue-500">-{productData.price.discount}%</Badge>
                )}
                <div className="text-right">
                  {productData.price.original > productData.price.current && (
                    <div className="line-through text-gray-400">
                      {formatPrice(productData.price.original)}
                    </div>
                  )}
                  <div className="text-2xl font-bold">
                    {formatPrice(productData.price.current)}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="mt-6">
                  <AddCartButton product={
                    productDataCart
                  } />
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Desarrollador</span>
                    <span>{productData.developer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fecha de lanzamiento</span>
                    <span>{productData.releaseDate}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-4 space-y-6 lg:col-span-2">
            <p className="text-base text-gray-700">
              {productData.description}
            </p>
          </div>

          <div className="mt-4 lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Requisitos de Sistema
            </h2>
            <div className="bg-zinc-100 dark:bg-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SystemRequirementsSection
                  title="Mínimos"
                  requirements={productData.systemRequirements.minimum}
                  className="md:border-r border-gray-600 pr-4 md:pr-4"
                />
                <SystemRequirementsSection
                  title="Recomendados"
                  requirements={productData.systemRequirements.recommended}
                  className="border-gray-600 pl-0 md:pl-4 border-t sm:border-t-0"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 lg:col-span-3">
            <div className="dark:bg-gray-900 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Últimas Reseñas ({productData.reviews.total})
              </h2>
              <div className="rounded-lg bg-zinc-100 space-y-4 px-6">
                {productData.reviews.items.map((review) => (
                  <div key={review.id} className="border-b last:border-b-0 pb-4 first:pt-4 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {review.username}
                      </span>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-[#30AEB6] text-2xl pb-1">★</span>
                        ))}
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="py-6 space-y-6 lg:col-span-3">
            <ProductReel
              href="/products"
              query={{ category: [categories[0]], limit: 4 }}
              classNamesSlider=""
              title={`${categories[0]} Similares`}
              subtitle={`Productos similares a ${productData.name} para explorar.`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
