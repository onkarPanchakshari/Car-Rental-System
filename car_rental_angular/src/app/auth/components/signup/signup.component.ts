import { Component } from '@angular/core';


import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { NgZorroImportsModule } from '../../../NgZorroImportsModule';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-signup',
  imports: [NgZorroImportsModule ,RouterLink , FormsModule , ReactiveFormsModule,CommonModule], 
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    isSpinning: boolean = false;
    signupForm!: FormGroup;


    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private message: NzMessageService,
                private router: Router
    ) {}

    ngOnInit() {
        this.signupForm = this.fb.group({
          name:[null, [Validators.required]],
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required, Validators.minLength(6)]],
          checkPassword: [null, [Validators.required, this.confirmationValidate]],
        })
    }

    confirmationValidate = (control: FormControl): { [s: string]: boolean } | null => {
      if(!control.value) {
        return { required: true };
      } else if (control.value !== this.signupForm.controls['password'].value) {
        return { confirm: true, error: true };
      }
      return {};
    }

    register() {
      console.log(this.signupForm.value);
      this.authService.register(this.signupForm.value).subscribe((res) => {
        console.log(res);

        if(res.id != null){
          this.message.success('Registration successful!',{ nzDuration: 5000 });
          this.router.navigateByUrl("/login")
        }
        else{
          this.message.error('Registration failed!',{ nzDuration: 5000 });
        }
      })
    }
}
