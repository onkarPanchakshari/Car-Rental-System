import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { GetBookingComponent } from './components/get-booking/get-booking.component';
import { SearchCarComponent } from './components/search-car/search-car.component';


const routes: Routes = [
  {path: "dashboard", component: AdminDashboardComponent},
  {path: "car", component : PostCarComponent},
  {path: "car/:id", component : UpdateCarComponent}, // car/:id is used to rout with id
  {path: "bookings",component:GetBookingComponent},
  {path: "search",component:SearchCarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
