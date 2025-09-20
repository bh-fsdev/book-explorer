import React from "react";
import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Home from "./components/Home";
import BookDetail from "./components/detailsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Home />
            </>
          }
        />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
}

export default App;
