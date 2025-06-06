import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    // Si es la ruta de login o registro
    if (route.data['requiresAuth'] === false) {
      if (isLoggedIn) {
        // Si ya está logueado, redirigir a home
        this.router.navigate(['/home']);
        return false;
      }
      // Si no está logueado, permitir acceso al login/registro
      return true;
    }

    // Para todas las demás rutas, solo requiere estar logueado
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
