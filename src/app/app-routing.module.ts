import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
    },
    // {
    //     path: 'lessons',
    //     loadChildren: () => import('./home/lessons/lessons.module').then(m => m.LessonsPageModule)
    // },
    // {
    //     path: 'notes',
    //     loadChildren: () => import('./home/notes/notes.module').then(m => m.NotesPageModule)
    // },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
