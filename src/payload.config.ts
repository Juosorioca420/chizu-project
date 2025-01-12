import path from 'path'
import dotenv from 'dotenv'

import { buildConfig } from 'payload/config'
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { Users } from './collections/Users'
import { Products } from './collections/Products/Products'
import { Category } from './collections/Products/Category'
import { Media } from './collections/Media'
import { ProductFiles } from './collections/Products/ProductFile'
import { Orders } from './collections/Orders'
import React from 'react'
import { Comentarios } from './collections/Products/Comentarios'
import  ProfilePicture from './components/pfp'

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  })
  
export default buildConfig({

    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [ Users, Category, Products, Media, ProductFiles, Orders, Comentarios ], 
    routes: {
        admin: '/panel',
    },

    admin: {
        user: 'users', // Users slug
        avatar: ProfilePicture,
        bundler: webpackBundler(),
        css: path.resolve(__dirname, '../style.css'),
        meta: {
        titleSuffix: '- Chizu',
        favicon: '/favicon.ico',
        // ogImage: '/thumbnail.jpg',
        },

        components : {
            graphics : { 
                Logo: () => React.createElement('img', { src: '/logo.png', alt: 'Logo', style: { width: '177.6px', height: '152.4px' } }),
                Icon: () => React.createElement('img', { src: '/logo.png', alt: 'icon', style: { width: '26.1px', height: '22.4px' } }),
            },
        },
    },

    rateLimit: {
        max: 2000, // default = 500
    },

    editor: slateEditor({}),
    db: postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
      }),

    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },

})
