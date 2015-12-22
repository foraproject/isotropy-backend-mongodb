import __polyfill from "babel-polyfill";
import should from 'should';
import Driver from "../isotropy-backend-mongodb";

describe("Isotropy MongoDb Backend", () => {
    const TEST_DB = "isotropy-backend-mongodb-test-A1934";
    const CONN_STR = `mongodb://localhost:27017/${TEST_DB}`;


    beforeEach(async () => {
        const db = await Driver.MongoClient.connect(CONN_STR);
        const collection = db.collection("test");
        await collection.insertOne({a: 1});
        await db.dropDatabase();
    });


    describe("MongoClient", () => {
        it("Connect to a database", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            db.should.not.be.empty();
        });
    });


    describe("Database", () => {
        it("Return a collection", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const count = await collection.count({a: 1});
            count.should.equal(4);
        });

        it("Drop the database", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            db.dropDatabase();
            const newCollection = db.collection("test");
            const count = await newCollection.count({a: 1});
            count.should.equal(0);
        });
    });


    describe("Collection", () => {
        it("Open a database", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            db.should.not.be.empty();
        });


        it("Count the number of items in the collection", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const count = await collection.count({a: 1});
            count.should.equal(4);
        });


        it("Create an index", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.createIndex({a: 1, b: 1});
            await collection.createIndex({b: 1});
            const indexes = await collection.indexes();
            indexes.length.should.equal(3);
        });


        it("Delete an item", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.deleteOne({a: 1});
            const count = await collection.count({a: 1});
            count.should.equal(3);
        });


        it("Delete many items", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.deleteMany({a: 1});
            const count = await collection.count({a: 1});
            count.should.equal(0);
        });


        it("Drop a collection", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.drop();
            const newCollection = db.collection("test");
            const count = await newCollection.count({a: 1});
            count.should.equal(0);
        });


        it("Drop all indexes", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.createIndex({a: 1, b: 1});
            await collection.createIndex({b: 1});
            await collection.dropIndexes();
            const indexes = await collection.indexes();
            indexes.length.should.equal(1);
        });


        it("Drop an index", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.createIndex({a: 1, b: 1});
            await collection.createIndex({b: 1});
            await collection.dropIndex("b_1");
            const indexes = await collection.indexes();
            indexes.length.should.equal(2);
        });


        it("Return a cursor", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            const result = await cursor.toArray();
            result.length.should.equal(4);
        });


        it("Find one item", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2, x: 20, y: 30}]);
            const cursor = collection.find({a: 2}).limit(1);
            const result = await cursor.next();
            result.a.should.equal(2);
        });


        it("Find specific fields in one item", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2, x: 20, y: 30}]);
            const cursor = collection.find({a: 2}, {x: 1, y: 1}).limit(1);
            const result = await cursor.next();
            Object.keys(result).length.should.equal(3);
            result.x.should.equal(20);
            result.y.should.equal(30);
        });


        it("Fetch all indexes", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.createIndex({a: 1, b: -1});
            await collection.createIndex({b: 1});
            const indexes = await collection.indexes();
            indexes.length.should.equal(3);
        });


        it("Insert an item", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertOne({a: 1});
            await collection.insertOne({a: 1});
            await collection.insertOne({a: 2});
            const count = await collection.count({a: 1});
            count.should.equal(2);
        });


        it("Insert many items", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            const result = await cursor.toArray();
            result.length.should.equal(4);
        });


        it("Update an item", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.updateOne({a: 1}, {$set: {a: 20}});
            const cursor = collection.find({a: 20}).limit(1);
            const result = await cursor.next();
            result.a.should.equal(20);
        });


        it("Update many items", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            await collection.updateMany({a: 1}, {$set: {a: 20}});
            const cursor = collection.find({a: 20});
            const result = await cursor.toArray();
            result.length.should.equal(4);
        });
    });

    describe("Cursor", () => {
        it("Return an array of results", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            const result = await cursor.toArray();
            result.length.should.equal(4);
        });

        it("Count items", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            const count = await cursor.count();
            count.should.equal(4);
        });

        it("Check if there is a next item", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            const hasNext = await cursor.hasNext();
            hasNext.should.be.true();
        });

        it("Limit results", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            cursor.limit(2);
            const result = await cursor.toArray();
            result.length.should.equal(2);
        });

        it("Get the next item", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            const result = await cursor.next();
            result.a.should.equal(1);
        });

        it("Skip results", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 2}]);
            const cursor = collection.find({a: 1});
            cursor.skip(1);
            const result = await cursor.toArray();
            result.length.should.equal(3);
        });

        it("Sort results", async () => {
            const db = await Driver.MongoClient.connect(CONN_STR);
            const collection = db.collection("test");
            await collection.createIndex({a: 1});
            await collection.createIndex({a: -1});
            await collection.insertMany([{a: 1}, {a: 1}, {a: 1}, {a: 1}, {a: 100}, {a: 2}]);
            const cursor = collection.find().sort([['a', -1]]);
            const result = await cursor.toArray();
            result[0].a.should.equal(100);
        });
    });
});
