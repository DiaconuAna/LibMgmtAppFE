import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {loadRemoteModule} from '@angular-architects/module-federation';
// import { ErrorModule } from './error/error.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path:'products',
    loadChildren:() =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './AuthModule'
      })
        .then((m) => m.AuthModule)
        .catch((err: any) => {
          console.error('Error loading remote module:', err);
          return -1;
        })
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
