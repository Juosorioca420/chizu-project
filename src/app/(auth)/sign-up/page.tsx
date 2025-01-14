"use client"

import { trpc } from '@/trpc/client'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowLeft, TextSearch, CircleDollarSign, BookOpenCheck } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { SignUpValidator, TypeSignUpValidator } from '@/lib/validators/signup-credentials-validator'
import Image from 'next/image'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


const Page = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm<TypeSignUpValidator>({
    resolver: zodResolver(SignUpValidator),
  })

  const router = useRouter()

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({

    // manejar errores
    onError: (err) => {
      // error con el correo
      if (err.data?.code === 'CONFLICT') {
        toast.warning('Este correo ya se encuentra registrado.')
        return
      }

      // error con el user
      if (err.data?.code === 'BAD_REQUEST') {
        toast.warning('Nombre de usuario ya registrado.')
        return
      }

      // error con la pswd
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message)
        return
      }

      // algun otro error con el servidor
      toast.error('Hubo un error en el servidor, porfavor intente de nuevo.')
    },

    onSuccess: ({ sentToEmail }) => {
      toast.success(`Porfavor verifique su cuenta en ${sentToEmail}.`)
      router.push('/verify-email?to=' + sentToEmail)
    },

  })

  const onSubmit = ({ username, email, password, confirmPassword }: TypeSignUpValidator) => {
    mutate({ username, email, password, confirmPassword })
  }

  return (
    <main className='lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
          fill
          src='/sign-up.webp'
          className='h-full w-full object-cover object-center'
          alt='sign-in'
        />
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-6 py-4 sm:px-6 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-19 lg:py-4 xl:gap-x-24'>
          <div className='lg:col-start-2'>


            <div className='flex flex-col items-center space-y-2 text-center mt-10'>
              <img src='/logo.png' width={115} height={45} alt="logo" />
              <h1 className='text-2xl font-semibold tracking-tight'>
                Registrar Cuenta
              </h1>

              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href='/sign-in'>
                <ArrowLeft className='h-4 w-4' />
                Ya estas registrado?  Inicia Sesion
              </Link>
            </div>

            <div className='grid gap-6'>

              <form onSubmit={handleSubmit(onSubmit)}>

                <div className='grid gap-1'>

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

                  <div className='grid gap-1 py-2'>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                      {...register('username')}
                      className={cn({
                        'focus-visible:ring-red-500':
                          errors.username,
                      })}
                      placeholder='Ingresa tu nombre de usuario'
                    />

                    {errors?.username && (
                      <p className='text-sm text-red-500'>
                        {errors.username.message}
                      </p>
                    )}

                  </div>

                  <div className='grid gap-1 py-2'>

                    <Label htmlFor='password'>Contraseña</Label>
                    <Input
                      {...register('password')}
                      type='password'
                      className={cn({
                        'focus-visible:ring-red-500':
                          errors.password,
                      })}
                      placeholder='Ingresa tu contraseña'

                    />
                    {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
                    {errors?.password && (
                      <p className='text-sm text-red-500'>
                        {errors.password.message}
                      </p>
                    )}

                  </div>


                  <div className='grid gap-1 py-2'>

                    <Label htmlFor='confirmacion'>Confirmacion</Label>
                    <Input
                      {...register('confirmPassword')}
                      type='password'
                      className={cn({
                        'focus-visible:ring-red-500':
                          errors.confirmPassword,
                      })}
                      placeholder='Confirma tu contraseña'

                    />
                    {/* <div className='text-sm text-gray-600'>La contraseña ha de ser de almenos 8 caracteres.</div> */}
                    {errors?.confirmPassword && (
                      <p className='text-sm text-red-500'>
                        {errors.confirmPassword.message}
                      </p>
                    )}

                  </div>

                  <div className='text-right -mb-1'>
                    <Button variant='ghost' className='text-sm text-semibold text-gray-600'>
                      <Link className='text-sm text-semibold text-gray-600 flex items-center gap-1.5' href='/activate-user'>
                        Reactivar Cuenta
                        <BookOpenCheck className='h-3.5 w-3.5' />
                      </Link>
                    </Button>
                  </div>

                  <hr className="border-t-8 border-white"></hr>
                  <hr className="border-t-1 border-gray-400"></hr>

                  <Button className='mt-2'>Registrarse</Button>



                </div>

              </form>
              
              <Button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-blue-50 px-4 py-2 -mt-4"
                  >
                    <svg
                      viewBox="0 0 48 48"
                      className="block h-5 w-5"
                      fill="none"
                    >
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    Continuar con Google
              </Button>
              <div className='text-right -mt-2'>
                  <Dialog>

                    <DialogTrigger asChild>
                      <Button variant="ghost" className='gap-1.5 justify-end text-teal-700'>
                        <TextSearch className='h-4 w-4' />
                        Terminos y Condiciones
                      </Button>
                    </DialogTrigger>


                    <DialogContent className="lg:max-w-[1000px] sm:max-w-[650px] max-h-[80vh] overflow-y-auto">

                      <DialogHeader>
                        <DialogTitle>Clausulas de Uso y Politicas</DialogTitle>
                        <DialogDescription>
                          En Chizu, respetamos su privacidad y nos comprometemos a protegerla mediante el cumplimiento de estas políticas.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-1.5 py-1.5 text-sm">

                        <div>
                          <strong>Política de Uso y Privacidad de Datos.</strong>
                        </div>

                        <div>
                          En Chizu, respetamos su privacidad y nos comprometemos a protegerla mediante el cumplimiento de esta política.
                          En Chizu seremos responsables del tratamiento de sus datos. En tal virtud, será posible recolectar, almacenar y usar dichos datos bajo los principios rectores estipulados en el Artículo 4°. Principios para el Tratamiento de datos personales de la Ley 1581 de 2012. Usamos la información que recopilamos para soportar, proporcionar y mejorar nuestro servicio; que incluye y no se limita a: Presentar nuestro sitio web y su contenido. Proporcionar productos e información solicitada incluyendo facturación y cobro. Enviar correos de verificación y confirmación. No compartimos su información personal con terceros, excepto en los casos en que sea necesario para cumplir con la ley y proteger nuestros derechos o propiedad. Podemos recopilar varios tipos de información acerca de los usuarios de nuestro servicio, incluyendo y no limitándose a: correo, contraseña, nombre de usuario, órdenes de compras y fechas de creación y modificación de cuenta. Todas sus contraseñas registradas están encriptadas y no se almacenan en texto plano. Como usuario registrado y titular de su información, puede revisar y cambiar sus datos personales iniciando sesión y visitando su cuenta. Sus derechos como titular de la información  son los previstos en el Artículo 8°. Derechos de los Titulares de la Ley 1581 de 2012, especialmente:
                          Acceder en forma gratuita a sus datos personales que hayan sido objeto de Tratamiento;
                          Conocer, actualizar y rectificar sus datos personales frente a los Responsables del Tratamiento o Encargados del Tratamiento. Este derecho se podrá ejercer, entre otros frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente prohibido o no haya sido autorizado;
                          Revocar la autorización y/o solicitar la supresión del dato cuando en el Tratamiento no se respeten los principios, derechos y garantías constitucionales y legales. La revocatoria y/o supresión procederá cuando la Superintendencia de Industria y Comercio haya determinado que en el Tratamiento el Responsable o Encargado han incurrido en conductas contrarias a esta ley y a la Constitución.
                        </div>

                        <div>
                          <strong>Política de procesamiento de Pagos.</strong>
                        </div>
                        <div>
                          Su seguridad y privacidad financiera es lo más importante para nosotros.
                          Todos los precios publicados en Chizu son en Pesos Colombianos [COP]. Aceptamos como medio de pago tarjetas de crédito/débito. Todos los pagos se procesan a través de un proveedor de servicios de pago seguro (Stripe) bajo la normativa PCI DSS a la fecha, para garantizar la seguridad de sus datos financieros.
                          Los pagos deben realizarse en su totalidad al momento de la compra. Una vez que se ha realizado el pago, comenzaremos a procesar su pedido. Por favor, tenga en cuenta que todos los precios están en Pesos Colombianos [COP] y que cualquier tasa por conversión de moneda o compras internacionales es responsabilidad de su banco.
                        </div>

                        <div>
                          <strong>
                            Cláusulas de uso.</strong>
                        </div>
                        <div>
                          El usuario debe cumplir con todas las políticas, leyes y regulaciones aplicables al uso de Chizu. En caso que el usuario decida publicar un juego o campaña en Chizu, el usuario debe publicar exclusivamente contenidos de carácter legal y ético. Esto implica, y no se limita, a cumplir con leyes de protección de datos, propiedad intelectual y derechos de autor, no compartir contenido ilegal, ofensivo o cualquier otra normativa relevante. El usuario es responsable del contenido que publique a través de Chizu.
                          El usuario debe respetar la privacidad de otros usuarios y no debe intentar infringir o aprovecharse de las medidas de seguridad implementadas por la plataforma. Es responsabilidad del usuario mantener seguras las credenciales de su cuenta, las cuales son únicas e intransferibles. Esto incluye no compartir dichas credenciales con terceros y tomar medidas para evitar accesos no autorizados a su cuenta.
                          El usuario debe utilizar los recursos dispuestos por la plataforma de forma razonable y pertinente, evitando acciones que puedan sobrecargar los sistemas y recursos puestos a disposición, tales que se vulnere la integridad de los servicios ofrecidos por Chizu, afectando negativamente la experiencia de otros usuarios. Chizu se reserva el derecho de suspender o cancelar la cuenta a discreción de cualquier usuario que infringe las cláusulas de uso.
                          Se ofrecerá un descuento del 25% en la Licencia de publicación de juegos en Chizu. Si los desarrolladores de videojuegos independientes logran recaudar $30 USD, se les devolverá el cobro inicial de $10 USD. Estos descuentos tienen una duración específica y pueden estar sujetos a cambios en cualquier momento a discreción de Chizu.
                          El usuario debe leer y aceptar los términos y condiciones de uso acá expuestos. Debe cumplir con las políticas establecidas por la plataforma y abstenerse de realizar acciones que vulneren dichas políticas. Se le notificará por correo cualquier cambio que hagamos en nuestras políticas y se verá reflejado en esta misma página.
                          Podrá ejercer todos sus derechos y consultas a través de los canales dispuestos por Chizu, como responsables del tratamiento de datos, para la atención al público, en particular el correo support.chizu@gmail.com; disponibles de lunes a viernes de 8:00 a.m. a 6:00 p.m., para la atención de requerimientos relacionados con el tratamiento de mis datos personales y otras inquietudes.
                        </div>
                        <div>
                          Considerando todo lo anterior descrito, autorizo a Chizu para que trate mi información personal de acuerdo con la Política de Tratamiento de Datos Personales acá dispuesta. Manifiesto que la presente autorización me fue solicitada y descrita explícitamente antes de otorgar permiso para el uso de mis datos y que la concedo de forma libre y voluntaria una vez leída en su totalidad.
                        </div>

                      </div>

                      <hr className="border-t-1 border-gray-400"></hr>

                      <DialogFooter>
                        <div className='text-sm text-semibold text-gray-700'>
                          Al registrar una nueva cuenta, usted acepta nuestros terminos y condiciones.
                        </div>
                      </DialogFooter>

                    </DialogContent>

                  </Dialog>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  )
}

export default Page
