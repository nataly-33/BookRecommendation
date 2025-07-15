db = db.getSiblingDB("proyectografo");

db.createUser({
  user: "nataly-33",
  pwd: "passWord63",
  roles: [
    {
      role: "readWrite",
      db: "proyectobst",
    },
  ],
});
