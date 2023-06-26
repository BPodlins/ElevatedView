const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/elev-view', {
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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) + 10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'http://source.unsplash.com/collection/45085026',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aut ullam laborum reiciendis saepe, sint, esse doloremque ad voluptas corrupti perferendis beatae blanditiis quis eum sed delectus enim mollitia maxime. Explicabo debitis reprehenderit aperiam quasi eaque id molestias quia et iusto cum ipsa quaerat corrupti sequi nihil architecto earum dignissimos officia, sunt, quas unde ut assumenda impedit sapiente sit! Delectus. Sunt expedita laborum consectetur porro maxime fugiat tenetur deleniti a aliquid molestias quod, dignissimos placeat accusamus dicta, doloribus consequatur earum distinctio voluptatem quisquam? Asperiores ex at accusantium blanditiis nobis saepe.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})