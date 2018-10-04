# @acpaas-ui/ngx-components/notifications

Handle notifications using the `NotificationStore`.

## Dependencies
* @acpaas-ui/notification-store
* rxjs
* @angular-redux/store (when using the redux implementation)

## Usage

```typescript
import { NotificationsModule } from '@acpaas-ui/ngx-components/notifications'`;
```

## Documentation

Visit our [documentation site](https://acpaas-ui.digipolis.be/) for full how-to docs and guidelines

### Methods

| Method       | Description |
| -----------  | -------------------------- |
| `triggerNotification(...args)` | To trigger a notification. |
| `loadNotifications(notifications: Notifications, action)` | Loading a notification with a certain action. |
| `clearNotification(notification: any)` | To clear your notification. |
| `clearTarget(target: string)` | To clear all notifications for a target. |

### Example

```typescript
import { NotificationsModule } from '@acpaas-ui/ngx-components/notifications';

@NgModule({
	imports: [
		NotificationsModule.forRoot(
			{401: 'you need to log in'},
			{allowOverrides: true}),
	],
	declarations: [
		Pages,
	],
})

export class AppModule {};
```

```html
<aui-statusbar
	[notifications]="notifications$ | async"
	[remainingMessage]="remainingMessage"
	(clearNotification)="clearNotification($event)">
</aui-statusbar>
```

```typescript
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
```

## Contributing

Visit our [Contribution Guidelines](../../CONTRIBUTING.md) for more information on how to contribute.
