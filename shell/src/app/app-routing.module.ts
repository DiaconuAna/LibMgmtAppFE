// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';
import {AuthGuard} from "./core/auth.guard.service";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './LoginModule',
        type: 'module',
      })
        .then((m) => m.LoginModule)
        .catch((err) => {
          console.error('Error loading LoginModule:', err);
        }),
  },
  {
    path: 'main',  // Use a different path for the main layout
    component: MainLayoutComponent,  // Main layout as the parent component
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user', // Redirect to the user MFE
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
            }),
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4203/remoteEntry.js',
            exposedModule: './UserModule',
          })
            .then((m) => m.UserModule)
            .catch((err: any) => {
              console.error('Error loading remote module:', err);
            }),
      },
    ],
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
