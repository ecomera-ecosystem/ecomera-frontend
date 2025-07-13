import { Component } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormControlName,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,

    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group(
      {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        role: ['USER'], // default,
      },
      { validators: this.passwordMatchValidator }
    );
  }

  submit() {
    if (
      this.registerForm.valid && 
      this.registerForm.value.password === this.registerForm.value.confirmPassword
    ) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        },
        complete: () => {
          console.log('Registration completed successfully');
        }
      });
    }
  }
  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get role() {
    return this.registerForm.get('role');
  }

  get isFormValid() {
    return this.registerForm.valid;
  }
}
