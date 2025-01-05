// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';
import {AuthGuard} from "./core/auth.guard.service";
const routes: Routes = [

  {
    path: '',
    // component: MainLayoutComponent,
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './LoginModule',  // Ensure this matches what is exposed in the remote
        type: 'module',
      })
        .then((m) => m.LoginModule)
        .catch((err) => {
          console.error('Error loading LoginModule:', err);
        }),
  },
  {
    path: 'books',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './BookModule',
      })
        .then((m) => m.BookModule)
        .catch((err: any) => {
          console.error('Error loading remote module:', err);
          // return ErrorModule;
        }),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
