const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/search', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Item = mongoose.model('Item', itemSchema);

const populateData = async () => {
    const items = [
        { title: 'Apple', description: 'a Fruit' },
        { title: 'Item 2', description: 'Description 2' },
        { title: 'Item 3', description: 'Description 3' }
    ];
    try {
        await Item.insertMany(items);
        console.log("Data populated");
    } catch (error) {
        console.error("Error populating data:", error);
    }
};
;

app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    try {
        let results;
        if (!query) {
            results = await Item.find();
        } else {
        
            results = await Item.find({ title: new RegExp(query, 'i') });
        }
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Error fetching search results" });
    }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
