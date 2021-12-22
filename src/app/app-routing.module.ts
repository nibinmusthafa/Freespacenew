import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Modules/auth/auth.guard';

const routes: Routes = [

  // {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:"", loadChildren:()=> import('./Modules/auth/auth.module').then(x=>x.AuthModule)},
  {path:"admin",canActivate:[AuthGuard], loadChildren:()=> import('./Modules/admin/admin.module').then(x=>x.AdminModule)},
  {path:"designer",canActivate:[AuthGuard], loadChildren:()=> import('./Modules/designer/designer.module').then(x=>x.DesignerModule)},
  {path:"supervisor",canActivate:[AuthGuard], loadChildren:()=> import('./Modules/supervisor/supervisor.module').then(x=>x.SupervisorModule)},
  {path:"factory",canActivate:[AuthGuard], loadChildren:()=> import('./Modules/factory/factory.module').then(x=>x.FactoryModule)},
  {path:"finance",canActivate:[AuthGuard], loadChildren:()=> import('./Modules/finance/finance.module').then(x=>x.FinanceModule)},
  {path:"lead",canActivate:[AuthGuard], loadChildren:()=> import('./Modules/lead/lead.module').then(x=>x.LeadModule)},
  {path:"superadmin",canActivate:[AuthGuard], loadChildren:()=> import('./Modules/superadmin/superadmin.module').then(x=>x.SuperadminModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
