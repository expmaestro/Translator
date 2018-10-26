import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { EventPageComponent } from './event-page/event-page.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'event-page', component: EventPageComponent },
  { path: 'popup', component: PopupComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
