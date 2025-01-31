/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    category: Category;
    products: Product;
    media: Media;
    product_files: ProductFile;
    orders: Order;
    campaigns: Campaign;
    categorycampaign: Categorycampaign;
    subscriptions: Subscription;
    tiers: Tier;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  role: 'admin' | 'user';
  username: string;
  ordenes?: number | null;
  ordenes_hist?: (string | Order)[] | null;
  lastLogin?: string | null;
  subscriptions?: (string | Subscription)[] | null;
  campaignCreated?: (string | null) | Campaign;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  total: number;
  _isPaid: boolean;
  user: string | User;
  products: (string | Product)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string;
  user?: (string | null) | User;
  name: string;
  description?: string | null;
  price: number;
  qty: number;
  category: (string | Category)[];
  compras?: number | null;
  product_files: string | ProductFile;
  requirements_min: {
    os: string;
    cpu: string;
    ram: number;
    gpu: string;
    directX?: number | null;
    storage: number;
  };
  requirements_recomended: {
    os: string;
    cpu: string;
    ram: number;
    gpu: string;
    directX?: number | null;
    storage: number;
  };
  approvedForSale?: ('pending' | 'approved' | 'denied') | null;
  priceId?: string | null;
  stripeId?: string | null;
  images: {
    image: string | Media;
    id?: string | null;
  }[];
  image_logo: string | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "category".
 */
export interface Category {
  id: string;
  name: string;
  description?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product_files".
 */
export interface ProductFile {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */

export interface Comentario {
  id: string;
  comentario?: string | null;
  rating: '1' | '2' | '3' | '4' | '5';
  user?: (string | null) | User;
  product?: (string | null) | Product;
  updatedAt: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  user: string | User;
  category: string | Categorycampaign;
  bannerImage: string | Media;
  startDate?: string | null;
  status: 'suspendida' | 'activa' | 'finalizada';
  tiers?: (string | Tier)[] | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categorycampaign".
 */
export interface Categorycampaign {
  id: string;
  name: string;
  description?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tiers".
 */
export interface Tier {
  id: string;
  title: string;
  price: number;
  description: string;
  campaign: string | Campaign;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscriptions".
 */
export interface Subscription {
  id: string;
  user: string | User;
  tier: string | Tier;
  startDate: string;
  status: 'activa' | 'cancelada' | 'expirada';
  updatedAt: string;
  createdAt: string;
}


export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
