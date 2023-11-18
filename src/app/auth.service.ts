import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

/**
 * authService: A service provided at the root level to handle authentication-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor() {}

  /**
   * Checks if the current user has a specific claim (like a role) based on the token stored in localStorage.
   * @param claim: The claim (e.g., role) to check for in the token.
   * @returns true if the token exists and contains the specified claim; false otherwise.
   */
  hasClaim(claim: string): boolean {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem("ACCESS_TOKEN");
    // If no token is found, return false indicating no claim
    if (!token) return false;

    try {
      // Decode the JWT token to read its payload
      const decodedToken = jwtDecode(token) as any; // Replace 'any' with a more specific type for the token structure

      // Check if the token's payload has the 'roles' array and if it includes the specified claim
      return decodedToken.roles && Array.isArray(decodedToken.roles) && decodedToken.roles.includes(claim);
    } catch (error) {
      // Log an error if the token cannot be decoded
      console.error('Fehler beim Decodieren des Tokens', error);
      return false;
    }
  }
}
