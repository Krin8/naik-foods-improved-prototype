"use client";
import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import RecentlyViewed from "@/components/RecentlyViewed";

export default function StoreClient({ initialProducts }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const regionParam = searchParams.get("region") || "all";
  const priceParam = searchParams.get("price") || "all";

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("popular");
  const [regionFilter, setRegionFilter] = useState(regionParam);
  const [priceFilter, setPriceFilter] = useState(priceParam);
  const [visibleCount, setVisibleCount] = useState(12);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const displayCategories = useMemo(() => {
    return categories.map(c => ({
      ...c,
      count: c.id === "all" ? initialProducts.length : initialProducts.filter(p => p.category === c.id).length
    })).filter(c => c.count > 0 || c.id === "all");
  }, [initialProducts]);

  const uniqueRegions = useMemo(() => {
    const regions = new Set(initialProducts.map(p => p.region).filter(Boolean));
    return Array.from(regions).sort();
  }, [initialProducts]);

  const handleFilterChange = (type, value) => {
    setVisibleCount(12);
    const params = new URLSearchParams(searchParams);
    
    if (type === 'category') {
      setActiveCategory(value);
      if (value === "all") params.delete("category");
      else params.set("category", value);
    } else if (type === 'region') {
      setRegionFilter(value);
      if (value === "all") params.delete("region");
      else params.set("region", value);
    } else if (type === 'price') {
      setPriceFilter(value);
      if (value === "all") params.delete("price");
      else params.set("price", value);
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory);
    }

    if (regionFilter !== "all") {
      result = result.filter(p => p.region === regionFilter);
    }

    if (priceFilter !== "all") {
      if (priceFilter === "under-200") result = result.filter(p => p.price < 200);
      else if (priceFilter === "200-500") result = result.filter(p => p.price >= 200 && p.price <= 500);
      else if (priceFilter === "over-500") result = result.filter(p => p.price > 500);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // popular
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [activeCategory, regionFilter, priceFilter, sortBy, initialProducts]);

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
          {displayCategories.map(cat => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => handleFilterChange('category', cat.id)}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="store-results-header" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div className="store-results-count" style={{ flex: "1 1 100%" }}>
            Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
          </div>
          
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <select value={regionFilter} onChange={(e) => handleFilterChange('region', e.target.value)} style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "white" }}>
              <option value="all">All Regions</option>
              {uniqueRegions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select value={priceFilter} onChange={(e) => handleFilterChange('price', e.target.value)} style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "white" }}>
              <option value="all">Any Price</option>
              <option value="under-200">Under ₹200</option>
              <option value="200-500">₹200 - ₹500</option>
              <option value="over-500">Over ₹500</option>
            </select>
          </div>

          <div className="store-sort">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "white" }}>
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
