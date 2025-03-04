import { Product, User } from "../../payload-types"
import { BeforeChangeHook } from "payload/dist/globals/config/types"
import { Access, CollectionConfig } from "payload/types"
import { stripe } from '../../lib/stripe'

const adminAndUser = (): Access => async ({ req }) => {
  const user = req.user as User | undefined

  if (!user){ return false }
  if (user.role === 'admin'){ return true }

  return {
    user: { equals: req.user.id, },
  }
}

const onlyUser: Access = ({ req: { user } }) => {
  return {
    id: { equals: user.id, },
  }
}

export const Products: CollectionConfig = {
    slug: 'products',
    labels: { singular: 'Juego', plural: 'Juegos' },

    admin: {
        useAsTitle: 'name',
        // hidden: ({ user }) => user.role !== 'admin',
        description: 'Lista de todos los Juegos subidos.',
        hideAPIURL: true,
    },

    access: {
        read: async ({req}) => {
          const refer = req.headers.referer
    
          if ( !req.user || !refer?.includes('panel') ){ return true }
          return await adminAndUser()({req})
        },
        update: adminAndUser(),
        delete: ({ req }) => req.user.role === 'admin',
    },

    hooks: {

        beforeChange: [
            // addUser,

            async (args) => {

                if (args.operation === 'create') {
                    const data = args.data as Product

                    const createdProduct =
                        await stripe.products.create({
                            name: data.name,
                            default_price_data: {
                                currency: 'COP',
                                unit_amount: Math.round(data.price * 100),
                            },
                        })

                    const created: Product = {
                        ...data,
                        user: args.req.user.id,
                        stripeId: createdProduct.id,
                        priceId: createdProduct.default_price as string,
                    }

                    return created
                }

                else if (args.operation === 'update') {
                    const data = args.data as Product

                    const updatedProduct =
                        await stripe.products.update( data.stripeId!, {
                            name: data.name,
                            default_price: data.priceId!,
                        })

                    const updated: Product = {
                        ...data,
                        stripeId: updatedProduct.id,
                        priceId: updatedProduct.default_price as string,
                    }

                    return updated
                }

            },

        ],

    },

    fields: [
        {
            name: 'user',
            type: 'relationship',
            required: true,
            relationTo: 'users',
            hasMany: false,
            access : {
                update: () => false,
                // read: ({req}) => req.user.role === 'admin',
                create: () => false,
            },
            admin: { 
                condition: ({ id }) => !!id, // Mostrar el campo solo si el producto ya existe (tiene ID).
                readOnly: true, // Hacer el campo de solo lectura en el panel de administración.
              },
        },

        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            required: true,
        },

        {
            name: 'description',
            label: 'Descripcion',
            type: 'textarea',
        },

        {
            name: 'price',
            label: 'Valor',
            type: 'number',
            required: true,
            validate: (value) => {
                if (value < 0) {
                    return 'El valor no puede ser negativo.'
                }
                if (!Number.isInteger(value)) {
                    return 'El valor debe ser un número entero.'
                }
                return true
            },
        },

        {
            name: 'qty',
            label: 'Cantidad',
            type: 'number',
            defaultValue:1,
            required: true,
            validate: (value) => {
                if (value < 0) {
                    return 'La cantidad no puede ser negativa.'
                }
                if (!Number.isInteger(value)) {
                    return 'El valor debe ser un número entero.'
                }
                return true
            },
            access: {
                read: () => false,
                update: () => false,
                create: () => true,
            },
            admin : {
                hidden : true, 
            },
        },

        {
            name: 'category',
            label: 'Categorias',
            type: 'relationship',
            relationTo: 'category',
            hasMany: true,
            required: true,
        },

        {
            name: 'product_files',
            label: 'Archivo',
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: false,
            required: true,
        },

        {
            name: 'requirements_min',
            label: 'Requerimientos Minimos de Sistema',
            type: 'group',
            fields: [
                {
                    name: 'os',
                    label: 'Sistema Operativo - Incluya Windows, Linux o Mac OS',
                    type: 'text',
                    required: true,
                    defaultValue: 'Windows 7',
                },
                {
                    name: 'cpu',
                    label: 'CPU',
                    type: 'text',
                    required: true,
                    defaultValue: 'Ryzen 3',
                },
                {
                    name: 'ram',
                    label: 'RAM [GB]',
                    type: 'number',
                    required: true,
                    defaultValue: 4,
                },
                {
                    name: 'gpu',
                    label: 'GPU',
                    type: 'text',
                    required: true,
                    defaultValue: 'NVIDIA GTX 1050 Ti',
                },
                {
                    name: 'directX',
                    label: 'directX',
                    type: 'number',
                    required: false,
                    defaultValue: '11',
                },
                {
                    name: 'storage',
                    label: 'Almacenamiento [GB]',
                    type: 'number',
                    required: true,
                    defaultValue: 5,
                },
            ],
        },

        {
            name: 'requirements_recomended',
            label: 'Requerimientos Recomendados de Sistema',
            type: 'group',
            fields: [
                {
                    name: 'os',
                    label: 'Sistema Operativo',
                    type: 'text',
                    required: true,
                    defaultValue: 'Windows 10',
                },
                {
                    name: 'cpu',
                    label: 'CPU',
                    type: 'text',
                    required: true,
                    defaultValue: 'Ryzen 5',
                },
                {
                    name: 'ram',
                    label: 'RAM [GB]',
                    type: 'number',
                    required: true,
                    defaultValue: 8,
                },
                {
                    name: 'gpu',
                    label: 'GPU',
                    type: 'text',
                    required: true,
                    defaultValue: 'AMD RX 5600 XT',
                },
                {
                    name: 'directX',
                    label: 'directX',
                    type: 'number',
                    required: false,
                    defaultValue: '12',
                },
                {
                    name: 'storage',
                    label: 'Almacenamiento [GB]',
                    type: 'number',
                    required: true,
                    defaultValue: 5,
                },
            ],
        },

        {
            name: 'approvedForSale',
            label: 'Estado',
            type: 'select',
            defaultValue: 'approved',
            options: [
                { value: 'pending', label: 'En Revision' },
                { value: 'approved', label: 'Aprovado' },
                { value: 'denied', label: 'Rechazado' }],

            access: {
                create: ({ req }) => req.user.role === 'admin',
                read: ({ req }) => req.user.role === 'admin',
                update: ({ req }) => req.user.role === 'admin',
            },
        },

        {
            name: 'priceId',
            type: 'text',
            admin: { hidden: true, },

            access: {
                create: () => false,
                read: () => true,
                update: () => false,
            },
        },

        {
            name: 'stripeId',
            type: 'text',
            admin: { hidden: true, },

            access: {
                create: () => false,
                read: () => true,
                update: () => false,
            },
        },

        {
            name: 'images',
            label: 'Imagenes del Producto',
            type: 'array',
            minRows: 1,
            maxRows: 5,
            required: true,
            labels: {
                singular: 'Imagen', plural: 'Imagenes',
            },
            fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true, }
            ],
        },
        {
            name: 'image_logo',
            label: 'Logo del Producto',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },

        {
            name : 'compras',
            label: 'Compras',
            type : 'number',
            defaultValue : 0,
            required : false,
            access : {
              create: () => false,
              update: () => true,
            //   read: ({req}) => req.user.role === 'admin',
            },
            admin : {
              readOnly : true,
              description : 'Total de Compras realizadas a este Producto.',
            },
            validate: (value) => {
                if (value < 0) {
                    return 'El valor no puede ser negativo.'
                }
                return true
            },
        },
    ]
}
