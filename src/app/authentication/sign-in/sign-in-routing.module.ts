import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SignInPage } from './sign-in.page';
import { TokenCheckService } from '../../token-check.service';

const routes: Routes = [
  {
    path: '',
    component: SignInPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, HttpClientModule],
  providers: [TokenCheckService]
})
export class SignInPageRoutingModule {}
