"use client"

import {trpc} from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowLeft, MailPlus, Minus } from "lucide-react"
import Link from "next/link"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ZodEffects, ZodError, z} from 'zod'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import Image from "next/image"
import { use, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import {toast} from 'sonner'
import { getPayloadClient } from '../../../getPayload'
import { ForgotValidator, TypeForgotValidator } from '../../../lib/validators/forgot-pswd-validator'


interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = ( {searchParams} : PageProps ) => {
    const to_email = searchParams.to

    const { register, handleSubmit, formState: {errors}, } = useForm<TypeForgotValidator>({
        resolver: zodResolver(ForgotValidator),
    })

    const  [success, setSuccess] = useState(false)
    const router = useRouter()

    const {mutate, isLoading} = trpc.auth.sendPasswordToken.useMutation({
      
      // manejar errores
      onError: (err) => {
        // error con el correo
        if (err.data?.code === 'NOT_FOUND') {
          toast.warning( 'Este correo no tiene una Cuenta asociada' )
          return
        }
        // error con el formato
        if (err instanceof ZodError) {
          toast.error('Correo invalido.')
          return
        }
        // algun otro error con el servidor INTERNAL_SERVER_ERROR
        toast.error( 'Hubo un error en el servidor, porfavor intente de nuevo.' )
      },

      onSuccess: ({ sentToEmail }) => {
        setSuccess(true)
        // router.push('/pswd-forgot?to=' + sentToEmail)
        toast.success( `Recupere su contraseña en ${sentToEmail}` )
      },

    })

    const onSubmit = ({ email }: TypeForgotValidator) => {
        mutate({email})
    }


    return (
          <>

              { !success  ? (
                <main className='lg:min-h-full'>
                <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
                  <Image
                      fill
                      src='/forgot.webp'
                      className='h-full w-full object-cover object-center'
                      alt='forgot'
                  />
                </div>
          
                <div>
                  <div className='mx-auto max-w-2xl px-6 py-4 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-19 lg:py-4 xl:gap-x-24'>
                <div className='lg:col-start-2'>
                
                <div className='flex flex-col items-center space-y-2 text-center mt-10'>
                  <img src='/logo.png' width={115} height={45} alt="logo"/>

                  <h1 className='text-2xl font-semibold tracking-tight'>
                    Recuperacion de Contraseña
                  </h1>

                  <Link
                    className={buttonVariants({
                      variant: 'link',
                      className: 'gap-1.5',
                    })}
                    href='/sign-in'>
                    <ArrowLeft className='h-4 w-4' />
                    Recordaste la contraseña? Inicia Sesion
                  </Link>
                </div>
      
                <div className='grid gap-6'>

                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='grid gap-2'>

                      <div className='grid gap-1 py-2'>
                        <Label htmlFor='email'>E-mail</Label>
                        <Input
                          {...register('email')}
                          className={cn({
                            'focus-visible:ring-red-500':
                              errors.email,
                          })}
                          placeholder='nombre@example.com'
                        />

                        {errors?.email && (
                          <p className='text-sm text-red-500'>
                            {errors.email.message}
                          </p>
                        )}

                      </div>

                        
                      <hr className="border-t-5 border-white"></hr>
                      <hr className="border-t-1 border-gray-400"></hr>

                      <Button>Recuperar</Button>

                    </div>
                  </form>

                </div>
            
                </div>
                </div>
              </div>

            </main>

              ) : (

                <>
                <div className='container relative flex pt-16 flex-col items-center justify-center lg:px-0'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                  
                  <div className='flex h-full flex-col items-center justify-center space-y-1'>

                  <div className='relative mb-3 h-30 w-30 text-muted-foreground'>
                    < Image 
                        src='/verify/forget.webp' alt='verificar-correo-img' 
                        height={320} width={160}
                    />
                  </div>

                  <MailPlus className='h-8 w-8 text-green-700'/>

                  <h3 className='font-semibold text-2xl text-gray-900'>
                  Recuperacion de Contraseña
                  </h3>


                    <p className='text-gray-800 text-center text-semibold'>
                      Hemos enviado un enlace de recuperacion de contraseña por correo.
                    </p>

                    <Minus className='h-4 w-8 text-blue-700'/>

                    <p className='text-gray-600 text-center text-sm'>
                      Lo siento Mario, tu contraseña esta en otro castillo.
                    </p>


                  </div>
                </div>
                </div>

                </>


              )}

          </>
    )

}

export default Page
