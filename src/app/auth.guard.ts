import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from './auth.service';

/**
 * authGuard: A service that implements CanActivate to decide if a route can be activated.
 * It is provided at the root level and can be used in route configuration to guard routes.
 */
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  /**
   * Injects authService and Router into the guard.
   * @param authService: The authentication service to check user claims.
   * @param router: Angular Router to navigate to different routes.
   */
  constructor(private authService: authService, private router: Router) {}

  /**
   * Determines if a route can be activated.
   * @param route: Contains the information about a route associated with a component loaded in an outlet.
   * @param state: Represents the state of the router at a moment in time.
   * @returns true if the user has 'admin' claim, else navigates to the login page and returns false.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Checks if the user has the 'admin' claim using authService.
    if (this.authService.hasClaim('admin')) {
      return true;  // Grants access to the route.
    }

    // If the user doesn't have the required claim, navigates to the login page.
    this.router.navigate(['/auth/login']);
    return false;  // Denies access to the route.
  }
}
