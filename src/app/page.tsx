'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import ProductReel from "@/components/ProductReel";
import { ArrowDownToLine, FileText, Headset, ShoppingCart, Sticker, Truck } from "lucide-react";
import Link from "next/link";
import { trpc } from "../trpc/client";

const perks = [
  {
    name: 'Adelanto en PDF',
    icon: FileText,
    des: 'Descarga un adelanto de tu nuevo manga mientras esperas que llegue tu envio.'
  },
  {
    name: 'Los ultimos Estrenos',
    icon: Sticker,
    des: 'Encuentra las ultimas novedades y publicaciones en un solo lugar.'
  },
  {
    name: 'Atencion todos los Dias',
    icon: Headset,
    des: 'Llama a nuestra linea de atención al cliente todos los dias al 111 111 111.'
  },

]

export default function Home() {

  const { data: categories } = trpc.getAllCategories.useQuery({ limit: 5 });

  const styles = {
    backgroundImage: "url('/hero-img.jpg')",
    backgroundSize: 'cover'
  };

  return (
    <>
      <div className="lg:mx-24 md:mx-20 sm:mx-4">
        <div className="py-32 mx-auto text-center flex flex-col items-center max-w-8xl" style={styles} >

          <br></br>

          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-3xl" >
            Bienvenido a la {' '}
            <span className=" text-white ">
              UwUteca
            </span>, tu tienda en linea de Manga en español.

          </h1>

          <h5 className="mt-6 text-lg max-w-prose text-muted-foreground text-white">
            Un e-commerce sencillo, hecho por personas sencillas.
          </h5>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">

            <Link href='/products' className={buttonVariants()}>
              Explorar Catalogo &rarr;
            </Link>

            <Link href='/cart'>
              <Button variant='outline'> Carrito <ShoppingCart className="ml-1 h-4 w-4 text-gray-800" /> </Button>
            </Link>

          </div>

          <br></br>

        </div>
      </div>



      <div className="lg:mx-24 md:mx-20 sm:mx-4">
        {categories?.map((category, index) => (
          <ProductReel
            key={index}
            title={category.name ?? 'Estrenos'}
            subtitle={category.description ?? 'Destacados'}
            href={`/products?category=${category.name}`}
            query={{ sort: 'desc', limit: 4, category: [category.name] ?? ['UwU Selection'] }} />
        )
        )

        }
      </div>

      {/* "border-t border-gray-200 bg-gray-50" */}
      <div className="lg:mx-24 md:mx-20 sm:mx-4">
        <section className='border-t border-gray-300 bg-white'>
          <div className='py-20 lg:mx-24 md:mx-20 sm:mx-4'>
            <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className='text-center md:flex md:items-start md:text-left lg:block lg:text-center mx-auto'>
                  <div className='md:flex-shrink-0 flex justify-center'>
                    <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-200 text-blue-900'>
                      {<perk.icon className='w-1/3 h-1/3' />}
                    </div>
                  </div>

                  <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                    <h3 className='text-base font-medium text-gray-900'>
                      {perk.name}
                    </h3>
                    <p className='mt-3 text-sm text-muted-foreground text-gray-700'>
                      {perk.des}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>


    </>
  );
}
