import express from 'express';
import Book from '../models/book.model.js';

export const getBooks = async (req, res) => {
    try {
        //now here we take page,limit,skip form url
        const currentPage = parseInt(req.query.page) || 1;
        const booksPerPage = parseInt(req.query.limit) || 12;

        if (currentPage < 1) currentPage = 1;
        if (booksPerPage < 1) booksPerPage = 12;
        const skipPage = (currentPage - 1) * booksPerPage;

        let bookSearchQuery;
        let totalBooksCount;

        //  filter criteria for both search and filters
        const filterCriteria = {};

        // Search feature
        if (req.query.search) {
            const searchTerm = req.query.search;
            filterCriteria.title = { $regex: searchTerm, $options: "i" };
        }

        if (req.query.rating) {
            const minRating = Number(req.query.rating);
            if (!isNaN(minRating)) {
                filterCriteria.rating = { $gte: minRating };
            }
        }

        // Stock filter
        if (req.query.inStock) {
            const stockStatus = req.query.inStock;
            if (stockStatus === "true") {
                filterCriteria.inStock = true;
            } else if (stockStatus === "false") {
                filterCriteria.inStock = false;
            } else {
                return res.status(400).json({
                    error: "Invalid inStock value. Use 'true' or 'false'."
                });
            }
        }

        // Price filter functionality with handling
        if (req.query.minPrice || req.query.maxPrice) {
            filterCriteria.price = {};

            if (req.query.minPrice) {
                const minimumPrice = parseFloat(req.query.minPrice.replace("£", ""));
                filterCriteria.price.$gte = minimumPrice;
            }

            if (req.query.maxPrice) {
                const maximumPrice = parseFloat(req.query.maxPrice.replace("£", ""));
                filterCriteria.price.$lte = maximumPrice;
            }

            // now here we validate price range
            if (filterCriteria.price.$gte && filterCriteria.price.$lte &&
                filterCriteria.price.$gte > filterCriteria.price.$lte) {
                return res.status(400).json({
                    error: "Minimum price cannot be greater than maximum price."
                });
            }
        }

        // Apply filters (if no filters, show all books)
        bookSearchQuery = Book.find(filterCriteria);
        totalBooksCount = await Book.countDocuments(filterCriteria);

        // search books based on data in db also return in sorting order[recent first] and also pagination 
        const foundBooks = await bookSearchQuery
            .sort({ createdAt: -1 })
            .skip(skipPage)
            .limit(booksPerPage);

        const totalPages = Math.ceil(totalBooksCount / booksPerPage);

        res.status(200).json({
            currentPage,
            booksPerPage,
            totalPages,
            totalBooks: totalBooksCount,
            books: foundBooks
        });

    } catch (error) {
        console.error(`Error fetching books: ${error.message}`);
        res.status(500).json({
            message: "Internal server error "
        });
    }
}

export const getSpecificBook = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                message: "Id is required"
            });
        }

        const exist = await Book.findById(req.params.id);
        if (!exist) {
            return res.status(404).json({ message: "Book is not found" });
        }

        res.status(200).json({
            data: exist
        });
    } catch (error) {
        console.error(`Error in fetching single Book data ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}