import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const token = (await cookies()).get('access_token')?.value
    
    if (token) {
        if (path == '/') {
            return NextResponse.redirect(new URL('/app/consultas', req.nextUrl))
        }
    }
    else if (path != '/'){
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
 
    return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}