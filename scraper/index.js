import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import Book from "./book.model.js";
import { connectDB } from "./db.js";

dotenv.config();

const scrapePage = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const books = [];
    const ratingMap = {
      "One": 1,
      "Two": 2,
      "Three": 3,
      "Four": 4,
      "Five": 5
    };

    $("li.col-xs-6.col-sm-4.col-md-3.col-lg-3").each((index, element) => {
      const bookTitle = $(element).find("h3 a").attr("title");
      const relativeLink = $(element).find("h3 a").attr("href");
      const relativeImg = $(element).find(".image_container a img").attr("src");

      const bookDetail = new URL(relativeLink, url).href;
      const imgUrl = new URL(relativeImg, url).href;

      const ratingClass = $(element).find("p.star-rating").attr("class");
      const ratingWord = ratingClass ? ratingClass.split(" ")[1] : "No rating";
      const rating = ratingMap[ratingWord] || 0;  // Convert to number, 0 if no rating

      const bookPrice = $(element).find("p.price_color").text().trim();
      const stock = $(element)
        .find("p.instock.availability")
        .text()
        .replace(/\s+/g, " ")
        .trim();

      books.push({
        title: bookTitle,
        price: bookPrice,
        inStock: stock.includes("In stock"),
        rating,          
        booklink: bookDetail,
        thumbnail: imgUrl,
      });
    });

    return books;
  } catch (error) {
    console.error(`Failed to fetch ${url}: ${error.message}`);
    return [];
  }
};

const fetchAllPages = async () => {
  const baseUrl = "https://books.toscrape.com/catalogue/category/books_1/";
  let allBooks = [];

  for (let i = 1; i <= 50; i++) {
    const pageUrl =
      i === 1 ? `${baseUrl}index.html` : `${baseUrl}page-${i}.html`;

    console.log(`Fetching page ${i}...`);
    const books = await scrapePage(pageUrl);
    allBooks = allBooks.concat(books);
  }

  // Upsert books into DB
  const operations = allBooks.map((book) => ({
    updateOne: {
      filter: { booklink: book.booklink },
      update: { $set: book },
      upsert: true,
    },
  }));

  await Book.bulkWrite(operations);

  console.log(`Synced ${allBooks.length} books into DB`);
};

const runScraper = async () => {
  try {
    await connectDB();
    await fetchAllPages();
    mongoose.connection.close();
  } catch (error) {
    console.error("Scraper failed:", error);
    mongoose.connection.close();
  }
};

runScraper();
