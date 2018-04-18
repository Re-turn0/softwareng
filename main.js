Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}

if ('Notification' in window && navigator.serviceWorker) {
  // Display the UI to let the user toggle notifications
}

if (Notification.permission === "granted") {
  /* do our magic */
} else if (Notification.permission === "blocked") {
 /* the user has previously denied push. Can't reprompt. */
} else {
  /* show a prompt to the user */
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    reg.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        // We have a subscription, update the database
        console.log('Subscription object: ', sub);
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}

var webPush = require('web-push');

var pushSubscription = {"endpoint":"https://android.googleapis.com/gcm/send/f1LsxkKphfQ:APA91bFUx7ja4BK4JVrNgVjpg1cs9lGSGI6IMNL4mQ3Xe6mDGxvt_C_gItKYJI9CAx5i_Ss6cmDxdWZoLyhS2RJhkcv7LeE6hkiOsK6oBzbyifvKCdUYU7ADIRBiYNxIVpLIYeZ8kq_A",
"keys":{"p256dh":"BLc4xRzKlKORKWlbdgFaBrrPK3ydWAHo4M0gs0i1oEKgPpWC5cW8OCzVrOQRv-1npXRWk8udnW3oYhIO4475rds=", "auth":"5I2Bu2oKdyy9CwL8QVF0NQ=="}};

var payload = 'Here is a payload!';

var options = {
  gcmAPIKey: 'AIzaSyD1JcZ8WM1vTtH6Y0tXq_Pnuw4jgj_92yg',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
