import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor() {}
  hasClaim(claim: string) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(localStorage.getItem('ACCESS_TOKEN')!) as any;
      return decodedToken.role === claim;
    } catch (error) {
      console.error('Fehler beim Decodieren des Tokens', error);
      return false;
    }
  }
}
