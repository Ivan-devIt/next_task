// import { PrismaClient } from '@prisma/client';

// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// export default client;

// client.ts

// import { PrismaClient } from '@prisma/client';
// import { User, Post } from './';

// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// export default client;

// // You can also export the types if needed
// export type { User, Post };

import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default client;

// You can also export the types if needed
export type { User, Post } from '@prisma/client';
