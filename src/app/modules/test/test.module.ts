import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTestComponent } from './components/create-test/create-test.component';

import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { DoTestComponent } from './components/do-test/do-test.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateTestComponent, ViewTestComponent, DoTestComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [CreateTestComponent]
})
export class TestModule { }
