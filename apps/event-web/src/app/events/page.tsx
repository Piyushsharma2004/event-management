"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Filter, Search, Users, Tag, ChevronDown } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ["All", "Academic", "Social", "Sports", "Arts", "Career"];

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      });
  }, []);

  useEffect(() => {
    let results = events;
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter(event => event.category === selectedCategory);
    }
    
    setFilteredEvents(results);
  }, [searchQuery, selectedCategory, events]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 px-6">
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Discover Events</h1>
          <p className="mt-2 text-white/80">Find and join exciting university events</p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-6 py-6 -mt-6">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition md:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Any date</option>
                    <option>Today</option>
                    <option>This week</option>
                    <option>This month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Any price</option>
                    <option>Free</option>
                    <option>Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Date (Upcoming)</option>
                    <option>Date (Recent)</option>
                    <option>Price (Low to High)</option>
                    <option>Price (High to Low)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Events List */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Results <span className="text-gray-800 text-lg font-normal">({filteredEvents.length} events)</span></h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">View:</span>
            <button className="p-2 rounded bg-indigo-100 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button className="p-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="12" x2="3" y2="12" />
                <line x1="21" y1="18" x2="3" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No events found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gray-200 md:h-auto h-32 relative">
                    {/* Event image would go here */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {event.category && (
                        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {event.category || "Workshop"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 flex-grow">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{event.date || "Mar 15, 2025"}</span>
                      {event.time && (
                        <>
                          <Clock className="w-4 h-4 ml-3 mr-1" />
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    
                    <div className="mt-1 flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Organized by {event.club || "University Club"}</span>
                    </div>
                    
                    {event.location && (
                      <div className="mt-1 flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-indigo-600 mr-1" />
                        <span className="font-medium">
                          {event.price === 0 ? "Free" : `₹${event.price}`}
                        </span>
                      </div>
                      <Link href={`/events/${event.id}`}>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {filteredEvents.length > 0 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-500">Previous</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50">3</button>
              <span className="px-2">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50">10</button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}