'use client'

import { Category, Product } from '../payload-types'
import { TypeProductQueryValidator } from '../lib/validators/product-query-validator'
import { trpc } from '../trpc/client'
import Link from 'next/link'
import React from 'react'
import ProductListing from './ProductList'

interface Props {
  title?: string;
  subtitle?: string;
  href?: string;
  query: TypeProductQueryValidator;
  classNamesSlider?: string;
}

const ProductReel: React.FC<Props> = ({ title, subtitle, href, query, classNamesSlider }) => {
  const { data: items, isLoading } = trpc.getMainProducts.useInfiniteQuery(
    {
      limit: query.limit ?? 4,
      query,
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage }
  );

  let products = items?.pages.flatMap((page) => page.items);

  // Filtrar los productos basándote en el searchTerm
  if (products) {
    products = products.filter(product =>
      product.name.toLowerCase().includes((query.searchTerm ?? '').toLowerCase())
    );
  }
  let products_map: (Product | null)[] = [];

  if (products && products.length > 0) {
    products_map = products;
  } else if (isLoading) {
    products_map = new Array<null>(query.limit ?? 4).fill(null);
  }

  const [category] = query.category ?? ['Estrenos'];

  return (
    <section className="py-0">

      { title || subtitle || href ? (
        <div className="md:flex md:items-center md:justify-between mb-4">
          <div className="max-w-2xl lg:max-w-4xl lg:px-0">
            {title ? (
              <a className="text-2xl font-bold text-gray-900 sm:text-2xl" href={href}>
                {title}
              </a>
            ) : null}
            {subtitle ? <h3 className="mt-2 text-sm text-gray-600">{subtitle}</h3> : null}
          </div>
          {href ? (
            <Link
              href={href}
              className="hidden text-sm font-medium text-[#30AEB6] hover:text-[#37C8D1] md:block"
            >
              Explorar {query.category} <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className="relative">
        <div className="mt-4 flex items-center w-full">
          <div className={`w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8 ${classNamesSlider}`}>
            {products_map.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
                category={
                  product?.category.some(
                    (cat) => typeof cat !== 'string' && cat.name === category
                  )
                    ? category
                    : typeof product?.category[0] !== 'string'
                      ? product?.category[0].name
                      : 'Estrenos'
                }
              />
            ))}
          </div>
        </div>
      </div>
      {products_map.length === 0 && !isLoading && (
        <p className="mt-4 text-gray-600 text-center">No se encontraron Productos</p>
      )}
    </section>
  );
};

export default ProductReel;
