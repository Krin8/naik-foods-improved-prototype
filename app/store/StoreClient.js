"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/products"; // Categories can stay static or be moved to DB
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import RecentlyViewed from "@/components/RecentlyViewed";

export default function StoreClient({ initialProducts }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(12);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        // Fallback for rating since it's not in DB schema yet
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // popular
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [activeCategory, sortBy, initialProducts]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <>
      <div className="store-hero">
        <h1>Our Store</h1>
        <p>Discover {initialProducts.length}+ authentic Maharashtrian products from across the region</p>
      </div>

      <div className="container">
        <div className="category-pills">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setVisibleCount(12);
              }}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="store-results-header">
          <div className="store-results-count">
            Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
          </div>
          <div className="store-sort">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">Sort: Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        {hasMore && (
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount(prev => prev + 12)}
          >
            Load More Products ({filteredProducts.length - visibleCount} remaining)
          </button>
        )}

        <RecentlyViewed />
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
