// 'use client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/utils/lib/prisma';
import { compare } from 'bcrypt';
import { E_Routes } from '@/types/routes.enum';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: E_Routes.signIn
  },
  secret: String(process.env.NEXTAUTH_SECRET),

  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          if (!email || !password) {
            throw new Error('Invalid credentials');
          }

          const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() }
          });

          if (!existingUser) {
            throw new Error(
              `Not find user with this email. Please enter correct email!`
            );
          }

          const passwordMatch = await compare(password, existingUser.password);

          if (!passwordMatch) {
            throw new Error(`Wrong password. Please enter correct password!`);
          }

          const user = {
            id: String(existingUser.id),
            name: String(existingUser.name),
            email: String(existingUser.email),
            role: String(existingUser.role)
          };

          return user;
        } catch (err: any) {
          throw new Error(err?.message);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          role: user.role
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role
        }
      };
    }
  }
};
