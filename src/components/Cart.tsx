'use client'

import { ShoppingCart, X } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { useCart } from "@/hooks/use-cart"
import { ScrollArea } from "./ui/scroll-area"
import CartItem from "./CartItem"
import { useEffect, useState } from "react"


const Cart = () => {

    const { items, clearCart } = useCart()
    const itemCount = items.length

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const cartTotal = items.reduce( ( total, { product, qty } ) => total + ( product.price * (qty ?? 1) ),  0 )
    
    return(

        <Sheet>

            <SheetTrigger className='group -m-2 flex items-center p-2'>
                <ShoppingCart
                aria-hidden='true'
                className='h-6 w-6 flex-sbrink-0 text-gray-400 group-hover:text-gray-500'
                />
                <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                {isMounted ? itemCount: 0}
                </span>
            </SheetTrigger>


            <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>

                <SheetHeader className='space-y-2.5 pr-6'>
                <SheetTitle>Carrito ({itemCount})</SheetTitle>
                </SheetHeader>

                {itemCount > 0 ? (
                <>
                    <div className='flex w-full flex-col pr-6'>
                        {/* Productos */}

                        <div className="flex-shrink-0">
                            <button 
                                className="text-gray-700 hover:text-red-700 mb-2 inline-flex items-center"
                                onClick={
                                    () => {
                                        clearCart()
                                    }
                                }
                            >
                                <X className="w-4 h-4 mt-1 mr-1"/> Vaciar
                            </button>
                        </div>

                        <Separator />

                        <ScrollArea>
                            {items.map(({ product }) => (
                            <CartItem
                                product={product}
                                key={product.id}
                            />
                            ))}
                        </ScrollArea>
                    </div>
                    
                    <div className='space-y-4 pr-6'>

                    <Separator />

                    <div className='space-y-1.5 text-sm'>


                        <br></br>

                        <div className='flex'>
                            <span className='flex-1'>Total</span>
                            <span>
                                {formatPrice(cartTotal)} 
                            </span>
                        </div>
                        
                    </div>

                    <hr className="border-t-2 border-gray-300"></hr>
                    <div className="text-gray-600 text-sm">IVA incluido.</div>
                            
                    <SheetFooter>
                        <SheetTrigger asChild>
                        <Link
                            href='/cart'
                            className={buttonVariants({
                            // className: 'w-full',
                            })}>
                            Continuar al Carrito
                        </Link>
                        </SheetTrigger>
                    </SheetFooter>
                    </div>
                </>
                ) : (

                    <div className='flex h-full flex-col items-center justify-center space-y-1'>

                    <div aria-hidden='true'className='relative mb-4 h-40 w-40 text-muted-foreground'>
                      <Image src='/cart/empty-cart-slider.png' fill alt='empty shopping cart hippo'/>
                    </div>

                    <div className='text-center text-l font-semibold text-gray-700'>
                      Pikachu esta dormido. <br/>
                      Regresa cuando el Carrito este lleno.
                    </div>

                    <SheetTrigger asChild>

                      <Link
                        href='/products'
                        className={buttonVariants({
                          variant: 'link',
                          size: 'sm',
                          className:
                            'text-sm text-muted-foreground',
                        })}>
                        Añade productos al Carrito
                      </Link>

                    </SheetTrigger>

                  </div>

                )}

            </SheetContent>


        </Sheet>
    )

}

export default Cart
