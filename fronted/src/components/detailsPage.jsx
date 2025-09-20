import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router'; 
import { booksApi } from '../api/api';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await booksApi.getById(id); 
        console.log(response);

        if (response.success && response.data) {
          setBook(response.data.data || response.data); 
        } else {
          console.error(response.error || 'Book not found');
        }
      } catch (error) {
        console.error('Failed to fetch book:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading book details...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-20 text-red-500">
        Book not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link to="/" className="text-blue-600 flex items-center mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
      </Link>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-full md:w-48 h-auto object-cover border rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder.png';
            }}
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>

            {book.rating && (
              <p className="mb-2 text-yellow-500 font-medium">
                Rating: {book.rating} / 5
              </p>
            )}

            <p className="mb-2 text-green-600 font-semibold">
              Price: {book.price}
            </p>

            <p className="mb-4">
              Stock:{" "}
              {book.inStock ? (
                <span className="text-green-700 font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </p>

            <Button
              disabled={!book.inStock}
              onClick={() => window.open(book.booklink, "_blank")}
              className="mt-2"
            >
              {book.inStock ? "View Book" : "Unavailable"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
