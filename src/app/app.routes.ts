import { Routes } from '@angular/router';
import { EnterNickName } from './enter-nick-name/enter-nick-name';
import { Main } from './main/main';

export const routes: Routes = [
  { path: '', component: EnterNickName },
  { path: 'main', component: Main },
];
