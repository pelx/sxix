import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';

const routes: Routes = [
  {
    path: '',
    component: LessonsPage,
  },
  {
    path: 'lesson',
    loadChildren: () =>
      import('./lesson/lesson.module').then((m) => m.LessonPageModule),
  },
  {
    path: 'edit-lesson',
    loadChildren: () => import('./edit-lesson/edit-lesson.module').then( m => m.EditLessonPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
