There are two components here that are relevant to client-code:
* `<UserCard>` takes a `user` object prop and displays the user in a card.
* `<SmartUserCard>` takes a `userId` string prop and displays the user with that ID.

But to make `<SmartUserCard>` work, we need to connect an underlying component `<ConnectableUserCard>`. And the curried `connect` function that we need for this, we have to get from the Stripes object, which means we first need to furnish that object to another underlying component, `<StripesableUserCard>`. So the call sequence goes:

> client &rarr; `<SmartUserCard>` &rarr; `<StripesableUserCard>` &rarr; `<ConnectableUserCard>` &rarr; `<UserCard>`

This seems more complicated than it should need to be. Is there a simpler way?
