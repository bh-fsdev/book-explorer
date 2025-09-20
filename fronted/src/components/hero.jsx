import React from "react";
import { Badge } from "./ui/badge";
import { ArrowRight, BookOpen, Search, Filter, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";

const handleBrowseBooksClick = () => {
  document.getElementById("books-showcase")?.scrollIntoView({
    behavior: "smooth",
  });
};

const Hero = () => {
  return (
    <>

      <section className="container mx-auto py-8 sm:py-12 md:py-16 lg:py-12 text-center relative overflow-hidden px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="mx-auto max-w-6xl relative z-10">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center">
            <Badge
              variant="secondary"
              className="gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border"
              onClick={handleBrowseBooksClick}
              style={{ cursor: 'pointer' }}
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="font-medium">100+ Books Available</span>
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="hidden sm:inline-flex items-center">
                Browse Now
              </span>
              <ArrowRight className="h-3 w-3" />
            </Badge>
          </div>

          {/* Main heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-1 sm:mb-3">
              <span className="font-medium transition-colors duration-300">
                Explore Your Next Favorite
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r bg-[200%_auto] bg-clip-text leading-tight text-transparent transition-all duration-300">
                Books Online
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0">
            Discover, search, and filter thousands of books across multiple genres.
            Stay updated with the latest arrivals and bestsellers.
            <span className="block">Powered by real-time scraping and clean APIs.</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button
              href="/books-showcase"
              size="lg"
              className="cursor-pointer gap-2 px-4 sm:px-8 py-3 text-sm sm:text-base font-medium shadow-lg transition-all duration-300 flex-1 sm:flex-none bg-slate-950 text-white hover:bg-slate-900"
              onClick={handleBrowseBooksClick}
            >
              <BookOpen className="h-4 sm:h-5 w-4 sm:w-5" />
              Browse Books
            </Button>

          </div>

          {/* Feature highlights */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-10">
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-lg w-full sm:w-auto bg-white/70 border border-gray-200/30">
              <div className="p-2 rounded-lg bg-blue-100">
                <Filter className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm">Advanced Filters</h3>
                <p className="text-xs text-gray-600">
                  Filter by genre, rating, stock status, and price
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-lg w-full sm:w-auto bg-white/70 border border-gray-200/30">
              <div className="p-2 rounded-lg bg-green-100">
                <BookOpen className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm">Easy Browsing</h3>
                <p className="text-xs text-gray-600">
                  View books in card or grid format with all key details
                </p>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Separator className="my-4 mx-auto w-full max-w-2xl bg-gray-200 opacity-50 border-1 h-px " />
    </>
  );
};

export default Hero;
