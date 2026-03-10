import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { STRAPI_BASE_URL } from "./lib/strapi";

const protectedRoutes = ['/dashboard']

function checkIsProtectedRoute(path: string) {
  return protectedRoutes.includes(path)
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  const isProtectedRoute = checkIsProtectedRoute(currentPath)

  if (!isProtectedRoute) return NextResponse.next()

  // Si es protegida, verificar si el usuario esta autenticado
  try {
    // 1. Validar si usuario tiene el token jwt
    // 2. Si el usuario existe en la base de datos 
    // 3. Si el usuario esta activo\

    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    if (!jwt) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })

    const userResponse = await response.json()
    console.log('userResponse: ', userResponse)

    if (!userResponse) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()

  } catch(error) {
    console.error('Error verifying user authentication', error)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}


export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    // Ejecutar en todas las rutas excepto api, archivos estáticos, imágenes y favicon
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}