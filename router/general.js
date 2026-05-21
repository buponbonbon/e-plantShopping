const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

/**
 * Task 10: Get the list of books available in the shop using async-await with Axios
 * Input: None | Output: JSON list of all books
 */
public_users.get('/', async function (req, res) {
    try {
        // Axios call directly to the base endpoint to retrieve all books
        const response = await axios.get('http://localhost:5000/');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books list" });
    }
});

/**
 * Task 11: Get book details based on ISBN using async-await with Axios
 * Input: isbn (URL parameter) | Output: JSON object of the matching book
 */
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        // Axios call specifically targeting the microservice/endpoint for ISBN
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }
});

/**
 * Task 12: Get book details based on Author using async-await with Axios
 * Input: author (URL parameter) | Output: JSON array of books by the author
 */
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        // Axios call specifically targeting the microservice/endpoint for Author
        const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: `No books found for author: ${author}` });
    }
});

/**
 * Task 13: Get book details based on Title using async-await with Axios
 * Input: title (URL parameter) | Output: JSON array of books matching the title
 */
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        // Axios call specifically targeting the microservice/endpoint for Title
        const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(404).json({ message: `No books found with title: ${title}` });
    }
});

module.exports.general = public_users;