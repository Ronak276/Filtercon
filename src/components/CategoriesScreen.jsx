import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, Star, Plus, ShieldCheck,
  Droplet, Check, Sparkles
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { Badge } from './ui/badge';

export default function CategoriesScreen({ onSelectProduct, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-16">
      {/* Top Header with Safe Top Padding to prevent Dynamic Island overlap */}
      <div className="px-5 pt-12 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#0F172A] leading-tight">Filtration Systems</h2>
          <p className="text-[11px] text-[#64748B]">Filtercon Certified Catalogue</p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 text-[#0F172A] px-2.5 py-1 rounded-xl text-xs font-medium">
          <span className="text-[#64748B] text-[11px]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent font-bold text-[#0284C7] text-xs outline-none cursor-pointer"
          >
            <option value="popular">Popular</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="w-4 h-4 text-[#0284C7] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search whole-house, RO, shower..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F0F9FF]/80 border border-sky-100 text-xs shadow-xs focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[#64748B] hover:text-[#0F172A]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Category Pill Tabs */}
      <div className="px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-[#0284C7] text-white shadow-sm shadow-sky-500/30'
                  : 'bg-white border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Product Grid (2 columns) */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-3 px-1">
          <span>Showing {filteredProducts.length} Systems</span>
          <span>Southern CA Certified</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod.id)}
              className="bg-white rounded-2xl border border-slate-100 p-2.5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-1.5 left-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] font-bold text-[#0F172A] flex items-center gap-0.5 shadow-xs">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  {prod.rating}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod, 1);
                  }}
                  className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                  title="Quick Add"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Model Tagline & Badge */}
              <div>
                <h4 className="text-[12px] font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#0284C7] transition-colors">
                  {prod.name}
                </h4>
                <p className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5">
                  {prod.tagline}
                </p>
              </div>

              {/* Action / View Specs Button without price */}
              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-50">
                <Badge variant="accent" className="text-[9px]">
                  {prod.badge}
                </Badge>
                <span className="text-[10px] font-bold text-[#0284C7] flex items-center gap-0.5">
                  Details <span className="text-xs">›</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
