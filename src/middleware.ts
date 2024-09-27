// import type { NextRequest } from 'next/server';
// import createMiddleware from 'next-intl/middleware';

import { NextResponse } from 'next/server';

// import { AppConfig } from './utils/AppConfig';

// const intlMiddleware = createMiddleware({
//   locales: AppConfig.locales,
//   localePrefix: AppConfig.localePrefix,
//   defaultLocale: AppConfig.defaultLocale,
// });

// export default function middleware(
//   request: NextRequest,
// ) {
//   return intlMiddleware(request);
// }

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'], // Also exclude tunnelRoute used in Sentry from the matcher
// };
export default async function middleware() {
  return NextResponse.next();
}
