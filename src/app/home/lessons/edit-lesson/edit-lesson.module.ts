import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLessonPageRoutingModule } from './edit-lesson-routing.module';

import { EditLessonPage } from './edit-lesson.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        EditLessonPageRoutingModule
    ],
    declarations: [EditLessonPage]
})
export class EditLessonPageModule { }
