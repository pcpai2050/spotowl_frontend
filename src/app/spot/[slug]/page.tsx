import React from "react";
import Image from "next/image";
import Link from "next/link";

const mockSpot = {
  title: "Edwardian Craftsman",
  location: "Los Angeles, CA, USA",
  type: "House",
  price: 125,
  guests: 12,
  bedrooms: 2,
  bathrooms: 2,
  images: [
    "/photo-1506744038136-46273834b3fb.avif",
    "/photo-1465101046530-73398c7f28ca.avif",
    "/photo-1512918728675-ed5a9ecdebfd.avif",
    "/photo-1507089947368-19c1da9775ae.avif",
  ],
  description: "A beautiful Edwardian home in original 1920's condition, meticulously maintained, woodwork, vintage tile and hardware, and original built-ins.",
  details: [
    { label: "Property type", value: "House" },
    { label: "Guests", value: "Up to 12" },
    { label: "Number of bedrooms", value: "2" },
    { label: "Number of bathrooms", value: "2" },
    { label: "Year built", value: "1921" },
    { label: "Main floor area", value: "2,200 sq ft" },
  ],
  features: ["WiFi", "Driveway", "Fireplace", "Washer/Dryer", "Backyard", "Pool"],
  reviews: [
    { name: "Kathrine G.", rating: 5, text: "Amazing location and host!" },
    { name: "Natalia G.", rating: 5, text: "Average location / location was ok." },
    { name: "Samuel M.", rating: 5, text: "Best location and Michael was a great host!" },
  ],
  host: {
    name: "Michael S.",
    avatar: "/spotowl-logo.png",
    description: "Always communicate through SpotOwl. To protect your payment, never transfer money or communicate outside of the SpotOwl website or app.",
  },
  map: "/map-placeholder.png",
  similar: [
    { title: "Spacious Suburban Home", image: "/photo-1507525428034-b723cf961d3e.avif", price: 99 },
    { title: "Downtown LA Shotgun House", image: "/photo-1464037866556-6812c9d1c72e.avif", price: 120 },
    { title: "Hill-wood Pool Getaway", image: "/photo-1465101178521-c1a9136a3b99.avif", price: 150 },
  ],
};

export default function SpotDetailsPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen font-sans">
      {/* Compact/Full Search Bar (client component) */}
      {/* <SpotSearchBar /> */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <Image src={mockSpot.images[0]} alt={mockSpot.title} width={800} height={500} className="rounded-2xl w-full h-[340px] object-cover" unoptimized />
          </div>
          <div className="flex flex-col gap-4">
            {mockSpot.images.slice(1).map((img, i) => (
              <Image key={img} src={img} alt={mockSpot.title + " " + (i+2)} width={400} height={110} className="rounded-2xl w-full h-[110px] object-cover" unoptimized />
            ))}
          </div>
        </div>
        {/* Main Info Row */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-[#222] mb-2">{mockSpot.title}</h1>
            <div className="flex items-center gap-2 text-[#7440AD] font-semibold mb-4">
              <span>{mockSpot.location}</span>
              <span className="text-gray-400">·</span>
              <span>{mockSpot.type}</span>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1 text-gray-700"><span className="font-bold">{mockSpot.guests}</span> Guests</div>
              <div className="flex items-center gap-1 text-gray-700"><span className="font-bold">{mockSpot.bedrooms}</span> Bedrooms</div>
              <div className="flex items-center gap-1 text-gray-700"><span className="font-bold">{mockSpot.bathrooms}</span> Bathrooms</div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About the Space</h2>
              <p className="text-gray-700 leading-relaxed">{mockSpot.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                {mockSpot.details.map((d) => (
                  <li key={d.label}><span className="font-semibold">{d.label}:</span> {d.value}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <div className="flex flex-wrap gap-2">
                {mockSpot.features.map(f => (
                  <span key={f} className="bg-[#f3eafd] text-[#7440AD] px-3 py-1 rounded-full text-sm font-semibold">{f}</span>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Reviews</h2>
              <div className="space-y-4">
                {mockSpot.reviews.map(r => (
                  <div key={r.name} className="bg-white rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#7440AD] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">{r.name[0]}</span>
                      <span className="font-semibold text-gray-900">{r.name}</span>
                    </div>
                    <span className="text-yellow-500 font-bold">★ {r.rating}</span>
                    <span className="text-gray-700">{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-[#7440AD]">${mockSpot.price}</span>
                <span className="text-gray-600">per hour</span>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Date</label>
                <input type="date" className="w-full border rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Guests</label>
                <input type="number" min={1} max={mockSpot.guests} defaultValue={1} className="w-full border rounded px-3 py-2" />
              </div>
              <button className="w-full bg-[#7440AD] text-white font-bold py-3 rounded-xl hover:bg-[#5e338a] transition">Reserve</button>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
              <Image src={mockSpot.host.avatar} alt={mockSpot.host.name} width={48} height={48} className="rounded-full" unoptimized />
              <div>
                <div className="font-bold text-gray-900">Hosted by {mockSpot.host.name}</div>
                <div className="text-xs text-gray-600">{mockSpot.host.description}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Map */}
        <div className="my-10">
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <Image src="/map-placeholder.png" alt="Map" width={900} height={220} className="rounded-2xl w-full h-[220px] object-cover" unoptimized />
        </div>
        {/* Similar Listings */}
        <div className="my-10">
          <h2 className="text-xl font-semibold mb-4">Similar Listings</h2>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {mockSpot.similar.map(listing => (
              <div key={listing.title} className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col relative">
                <Image src={listing.image} alt={listing.title} width={260} height={192} className="w-full h-48 object-cover" loading="lazy" unoptimized />
                <div className="p-4 flex flex-col flex-1">
                  <span className="font-semibold text-gray-900 text-base mb-1">{listing.title}</span>
                  <span className="text-gray-600 text-xs mb-1">${listing.price} per hour</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "flat-in-adsuli" },
    { slug: "apartment-in-chauri" },
    { slug: "guest-house-in-utorda" },
    { slug: "home-in-candolim" },
    { slug: "apartment-in-benaulim" },
    { slug: "flat-in-colva" },
    { slug: "apartment-in-siolim" },
    { slug: "house-in-mysore" },
    { slug: "villa-in-mysore" },
    { slug: "cottage-in-mysore" },
    { slug: "apartment-in-mysore" },
  ];
} 