'use client'

import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import NavItems from './NavItems'
import UserNav from './UserNav'
import { User } from "../payload-types"

interface MobileMenuProps {
    user: User | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="lg:hidden">
            <button
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="h-6 w-6" />
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 bg-white pb-6 shadow-lg text-left">
                    <div className='flex flex-col space-y-4 px-4 pt-4'>
                        <NavItems />
                        {/* <Link href='/products' className={`${buttonVariants({ variant: 'ghost', size: 'sm' })} text-left items-left justify-left`}> */}
                        <Link href='/products' className={`pl-3 items-left font-medium`}>
                            Catalogo
                        </Link>
                        {!user ? (
                            <>
                                <Link href='/sign-in' className={`pl-3 items-left font-medium`}>
                                    Iniciar Sesion
                                </Link>
                                <Link href='/sign-up' className={`pl-3 items-left font-medium`}>
                                    Registrarse
                                </Link>
                            </>
                        ) : (
                            <UserNav user={user} />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MobileMenu
