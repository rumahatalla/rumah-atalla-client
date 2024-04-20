console.log("THIS IS FROM SW MAIN");

import { getToken, getMessaging } from "firebase/messaging";
import { registerMessaging } from "firebase/messaging";

const messaging = getMessaging();

getToken(messaging, {
  vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Got registration token:", currentToken);
      // Send the token to your server and update the UI if it's new
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

messaging.setBackgroundMessageHandler(function (payload) {
  const title = "Hello World";
  const option = { body: payload.data.status };
  return self.registration.showNotification(title, option);
});

registerMessaging(messaging);
