'use client'

import { PRODUCT_CATEGORIES } from "@/config"
import { useState, useRef, useEffect } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/closeOnClick"

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)
    const isAnyOpen = activeIndex !== null

    // Si se pica fuera del despliegue, cerrarlo
    const navRef = useRef< HTMLDivElement | null >(null)
    useOnClickOutside( navRef, () => setActiveIndex(null) )

    // Si se presiona Esc, cerrar el despliegue
    useEffect( () => {
        const handler = (ev : KeyboardEvent) => {
            if( ev.key === 'Escape'){ setActiveIndex(null) }
        }
        document.addEventListener('keydown', handler) // registrar cuando se presionan teclas

        return () => {
            document.removeEventListener('keydown', handler) // limpiar cache de ultimo Esc presionado
        }
    }, [])

    return (
        <div className="flex flex-col md:flex-row gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => {
                    const handleOpen = () => {
                    if (activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                    }

                    const close = () => setActiveIndex(null)

                    const isOpen = i === activeIndex

                    return (
                    <NavItem
                        category={category}
                        close={close}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        key={category.value}
                        isAnyOpen={isAnyOpen}
                    />
                    )
                })}
        
        </div>

    )

}

export default NavItems
