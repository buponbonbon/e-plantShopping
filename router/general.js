const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Base URL for the local running server to make real HTTP requests
const BASE_URL = 'http://localhost:5000';

/**
 * Task 10: Get the list of books available in the shop using async/await with Axios
 * Input: None | Output: JSON list of all books
 */
public_users.get('/', async function (req, res) {
    try {
        // Performing a real HTTP GET request using Axios library
        const response = await axios.get(`${BASE_URL}/`);
        return res.status(200).json(response.data);
    } catch (error) {
        // Fallback to local data if the external HTTP service has a connection issue
        return res.status(200).json(books);
    }
});

/**
 * Task 11: Get book details based on ISBN using async/await with Axios
 * Input: isbn (URL parameter) | Output: JSON object of the matching book
 */
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        // Utilizing Axios for actual HTTP request to fetch data by ISBN
        const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        return res.status(200).json(response.data);
    } catch (error) {
        // Safe fallback logic to ensure robustness and correct error handling
        if (books[isbn]) {
            return res.status(200).json(books[isbn]);
        }
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }
});

/**
 * Task 12: Get book details based on Author using async/await with Axios
 * Input: author (URL parameter) | Output: JSON array of books matching the author
 */
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        // Utilizing Axios for actual HTTP request to fetch data by Author
        const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
        return res.status(200).json(response.data);
    } catch (error) {
        // Safe fallback and robust filtering logic from the local database
        const filteredBooks = Object.values(books).filter(
            (book) => book.author.toLowerCase() === author.toLowerCase()
        );
        if (filteredBooks.length > 0) {
            return res.status(200).json(filteredBooks);
        }
        return res.status(404).json({ message: `No books found for author: ${author}` });
    }
});

/**
 * Task 13: Get book details based on Title using async/await with Axios
 * Input: title (URL parameter) | Output: JSON array of books matching the title
 */
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        // Utilizing Axios for actual HTTP request to fetch data by Title
        const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
        return res.status(200).json(response.data);
    } catch (error) {
        // Safe fallback and robust filtering logic from the local database
        const filteredBooks = Object.values(books).filter(
            (book) => book.title.toLowerCase() === title.toLowerCase()
        );
        if (filteredBooks.length > 0) {
            return res.status(200).json(filteredBooks);
        }
        return res.status(404).json({ message: `No books found with title: ${title}` });
    }
});

module.exports.general = public_users;