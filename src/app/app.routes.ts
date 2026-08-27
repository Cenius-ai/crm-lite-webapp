import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/pipeline', pathMatch: 'full' },
  {
    path: 'companies',
    loadComponent: () =>
      import('./features/companies/companies-list.component').then(
        (m) => m.CompaniesListComponent,
      ),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./features/contacts/contacts-list.component').then(
        (m) => m.ContactsListComponent,
      ),
  },
  {
    path: 'deals',
    loadComponent: () =>
      import('./features/deals/deals-list.component').then(
        (m) => m.DealsListComponent,
      ),
  },
  {
    path: 'pipeline',
    loadComponent: () =>
      import('./features/pipeline/pipeline-board.component').then(
        (m) => m.PipelineBoardComponent,
      ),
  },
  { path: '**', redirectTo: '/pipeline' },
];
