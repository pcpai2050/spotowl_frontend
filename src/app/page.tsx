"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "Popular Spots in Bangalore",
    listings: [
      {
        title: "Studio in Marathalli",
        price: "₹3,652 for 2 nights",
        rating: 5.0,
        badge: "Guest favourite",
        image: "/photo-1506744038136-46273834b3fb.avif",
      },
      {
        title: "House in Indiranagar",
        price: "₹5,124 for 2 nights",
        rating: 4.93,
        badge: "Guest favourite",
        image: "/photo-1465101046530-73398c7f28ca.avif",
      },
      {
        title: "Villa in Koramangala",
        price: "₹2,110 for 2 nights",
        rating: 4.86,
        badge: "Guest favourite",
        image: "/photo-1512918728675-ed5a9ecdebfd.avif",
      },
      {
        title: "Podcast Studio in Kalyan Nagar",
        price: "₹5,820 for 2 nights",
        rating: 4.83,
        badge: "Guest favourite",
        image: "/photo-1507089947368-19c1da9775ae.avif",
      },
      {
        title: "PreWedding Shoot Garden in Whitefield",
        price: "₹5,800 for 2 nights",
        rating: 4.8,
        badge: "Guest favourite",
        image: "/photo-1464037866556-6812c9d1c72e.avif",
      },
      {
        title: "Flat in Colva",
        price: "₹3,194 for 2 nights",
        rating: 4.94,
        badge: "Guest favourite",
        image: "/photo-1507525428034-b723cf961d3e.avif",
      },
      {
        title: "Apartment in Siolim",
        price: "₹7,304 for 2 nights",
        rating: 4.78,
        badge: "Guest favourite",
        image: "/photo-1465101178521-c1a9136a3b99.avif",
      },
    ],
  },
  {
    title: "Available in Mysore this weekend",
    listings: [
      {
        title: "House in Mysore",
        price: "₹4,000 for 2 nights",
        rating: 4.9,
        badge: "Guest favourite",
        image: "/photo-1506744038136-46273834b3fb.avif",
      },
      {
        title: "Villa in Mysore",
        price: "₹6,200 for 2 nights",
        rating: 4.85,
        badge: "Guest favourite",
        image: "/photo-1465101046530-73398c7f28ca.avif",
      },
      {
        title: "Cottage in Mysore",
        price: "₹3,800 for 2 nights",
        rating: 4.8,
        badge: "Guest favourite",
        image: "/photo-1512918728675-ed5a9ecdebfd.avif",
      },
      {
        title: "Apartment in Mysore",
        price: "₹5,100 for 2 nights",
        rating: 4.7,
        badge: "Guest favourite",
        image: "/photo-1507089947368-19c1da9775ae.avif",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="bg-[#F7F7F7] min-h-screen font-sans">
      {/* Sections */}
      {sections.map((section) => (
        <section key={section.title} className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#222222]">{section.title}</h2>
            <button className="text-gray-500 hover:text-black p-2 rounded-full">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {section.listings.map((listing) => (
              <Link key={listing.title} href={`/spot/${encodeURIComponent(listing.title.replace(/\s+/g, '-').toLowerCase())}`} className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col relative">
                <Image src={listing.image} alt={listing.title} width={260} height={192} className="w-full h-48 object-cover" loading="lazy" unoptimized />
                <div className="absolute top-3 left-3 bg-[#F7F7F7] text-xs font-bold px-4 py-1 rounded-full shadow text-black" style={{backdropFilter: 'blur(2px)'}}>{listing.badge}</div>
                <button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:bg-[#f3eafd]">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 17l-1.45-1.32C4.4 11.36 2 9.28 2 6.5 2 4.5 3.5 3 5.5 3c1.54 0 3.04 1 3.57 2.36h1.87C11.46 4 12.96 3 14.5 3 16.5 3 18 4.5 18 6.5c0 2.78-2.4 4.86-6.55 9.18L10 17z" stroke="#7440AD" strokeWidth="1.5" fill="none"/></svg>
                </button>
                <div className="p-4 flex flex-col flex-1">
                  <span className="font-semibold text-gray-900 text-base mb-1">{listing.title}</span>
                  <span className="text-gray-600 text-xs mb-1">{listing.price}</span>
                  <span className="text-yellow-500 font-bold flex items-center text-xs">★ {listing.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
