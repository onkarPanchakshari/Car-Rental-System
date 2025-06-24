import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule, NzYearPickerComponent } from 'ng-zorro-antd/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  exports: [ 
    NzButtonModule, 
    NzLayoutModule, 
    NzSpinModule, 
    NzInputModule, 
    NzFormModule, 
    NzIconModule, 
    NzMenuModule, 
    NzTimePickerModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzSelectModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule
  ]
})

export class NgZorroImportsModule {

}