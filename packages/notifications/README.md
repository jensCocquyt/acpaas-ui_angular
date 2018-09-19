# @acpaas-ui/ngx-components/notifications

Handle notifications using the `NotificationStore`, with or without redux.

## Dependencies
* @acpaas-ui/notification-store
* rxjs
* @angular-redux/store (when using the redux implementation)

## Usage

```typescript
import { NotificationsModule } from '@acpaas-ui/ngx-components/notification-service'`;
```

## Documentation

Visit our [documentation site](https://acpaas-ui.digipolis.be/) for full how-to docs and guidelines

### API

| Name         | Default value | Description |
| -----------  | ------ | -------------------------- |
| `@Input() className: string;` | `''` | A custom classname to add to the avatar. |
| `@Input() icon: string;` | - | CSS class for rendering an icon, Font Awesome is used in this example. |
| `@Input() image: string;` | - | URL to image src, renders an image. |
| `@Input() letter: string;` | - | Renders a string (letter). |
| `@Input() size: sizes;` | `sizes.R` | The size of the avatar. This can be `sizes.R`) (regular, default, `sizes.S` (small), `sizes.M` (medium) or `sizes.L` (large) |
| `@Input() title: string;` | `''` | The title for the avatar. |

### Example

```
import { AvatarModule } from '@acpaas-ui/ngx-components/avatar';

@NgModule({
	imports: [
		AvatarModule
	]
});

export class AppModule {};
```

```
<aui-avatar image="https://robohash.org/acpaas-ui" title="My image"></aui-avatar>
<aui-avatar icon="fa fa-user" title="An icon" size="L"></aui-avatar>
<aui-avatar letter="T" title="The letter T" size="S"></aui-avatar>
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