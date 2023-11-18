import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { RegisterDto, UserControllerService } from "../../../openapi-client";

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
})
export class LoginComponent {
  // FormGroup to manage the login form data and validation.
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // FormControl for the email input with required and email format validation.
    password: new FormControl('', [Validators.required, Validators.minLength(8)]) // FormControl for the password input with required and minimum length (8) validation.
  });

  /**
   * Constructor to inject the UserService and Router.
   * @param userService Service for handling user-related operations such as authentication.
   * @param router Angular Router for navigation between routes.
   */
  constructor(private userService: UserControllerService, private router: Router) {}

  /**
   * Handles the submission of the login form.
   * If the form is valid, it attempts to log the user in.
   * On successful login, navigates to the home page and stores the user token.
   * On failure, displays an error message.
   */
  logForm() {
    console.log(this.formGroup.value); // Logs the form values for debugging purposes.

    if(this.formGroup.valid) {
      // Calls the login method with form values and handles the response.
      this.userService.login(this.formGroup.value as RegisterDto).subscribe({
        next: (token) => {
          // Stores the received access token in localStorage and navigates to the home page.
          localStorage.setItem('ACCESS_TOKEN', token.token as string);
          alert('Erfolgreich eingeloggt');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // Logs the error and displays an error message to the user.
          console.error('Anmeldefehler:', err);
          alert('Anmeldefehler. Bitte versuchen Sie es später erneut.');
        }
      });
    } else {
      // Alerts the user if the form is invalid.
      alert('Bitte füllen Sie alle erforderlichen Felder korrekt aus.');
    }
  }
}
