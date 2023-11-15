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
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private userService: UserControllerService, private router: Router) {}

  logForm() {
    console.log(this.formGroup.value);

    if(this.formGroup.valid) {
      this.userService.login(this.formGroup.value as RegisterDto).subscribe({
        next: (token) => {
          localStorage.setItem('ACCESS_TOKEN', token.token as string);
          alert('Erfolgreich eingeloggt');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Anmeldefehler:', err);
          alert('Anmeldefehler. Bitte versuchen Sie es später erneut.');
        }
      });
    } else {
      alert('Bitte füllen Sie alle erforderlichen Felder korrekt aus.');
    }
  }
}
