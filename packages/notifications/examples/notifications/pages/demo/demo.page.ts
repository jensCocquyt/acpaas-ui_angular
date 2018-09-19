import { Component } from '@angular/core';

import { NotificationsService } from '@acpaas-ui/ngx-components/notifications';

@Component({
	templateUrl: './demo.page.html',
})
export class NotificationsDemoPageComponent {
	public remainingMessage = '+ %{remaining} meer';

	constructor(
		private notificationsService: NotificationsService
	) { }

	get notificationService() {
		return this.notificationsService;
	}

	public clearNotification(notification: Notification): void {
		this.notificationsService.clearNotification(notification);
	}

	public setstandaardNotification(): void {
		this.notificationsService.triggerNotification({
			handle: '204',
			message: 'This is a notification',
			type: 'S',
			timer: 3000,
		});
	}

}
