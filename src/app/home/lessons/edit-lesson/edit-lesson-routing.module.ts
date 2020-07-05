import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLessonPage } from './edit-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: EditLessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLessonPageRoutingModule {}
