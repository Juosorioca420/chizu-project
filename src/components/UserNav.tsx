"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
// import { Button } from "./ui/button"
import { User } from "../payload-types"
import Link from "next/link"
import { useAuth } from '@/hooks/useAuth'
import ConfirmationModal from "./ConfirmationModal"
// Importamos el hook con la lógica
import { useDeleteAccount } from "./DeleteAccount"

const UserNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth()

  // Obtenemos toda la lógica desde nuestro custom hook
  const {
    isSuccess,
    showModal,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancel,
  } = useDeleteAccount(user)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
        <button  className={`px-4 py-2 font-medium text-left hover:bg-accent rounded-md sm:text-md md:text-sm hover:text-accent-foreground`}>
            Cuenta
            </button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className='bg-white w-60' align='start'>

            <div className='flex items-left justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-0.5 leading-none'>
              <p className='font-medium text-sm text-black'>
                {user.username}
              </p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href='/panel'>
              {user.role === 'admin'
                ? (<b className='text-blue-800'>Panel de Administrador</b>)
                : ('Perfil')
              }
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem  
            onClick={handleDeleteClick} 
            disabled={isSuccess}
          >
            Eliminar cuenta
          </DropdownMenuItem>

          <DropdownMenuItem 
            className='cursor-pointer'
            onClick={signOut}
          >
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal de confirmación */}
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </>
  )
}

export default UserNav
