import React, { useState, useEffect, useCallback } from 'react';
import { booksApi } from '../api/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  Loader2,
  AlertCircle
} from 'lucide-react';
import {  useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksPerPage] = useState(12);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch books with current filters and pagination
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: booksPerPage,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedRating && { rating: selectedRating }),
        ...(stockFilter && { inStock: stockFilter }),
        ...(minPrice && { minPrice: minPrice }),
        ...(maxPrice && { maxPrice: maxPrice })
      };

      const response = await booksApi.getAll(params);

      if (response.success) {
        setBooks(response.data.books || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalBooks(response.data.totalBooks || 0);
      } else {
        setError(response.error || 'Failed to fetch books');
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [currentPage, booksPerPage, searchTerm, selectedRating, stockFilter, minPrice, maxPrice]);

  // Fetch books when dependencies change
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };

  // Handle filter changes
  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchBooks();
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRating('');
    setStockFilter('');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const numRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < fullStars
              ? 'text-yellow-400 fill-current'
              : i === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
              }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  // Render pagination
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(i)}
          className="min-w-[40px]"
        >
          {i}
        </Button>
      );
    }

    

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(1)}
            >
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" id="books-showcase">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Explorer</h1>
          <p className="text-gray-600">
            Discover and explore our collection of {totalBooks} books
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search books by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="px-6">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-6"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </form>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <select
                    value={selectedRating}
                    onChange={(e) => {
                      setSelectedRating(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="1">1+ Stars</option>
                  </select>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Status
                  </label>
                  <select
                    value={stockFilter}
                    onChange={(e) => {
                      setStockFilter(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Books</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price (£)
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      handleFilterChange();
                    }}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price (£)
                  </label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      handleFilterChange();
                    }}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mr-2"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {books.length} of {totalBooks} books
            {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </div>
          <div className="text-sm text-gray-600">
            {totalPages > 1 && `${currentPage} of ${totalPages} pages`}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading books...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-12">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-red-600">{error}</span>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <>
            {books.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book._id}
                    style={{
                      borderRadius: '12px',
                    }}
                    className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 cursor-pointer shadow-sm '
                     onClick={() => navigate(`/book/${book._id}`)} 
                  >
                    {book.thumbnail ? (
                      <img
                        src={book.thumbnail}
                        alt={book.title}
                        className='h-48 w-full object-cover'
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="h-48 w-full flex items-center justify-center bg-gray-100" style={{ display: book.thumbnail ? 'none' : 'flex' }}>
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>

                    <div className='p-2'>
                      <h1 className='font-mono leading-snug text-zinc-950 dark:text-zinc-50 line-clamp-2'>
                        {book.title}
                      </h1>

                      <div className="space-y-1 mt-2">
                        {book.rating && (
                          <div className="flex items-center">
                            {renderStars(book.rating)}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-green-600">
                            {book.price}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${book.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}>
                            {book.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>

                        {book.booklink && (
                          <button
                            className="w-full mt-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={!book.inStock}
                            onClick={() => window.open(book.booklink, '_blank')}
                          >
                            {book.inStock ? "View Book" : "Unavailable"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
