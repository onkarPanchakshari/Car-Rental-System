import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [

    {path: "register", component: SignupComponent},
    {path: "login",  component: LoginComponent},
    {path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
    {path: "coustomer", loadChildren: () => import("./modules/coustomer/coustomer.module").then(m => m.CoustomerModule)},
];
