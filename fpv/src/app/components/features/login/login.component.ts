import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../../services/clients/client.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { BalanceService } from '../../../services/balance/balance.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private balanceService: BalanceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      this.clientService.getClientByUsername(username).subscribe({
        next: (client) => {
          this.balanceService.updateClient(client);
          this.router.navigate(['/funds']);
        },
        error: (error) => {
          if (error.status === 404) {
            Swal.fire({
              icon: 'error',
              title: 'Usuario no encontrado',
              text: 'El nombre de usuario que ingresaste no existe.',
              confirmButtonColor: '#d33',
            });
          }
        },
      });
    }
  }
}
