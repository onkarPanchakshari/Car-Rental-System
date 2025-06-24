import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

// NG ZORRO IMports
import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input'; 
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NzButtonModule, NzLayoutModule, NzSpinModule,NzInputModule, NzFormModule,RouterLink,CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'car_rental_angular';

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggesIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggesIn();

  constructor(private router: Router){}

  ngOnInit()
  {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd")
      {
        this.isCustomerLoggedIn = StorageService.isCustomerLoggesIn();
        this.isAdminLoggedIn = StorageService.isAdminLoggesIn();
      }
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigate(['/login']);
  }
}

