# 📚 Book Explorer

A modern full-stack web application for exploring and discovering books. Built with React, Node.js, and MongoDB, featuring a beautiful UI for browsing books with advanced search and filtering capabilities.

![Book Explorer](https://img.shields.io/badge/Book%20Explorer-v1.0.0-blue)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## 🌟 Features

- **📖 Book Discovery**: Browse through a vast collection of books with detailed information
- **🔍 Advanced Search**: Search books by title with real-time filtering
- **⭐ Rating System**: View book ratings and filter by minimum rating
- **💰 Price Filtering**: Filter books by price range
- **📦 Stock Status**: Check availability status of books
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Efficient pagination and optimized queries
- **🎨 Modern UI**: Beautiful interface built with Tailwind CSS and Radix UI components

## 🏗️ Architecture

```
Book Explorer/
├── 📁 backend/          # Node.js/Express API server
├── 📁 fronted/          # React frontend application
├── 📁 scraper/          # Web scraper for data collection
└── 📄 README.md         # Project documentation
```

## 🛠️ Technology Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **HTTP Client**: Axios
- **Web Scraping**: Cheerio
- **Environment**: dotenv

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1.13
- **UI Components**: shadcn UI
- **Icons**: Lucide React
- **Routing**: React Router
- **HTTP Client**: Axios

### Development Tools
- **Linting**: ESLint
- **Code Quality**: Prettier (implied)
- **Package Management**: npm

## 📊 System Flow

![System Flow](./fronted/public/image.png)


## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-explorer
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../fronted
   npm install
   ```

4. **Install scraper dependencies**
   ```bash
   cd ../scraper
   npm install
   ```

### Environment Setup

1. **Backend Configuration**
   ```bash
   cd backend
   cp .env.example .env
   ```

   Update `.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookexplorer
   PORT=5001
   ```

2. **Database Setup**
   - Create a MongoDB Atlas cluster or use local MongoDB
   - Update the connection string in backend `.env`

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5001`

2. **Start the Frontend**
   ```bash
   cd fronted
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Populate Database (Optional)**
   ```bash
   cd scraper
   npm run dev
   ```
   This will scrape book data from books.toscrape.com and populate your database.

## 📡 API Endpoints

### Base URL: `http://localhost:5001/api`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/books` | Get all books with pagination and filters | `page`, `limit`, `search`, `rating`, `inStock`, `minPrice`, `maxPrice` |
| GET | `/books/:id` | Get specific book by ID | `id` (MongoDB ObjectId) |

### Query Parameters for `/books`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | integer | Page number (default: 1) | `?page=2` |
| `limit` | integer | Books per page (default: 12) | `?limit=20` |
| `search` | string | Search by book title | `?search=javascript` |
| `rating` | number | Minimum rating filter | `?rating=4` |
| `inStock` | boolean | Stock status filter | `?inStock=true` |
| `minPrice` | number | Minimum price filter | `?minPrice=10` |
| `maxPrice` | number | Maximum price filter | `?maxPrice=50` |

### Example API Requests

```bash
# Get first page with default limit
GET /api/books

# Search for books with "python" in title
GET /api/books?search=python&page=1&limit=10

# Filter books with 4+ rating, in stock, price between £10-30
GET /api/books?rating=4&inStock=true&minPrice=10&maxPrice=30

# Get specific book by ID
GET /api/books/507f1f77bcf86cd799439011
```

### API Response Format

```json
{
  "currentPage": 1,
  "booksPerPage": 12,
  "totalPages": 5,
  "totalBooks": 50,
  "books": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "A Light in the Attic",
      "price": "£51.77",
      "rating": 3,
      "inStock": true,
      "booklink": "https://books.toscrape.com/...",
      "thumbnail": "https://books.toscrape.com/...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 🎨 Frontend Features

### Home Page
- **Hero Section**: Welcome message and project branding
- **Search Bar**: Real-time book title search
- **Advanced Filters**:
  - Rating filter (1-5 stars)
  - Stock status (In Stock/Out of Stock)
  - Price range (Min/Max)
- **Book Grid**: Responsive grid layout with book cards
- **Pagination**: Navigate through multiple pages of results

### Book Details Page
- **Book Information**: Title, rating, price, stock status
- **Book Cover**: Display book thumbnail or placeholder
- **External Link**: Direct link to view book on external site
- **Navigation**: Back to home functionality

### UI Components
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Interactive Elements**: Hover effects and smooth transitions

## 🗄️ Database Schema

### Book Model
```javascript
{
  _id: ObjectId,
  title: String,           // Book title
  price: String,           // Price with currency symbol
  rating: Number,          // Rating (1-5)
  inStock: Boolean,        // Availability status
  booklink: String,        // External link to book
  thumbnail: String,       // Book cover image URL
  createdAt: Date,         // Record creation timestamp
  updatedAt: Date          // Record update timestamp
}
```

### Indexes
- Text index on `title` for efficient search
- Index on `rating` for filter queries
- Index on `inStock` for availability filtering
- Index on `price` for price range queries

## 🤖 Web Scraper

### Data Source
- **Website**: [books.toscrape.com](https://books.toscrape.com)
- **Category**: Books (50 pages of data)
- **Update Frequency**: Manual execution or scheduled runs

### Scraped Data Fields
- Book title
- Price
- Rating (1-5 stars)
- Stock availability
- Book detail page URL
- Cover image URL

### Running the Scraper
```bash
cd scraper
npm run dev
```

**Note**: The scraper uses upsert operations to avoid duplicate entries and can be run multiple times safely.

## 🔧 Development

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controller/
│   │   └── book.controller.js # API business logic
│   ├── models/
│   │   └── book.model.js      # Database schema
│   ├── routes/
│   │   └── book.route.js      # API routes
│   └── index.js               # Server entry point
└── package.json

fronted/
├── src/
│   ├── api/
│   │   └── api.js             # API service layer
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── Home.jsx           # Main book listing page
│   │   ├── detailsPage.jsx    # Book details page
│   │   ├── Navbar.jsx         # Navigation component
│   │   └── Hero.jsx           # Hero section
│   ├── App.jsx                # Main app component
│   └── main.jsx               # React entry point
└── package.json

scraper/
├── book.model.js              # Database model
├── db.js                      # Database connection
└── index.js                   # Scraping logic
```

### Available Scripts

#### Backend
```bash
npm run dev      # Start development server with nodemon
npm test         # Run tests (not implemented)
```

#### Frontend
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

#### Scraper
```bash
npm run dev      # Run web scraper
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud database
2. Configure environment variables
3. Deploy to Heroku, Railway, or similar platform
4. Set up CORS for frontend domain

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy `dist` folder to static hosting (Netlify, Vercel, etc.)
3. Configure API base URL for production

### Environment Variables
```env
# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookexplorer
PORT=5001
NODE_ENV=production

# Frontend (if needed)
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## 🔒 Security Considerations

- Input validation on all API endpoints
- CORS configuration for allowed origins
- Environment variables for sensitive data
- Error handling without exposing stack traces
- Rate limiting (recommended for production)

## 📈 Performance Optimizations

- Database indexing for query performance
- Pagination to limit data transfer
- Image lazy loading (can be implemented)
- Caching strategies (Redis recommended)
- CDN for static assets

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB connection string
   - Verify network access and firewall settings
   - Ensure database user has proper permissions

2. **CORS Errors**
   - Verify CORS configuration in backend
   - Check frontend API base URL
   - Ensure frontend origin is in allowed list

3. **Scraper Not Working**
   - Check internet connection
   - Verify target website is accessible
   - Check for changes in website structure

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed


## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [books.toscrape.com](https://books.toscrape.com) for providing sample book data
- React and Node.js communities for excellent documentation
- All contributors and open-source libraries used

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the API documentation

---


