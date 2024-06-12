db.createUser({
  user: "franroav",
  pwd: "root",
  roles: [
    {
      role: "readWrite",
      db: "cb_subscription",
    },
    "readWriteAnyDatabase",
  ],
});
db.createCollection("subscriptions"); // MongoDB creates the database when you first store data in that database
