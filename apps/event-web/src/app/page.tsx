"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Search, Users, Star, Bell } from "lucide-react";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Academic", count: 24 },
    { id: 2, name: "Social", count: 18 },
    { id: 3, name: "Sports", count: 15 },
    { id: 4, name: "Arts", count: 12 },
    { id: 5, name: "Career", count: 10 },
  ]);
  
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section - Enhanced with search bar */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative text-center max-w-4xl px-6 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight dark:text-red-500 text-white">
            Discover & Experience Amazing Events
          </h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Join university events, workshops, and festivals that match your interests
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex bg-white/10 backdrop-blur-md p-2 rounded-xl">
              <input 
                type="text" 
                placeholder="Search for events..." 
                className="w-full bg-transparent border-none text-white placeholder-white/70 focus:outline-none px-4"
              />
              <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-100 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/events">
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-100 transition flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Browse Events
              </button>
            </Link>
            <Link href="/clubs">
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition flex items-center gap-2">
                <Users className="w-5 h-5" />
                Explore Clubs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect events that match your interests and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link href={`/category/${category.id}`} key={category.id}>
              <div className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg hover:scale-105 transition cursor-pointer border border-gray-100">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-indigo-600 font-medium">{category.count} events</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Events - Enhanced with more details */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <p className="text-gray-600 mt-2">Don't miss out on these popular events</p>
          </div>
          <Link href="/events">
            <span className="text-indigo-600 font-medium hover:underline">View all →</span>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                {/* Event image would go here */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {event.category || "Workshop"}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3 gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date || "Mar 15, 2025"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time || "3:00 PM"}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition">{event.name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{event.description || "Join us for this exciting event with amazing speakers and activities."}</p>
                <div className="flex items-center gap-2 mt-4 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location || "Main Campus Auditorium"}</span>
                </div>
                <Link href={`/events/${event.id}`}>
                  <button className="mt-5 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Clubs - Enhanced with images */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Join Your Favorite Clubs</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Connect with like-minded individuals and participate in club activities
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Tech Club", description: "Join exciting tech events & hackathons", members: 120, events: 8 },
              { name: "Music Club", description: "Showcase your talent and enjoy live performances", members: 85, events: 5 },
              { name: "Entrepreneurship Club", description: "Network with founders and learn business skills", members: 95, events: 6 }
            ].map((club) => (
              <div key={club.name} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                    {/* Club icon would go here */}
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Users className="w-3 h-3" /> {club.members}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mt-4">{club.name}</h3>
                <p className="text-gray-600 mt-2">{club.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{club.events} upcoming events</span>
                  <Link href={`/clubs/${club.name.toLowerCase().replace(" ", "-")}`}>
                    <button className="text-indigo-600 hover:underline text-sm font-medium">
                      Learn more →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - New Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Students Say</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Hear from students who've attended our events and joined our community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Computer Science, Year 3",
              quote: "The Tech Week hackathon was one of the best experiences of my university life. I met amazing people and learned so much!"
            },
            {
              name: "Sarah Williams",
              role: "Business Admin, Year 2",
              quote: "Joining the Entrepreneurship Club opened so many doors for me. The networking events are incredible and well organized."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter - New Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Bell className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="mt-3 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss upcoming events and announcements
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-3 text-white/70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="py-16 bg-indigo-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold">Don't Miss Out!</h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Book your tickets now and experience the best university events. Early birds get special discounts!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/events">
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-100 transition">
                Explore Events
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - New Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Campus Events</h3>
              <p className="text-gray-400">
                Making university life more exciting with amazing events and community activities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
                <li><Link href="/clubs" className="hover:text-white transition">Clubs</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 4).map(cat => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.id}`} className="hover:text-white transition">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">
                Email: events@university.edu
              </p>
              <p className="text-gray-400">
                Phone: (123) 456-7890
              </p>
              <div className="flex gap-4 mt-4">
                {/* Social icons would go here */}
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition">
                  {/* Twitter/X icon would go here */}
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition">
                  {/* Instagram icon would go here */}
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition">
                  {/* Facebook icon would go here */}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} University Events Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}