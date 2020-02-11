const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.senNotification = functions.https.onRequest(async (request, response) => {
    var payload = {
        notification: {
          title: "Amir" +  " send you friend request",
        }
      };

   await admin.messaging().sendToDevice("fhBgs8sGOhk:APA91bEqN57nkSdBbHD1WjD6wJCFGLTvb9PlqY4vdlZ9KLr29UILRUo_-9KmH4Z9iS1oFzNBG_9yXRYtw-T8ML2vsACbiwKLohlXSFHtbekzRqPYUKlxSLMLdZB7JQJtJDxThsD_Cx_y",payload);
        console.log("SENDING_NOTIFICATION");

        return true;
   });
   

