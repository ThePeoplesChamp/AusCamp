const { request } = require('express');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')






mongoose.connect('mongodb://localhost:27017/aus-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection Error'));
db.once('open', () => {
    console.log('Database Connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '62c679f09e87b7d08546a380',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dp8qplenm/image/upload/v1657201353/AusCamp/blake-wisz-TcgASSD5G04-unsplash_sd6kvu.jpg',
                    filename: 'blake-wisz-TcgASSD5G04-unsplash_sd6kvu'
                },
                {
                    url: 'https://res.cloudinary.com/dp8qplenm/image/upload/v1657201349/AusCamp/tegan-mierle-fDostElVhN8-unsplash_at4ydg.jpg',
                    filename: 'tegan-mierle-fDostElVhN8-unsplash_at4ydg'
                }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, debitis perferendis? Veritatis excepturi ut voluptatibus repellendus porro. In, iste maiores facilis consectetur voluptatem voluptates placeat sunt, quas, magnam aliquam nesciunt.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            }
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
