import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'lessons',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./lessons/lessons.module').then(
                                (m) => m.LessonsPageModule
                            ),
                    },
                    {
                        path: ':lessonId',
                        loadChildren: () =>
                            import('./lessons/lesson/lesson.module').then(
                                (m) => m.LessonPageModule
                            ),
                    },
                ],
            },
            {
                path: 'notes',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./notes/notes.module').then((m) => m.NotesPageModule),
                    },
                    {
                        path: 'new',
                        loadChildren: () =>
                            import('./notes/new-note/new-note.module').then(
                                (m) => m.NewNotePageModule
                            ),
                    },
                    {
                        path: 'edit/:noteId',
                        loadChildren: () =>
                            import('./notes/edit-note/edit-note.module').then(
                                (m) => m.EditNotePageModule
                            ),
                    },
                    // {
                    //   path: ':noteId',
                    //   loadChildren: () =>
                    //     import('./notes/note/note.module').then((m) => m.NotePageModule),
                    // },
                ],
            },
            {
                path: '',
                redirectTo: '/home/tabs/lessons',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/home/tabs/lessons',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
