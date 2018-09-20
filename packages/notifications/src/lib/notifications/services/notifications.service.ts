import { Injectable } from '@angular/core';
import { NotificationStore } from '@acpaas-ui/ngx-components/notifications';

@Injectable()
export class NotificationsService {
	constructor() {
		return new NotificationStore();
	}
}
