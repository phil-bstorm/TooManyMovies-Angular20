import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { strongPasswordValidator } from '@core/validators';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, strongPasswordValidator()]);

  loginForm = this._fb.group({
    email: this.email,
    password: this.password,
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value.email!, this.loginForm.value.password!);

      this._router.navigate(['/']);
    }
  }
}
