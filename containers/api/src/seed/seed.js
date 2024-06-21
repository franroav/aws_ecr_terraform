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


// seed
/*const collection = [
  {
    _id: "6266c6e1fddc9c0d60cc3f61",
    name: "Francisco Roa Valenzuela",
    email: "franroav@gmail.com",
    address: "Froilan Lagos 591",
    gender: "Hombre",
    invitation: 1,
    amount: 5000,
    code: "74Fs34",
    traces: [],
    created_at: "2022-04-25T12:05:53-04:00",
    updated_at: "2022-04-25T12:05:53-04:00",
  },
  {
    _id: "624a2e7644e8ac3ca4078e5b",
    name: "Alicia Rubio Salinas",
    email: "alirubsal@gmail.com",
    address: "Froilan Verder 138",
    gender: "Mujer",
    invitation: 1,
    amount: 5000,
    code: "45Lc71",
    traces: [],
    created_at: "2022-04-25T12:05:53-04:00",
    updated_at: "2022-04-25T12:05:53-04:00",
  },
  {
    _id: "6269d332eb1e35132019437e",
    email: "palindroma@gmail.com",
    name: "Palindromas",
    gender: "Hombre",
    address: "Catalina de Erauzo 283",
    code: "h1PXSS",
    invitation: 1,
    amount: 5000,
    code: "h1PXSS",
    traces: [],
    created_at: "2022-04-27T19:35:14-04:00",
    updated_at: "2022-04-27T19:35:14-04:00",
  },
];*/