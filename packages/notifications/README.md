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

### API

| Name         | Default value | Description |
| -----------  | ------ | -------------------------- |
| `triggerNotification: ...args;` | - | A custom classname to add to the avatar. |
| `loadNotifications: notifications: Notifications, action;` | - | CSS class for rendering an icon, Font Awesome is used in this example. |
| `clearNotification: notification: any;` | - | URL to image src, renders an image. |
| `clearTarget: target: string;` | - | Renders a string (letter). |

### Example

```
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
```
<aui-statusbar
	[notifications]="notifications$ | async"
	[remainingMessage]="remainingMessage"
	(clearNotification)="clearNotification($event)">
</aui-statusbar>
```
```
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








# @acpaas-ui/notification-service
Handle notifications using the `NotificationStore`, with or without redux.

## Dependencies
* @acpaas-ui/notification-store
* rxjs
* @angular-redux/store (when using the redux implementation)

## Installation
```
npm install @acpaas-ui/notification-service
```

Import component in **app.module.ts**, with or without `forRoot()`
```
import { NotificationsModule } from '@acpaas-ui/notification-service';

@NgModule({
    imports: [
        NotificationsModule.forRoot({
            401: 'you need to log in'
        })
    ]
})

export class AppModule {}
```

## Usage without redux

When working without redux, the `NotificationsService` provides an injectable angular wrapper for the `NotificationStore`. You can use any method and property the store instance provides.

Consult the `@acpaas-ui/notification-store` documentation for more info on working with notifications.

## Usage with redux

When working with redux, the `NotificationStore` state will be synced with your app state. The following methods are available as actions in the `NotificationsActionCreator`:

* triggerNotification
* clearNotification
* clearTarget

Consult the `@acpaas-ui/notification-store` documentation for more info on working with notifications.

### Add the notificationsReducer

```
import { combineReducers } from 'redux';
import { notificationsReducer } from '@acpaas-ui/notification-service';

export interface AppState {
    notifications: any;
};

export const rootReducer = combineReducers<AppState>({
    notifications: notificationsReducer
});
```

### Inject the actioncreator

You can trigger actions using the `NotificationsActionCreator`:

```
import { Component } from '@angular/core';
import { NotificationsActionCreator } from '@acpaas-ui/notification-service';

@Component({
    selector: 'my-component',
    template: '<div></div>',
    providers: [ NotificationsActionCreator ]
})
export class MyComponent {
    constructor(
        private notificationsActions: NotificationsActionCreator
    ) {}
}
```

and use `@angular-redux/store`s `select` decorator to retrieve notifications from the app state, using the INotifications interface for typechecking:

```
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Notifications } from '@acpaas-ui/notification-service';

@select() notifications$: Observable<Notifications>;
@select(['notifications', 'statusbar']) statusbar$: Observable<Notifications>;
```

### Triggering notifications

You can trigger notifications with the `triggerNotification` method on the actioncreator (which will update the state):

```
this.notificationsActions.triggerNotification('401', 'statusbar');
```

### Clearing notifications

Likewise, clearing notifications is done via the actioncreator:

```
this.notificationsActions.clearNotification(notification);
```

### Clearing all notifications for a target

To clear all notifications for a target, use the `clearTarget` action:

```
this.notificationsActions.clearTarget('statusbar');
```