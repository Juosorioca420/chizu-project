"use client"

import { trpc } from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ForgotValidator, TypeForgotValidator } from '../../../lib/validators/forgot-pswd-validator'


const Page = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<TypeForgotValidator>({
        resolver: zodResolver(ForgotValidator),
    })
    const router = useRouter()

    const { mutate, isLoading } = trpc.auth.reactivateAccount.useMutation({

        // manejar errores
        onError: (err) => {
            if (err.data?.code === 'BAD_REQUEST') {
                toast.warning('Usted ya ha sido verificado.')
                return
            }
            if (err.data?.code === 'UNAUTHORIZED') {
                toast.error('El correo ingresado es invalido.')
                return
            }
            toast.error('Hubo un error en el servidor, porfavor intente de nuevo.')
        },

        onSuccess: ({ sentToEmail }) => {
            router.push('/verify-email?to=' + sentToEmail)
        },

    })

    const onSubmit = ({ email }: TypeForgotValidator) => {
        mutate({ email })
    }

    return (
        <>
            <div className='container relative flex pt-12 flex-col items-center justify-center lg:px-0'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>

                    <div className='flex flex-col items-center space-y-2 text-center'>
                        <img src='/logo.png' width={115} height={45} alt="logo" />

                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Verificación de Cuenta
                        </h1>

                        <Link
                            className={buttonVariants({
                                variant: 'link',
                                className: 'gap-1.5',
                            })}
                            href='/sign-in'>
                            <ArrowLeft className='h-4 w-4' />
                            No necesitas verificarte? Inicia Sesion
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

                                <Button className='mt-1'>Enviar Verificación</Button>

                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Page
