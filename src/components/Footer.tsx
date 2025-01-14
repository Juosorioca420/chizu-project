"use client"
import { usePathname } from 'next/navigation'

import { CircleDollarSign, HeartHandshake, Compass, TextSearch, Instagram, Twitter, Github } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import SupportButton from "@/components/support/SupportForm"
import { getServerUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'

const Footer = () => {
    const pathname = usePathname()
    const pathsToMinimize = [
        '/verify-email',
        '/sign-up',
        '/sign-in',
        '/pswd-forgot',
        '/pswd-reset',
        '/thank-you',
    ]

    return (
        <footer className='bg-[#FCFCFC] flex-grow-0'>
            <div className="lg:mx-24 md:mx-20 sm:mx-4">
                <div className='border-t border-gray-200'>

                    {pathsToMinimize.includes(pathname) ? null : (
                        <div className='pb-8 pt-8'>
                            <div className='flex justify-center'>
                                <img src='/logo.png' width={115} height={45} alt="logo" />
                            </div>
                        </div>
                    )}

                </div>

                <div className='py-5 md:flex md:items-center md:justify-between'>

                    <div className='text-center md:text-left'>
                        {pathsToMinimize.includes(pathname) ? null : (
                            <div className='flex space-x-8'>
                                <Dialog>

                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className='gap-1.5 justify-end text-gray-700'>
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
                                <Button
                                    variant="ghost"
                                    className="gap-1.5 justify-end text-gray-600"
                                    onClick={() => (window.location.href = "/landing")}
                                >
                                <Compass className="h-5 w-5 text-gray-700" />
                                    <div className='text-gray-700'>
                                        Descubre más sobre Chizu
                                    </div>
                                </Button>
                                {/* Iconos de redes sociales */}
                            <div className="flex justify-center md:justify-end items-center">
                                <Button
                                    variant="ghost"
                                    className="text-gray-600"
                                    onClick={() => window.open('https://instagram.com/chizu_games', '_blank')}
                                >
                                <Instagram className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-gray-600"
                                    onClick={() => window.open('https://twitter.com/ChizuGames', '_blank')}
                                >
                                <Twitter className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-gray-600"
                                    onClick={() => window.open('https://github.com/Juosorioca420/chizu-project', '_blank')}
                                >
                                <Github className="h-5 w-5" />
                                </Button>
                            </div>
                            </div>
                        )}
                                                            
                        
                        <SupportButton/>      
                                        
                        
                                    
                    </div>
                    
                    <div className='mt-0 flex items-center justify-center md:mt-0'>
                        <p className='text-sm text-gray-600'>
                            &copy; {new Date().getFullYear()} All Rights Reserved
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
