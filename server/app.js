require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import the express module
const path = require('path');

// Create an instance of express
const app = express();

// Serve static files from the 'avatars' folder located in the 'server' folder
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));

// Serve static files from the client/build folder for the frontend
app.use(express.static(path.join(__dirname, '../client/build')));

const API_URL = process.env.API_URL;

// Create a GET route
app.get('/autocomplete', (req, res) => {
    const query = req.query.q; // Get the query string parameter 'q' (Ensure query is a string)
    // Create an array of autoComplete objects
    const profiles = [
        {
            ImageUrl: `${API_URL}/avatars/av1.png`,
            WorkTitle: "Senior Software Engineer",
            Name: "Emma Watson"
        },
        {
            ImageUrl: `${API_URL}/avatars/av2.png`,
            WorkTitle: "Senior Manager",
            Name: "Elen Degeneres"
        },
        {
            ImageUrl: `${API_URL}/avatars/av3.png`,
            WorkTitle: "Full-Stack Developer",
            Name: "Zayn Malik"
        },
        {
            ImageUrl: `${API_URL}/avatars/av4.png`,
            WorkTitle: "Talent Acquisition Specialist",
            Name: "Jennifer Lawrence"
        },
        {
            ImageUrl: `${API_URL}/avatars/av5.png`,
            WorkTitle: "Consultant",
            Name: "Jennifer Lopez"
        },
        {
            ImageUrl: `${API_URL}/avatars/av6.png`,
            WorkTitle: "Programmer",
            Name: "Chris Tucker"
        },
        {
            ImageUrl: `${API_URL}/avatars/av7.png`,
            WorkTitle: "Product Manager",
            Name: "Chris Hemsworth"
        },
        {
            ImageUrl: `${API_URL}/avatars/av8.png`,
            WorkTitle: "Designer",
            Name: "Emma Stone"
        },
        {
            ImageUrl: `${API_URL}/avatars/av9.png`,
            WorkTitle: "CTO",
            Name: "Paul Rudd"
        },
        {
            ImageUrl: `${API_URL}/avatars/av10.png`,
            WorkTitle: "Junior React Developer",
            Name: "Zendaya"
        }
    ];

    // If no query is provided, return the full profiles list
    if (!query) {
        return res.json(profiles);
    }

    // Otherwise, filter the profiles based on the query
    const filteredData = profiles.filter(item => 
        item.WorkTitle.toLowerCase().includes(query.toLowerCase()) || 
        item.Name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Respond with the array of objects
    res.json(filteredData);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});