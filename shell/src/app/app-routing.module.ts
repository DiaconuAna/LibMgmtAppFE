// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
// declare module 'auth/LoginModule';
const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('auth/LoginModule').then(m => m.FlightsModule)
  // },
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
