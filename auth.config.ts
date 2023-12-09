import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({auth, request}) {
      const isLoggedIn = !!auth?.user;
      const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

      if (isDashboardPage) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
