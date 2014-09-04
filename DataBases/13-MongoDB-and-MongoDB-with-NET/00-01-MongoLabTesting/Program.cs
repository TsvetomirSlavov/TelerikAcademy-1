﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace ConnectingToMongoDb
{
    class Program
    {

        const string DatabaseHost = "mongodb://root:root@ds063779.mongolab.com:63779/chat";
        const string DatabaseName = "chat";


        class Message
        {
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }

            public string Text { get; set; }

            public DateTime DateAdded { get; set; }
            public string Author { get; set; }
        }

        static MongoDatabase GetDatabase(string name, string fromHost)
        {
            var mongoClient = new MongoClient(fromHost);
            var server = mongoClient.GetServer();
            return server.GetDatabase(name);
        }

        static void Main()
        {
            var db = GetDatabase(DatabaseName, DatabaseHost);

            var logs = db.GetCollection<Message>("Messages");

            logs.Insert(new Message()
            {
                DateAdded = DateTime.Now,
                Text = "This is my first message",
                Author = "Stamat"
            });
        }
    }

}