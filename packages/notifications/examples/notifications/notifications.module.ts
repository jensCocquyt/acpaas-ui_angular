import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsModule, StatusbarModule } from '@acpaas-ui/ngx-components/notifications';
import { CodeSnippetModule } from '@acpaas-ui/ngx-components/code-snippet';

import { Pages } from './pages/index';

@NgModule({
	imports: [
		CommonModule,
		NotificationsModule,
		StatusbarModule,
		CodeSnippetModule,
	],
	declarations: [
		Pages,
	],
})
export class NotificationsExamplesModule {}
