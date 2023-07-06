const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('someDBUrl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });
    
    const sample = array => array[Math.floor(Math.random() * array.length)];
    
    
    const seedDB = async () => {
        await Campground.deleteMany({});
        for (let i = 0; i < 125; i++) {
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
            const camp = new Campground({
                author: '64a2cd835191850c3e594f4f',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
                price,
                geometry: {
                    type: "Point",
                    coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                ]
                },
                images: [
                    {
                        url: 'https://res.cloudinary.com/drwr2gaks/image/upload/v1688600471/ElevWiev/adrien-brunat-X2aW2rULaz0-unsplash_rheme2.jpg',
                        filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                    },
                    {
                        url: 'https://res.cloudinary.com/drwr2gaks/image/upload/v1688600464/ElevWiev/jenny-hill-1O-zzgGPEas-unsplash_cgqvv8.jpg',
                        filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                    }
                ]
            })
            await camp.save();
        }
    }
    
    seedDB().then(() => {
        mongoose.connection.close();
    })

    