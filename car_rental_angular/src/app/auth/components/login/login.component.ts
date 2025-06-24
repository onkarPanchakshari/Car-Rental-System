import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZorroImportsModule } from '../../../NgZorroImportsModule';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-login',
  imports: [NgZorroImportsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinning:boolean = false;
  // isLoginLoading: boolean = false;
  loginForm! : FormGroup;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
       email:[null,[Validators.email, Validators.required]],
        password:[null,[Validators.required, Validators.minLength(3)]]
    });
  }

  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if(res.userId != null){
        const user ={
          id : res.userId,
          role: res.userRole,
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
       if(StorageService.isAdminLoggesIn()) {
        this.router.navigateByUrl("/admin/dashboard");
       }else if(StorageService.isCustomerLoggesIn()) {
        this.router.navigateByUrl("/coustomer/dashboard");
       }else {
        this.message.error("Bad Credentials", { nzDuration: 5000 });
       }
      }
    })

  }
}
