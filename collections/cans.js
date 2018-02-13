CanCollection = new Mongo.Collection(null);
HitsCollection = new Mongo.Collection(null);
/*This creates a local collection. This is a Minimongo collection that has no database connection
(ordinarily a named collection would either be directly connected to the database on the server,
or via a subscription on the client). https://guide.meteor.com/collections.html */