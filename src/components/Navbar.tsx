import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserNav from './UserNav'
import MobileMenu from './NavbarMobile'

const Navbar = async () => {
    const cookie = cookies()
    const { user } = await getServerUser(cookie)
    
    return (
        <div className='bg-transparent sticky z-50 top-0 inset-x-0 h-20'>
            <header className='relative bg-[#FCFCFC] backdrop-blur-sm bg-opacity-30'>
                <div className='xl:mx-20 lg:mx-14 md:mx-10 sm:mx-4'>
                    <div className='flex h-20 items-center justify-between'>
                        <div className='flex items-center'>
                            <Link href='/'>
                                <img src='/head-icon.png' alt='logo' width={55.5} height={47.6} />
                            </Link>
                            <div className='hidden lg:block ml-8 self-stretch'>
                                <NavItems />
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className='hidden lg:flex items-center space-x-6'>
                            <Link href='/products' className={buttonVariants({variant: 'ghost', size: 'sm'})}>
                                Catalogo
                            </Link>
                            
                            {!user ? (
                                <>
                                    <span className='h-6 w-px bg-gray-300' />
                                    <Link href='/sign-in' className={buttonVariants({variant: 'default', size: 'sm'})}>
                                        Iniciar Sesion
                                    </Link>
                                    <span className='h-6 w-px bg-gray-300' />
                                    <Link href='/sign-up' className={buttonVariants({variant: 'ghost', size: 'sm'})}>
                                        Registrarse
                                    </Link>
                                </>
                            ) : (
                                <UserNav user={user} />
                            )}
                            
                            <span className='h-6 w-px bg-gray-300' />
                            <Cart />
                        </div>

                        {/* Mobile Navigation */}
                        <div className='lg:hidden flex items-center space-x-4'>
                            <Cart />
                            <MobileMenu user={user} />
                        </div>
                    </div>
                </div>
            </header>
            <hr className="border-t-1.8 border-gray-300" />
        </div>
    )
}

export default Navbar
