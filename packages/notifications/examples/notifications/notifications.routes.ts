import { Routes } from '@angular/router';

import { NotificationsDemoPageComponent } from './pages/demo/demo.page';

export const NOTIFICATIONS_EXAMPLES_ROUTES: Routes = [
	{
		path: '',
		component: NotificationsDemoPageComponent,
		pathMatch: 'full',
	},
];
