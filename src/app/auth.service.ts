import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor() {}

  hasClaim(claim: string): boolean {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token) as any; // Nehmen Sie die korrekte Typisierung vor
      // Überprüfen Sie, ob die Eigenschaft 'roles' ein Array ist und die Rolle enthält
      return decodedToken.roles && Array.isArray(decodedToken.roles) && decodedToken.roles.includes(claim);
    } catch (error) {
      console.error('Fehler beim Decodieren des Tokens', error);
      return false;
    }
  }
}

