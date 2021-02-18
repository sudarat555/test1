const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superadmin:nnkea7n3@cluster0.vpash.mongodb.net/sample_restaurants?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function connect(){
    await client.connect()
}
connect()

app.get('/restaurants', async (req, res) => {
    try {
        const cuisine = req.query.cuisine
        const borough = req.query.borough
        const db = client.db('sample_restaurants')
        const collection = db.collection('restaurants')
        let query = {}
        if (cuisine) {
            query.cuisine = cuisine
        }

        if (borough) {
            query.borough = borough
        }

        const cursor = collection.find(query).limit(10)
        let restaurants = []
        await cursor.forEach(doc => restaurants.push(doc.name))

        res.send(restaurants)
    }catch(e){
        console.log(e)
    }
})

app.listen(3000, console.log('Start application at port 3000'))