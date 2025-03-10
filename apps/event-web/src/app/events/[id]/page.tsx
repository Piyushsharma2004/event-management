"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Tag, Share2, Heart, ChevronLeft, Info, Ticket } from "lucide-react";

export default function EventDetails({ params }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) router.push("/events");
        else setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Info className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium">Event not found</h3>
          <p className="text-gray-500 mt-1">This event may have been removed or is no longer available</p>
          <Link href="/events">
            <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition">
              Back to Events
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // For demo purposes - normally these would come from the API
  const eventWithDefaults = {
    ...event,
    image: event.image || null,
    time: event.time || "6:00 PM - 9:00 PM",
    location: event.location || "Main Campus Auditorium",
    organizer: event.organizer || { name: event.club || "University Club", logo: null },
    category: event.category || "Workshop",
    registeredCount: event.registeredCount || 42,
    totalSpots: event.totalSpots || 100,
    description: event.description || "Join us for this exciting event! Experience an evening filled with engaging activities, networking opportunities, and more. Don't miss this chance to learn and connect with fellow students and professionals.",
    highlights: event.highlights || [
      "Interactive sessions with industry experts",
      "Networking opportunities with peers and professionals",
      "Refreshments will be provided",
      "Certificate of participation"
    ],
    speakers: event.speakers || [
      { name: "Dr. Jane Smith", role: "Professor of Computer Science", image: null },
      { name: "John Davis", role: "Industry Expert", image: null }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/events">
            <button className="flex items-center text-gray-600 hover:text-indigo-600 transition">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Events
            </button>
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 text-white">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
                <Tag className="w-4 h-4 mr-2" />
                {eventWithDefaults.category}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">{eventWithDefaults.name}</h1>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 opacity-70" />
                  <div>
                    <p className="text-white/70">Date</p>
                    <p className="font-medium">{eventWithDefaults.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 opacity-70" />
                  <div>
                    <p className="text-white/70">Time</p>
                    <p className="font-medium">{eventWithDefaults.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 opacity-70" />
                  <div>
                    <p className="text-white/70">Location</p>
                    <p className="font-medium">{eventWithDefaults.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Ticket className="w-5 h-5 mr-3 opacity-70" />
                  <div>
                    <p className="text-white/70">Price</p>
                    <p className="font-medium">{eventWithDefaults.price === 0 ? "Free" : `₹${eventWithDefaults.price}`}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/events/${eventWithDefaults.id}/book`}>
                  <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition">
                    {eventWithDefaults.price === 0 ? "Register Now" : "Book Ticket"}
                  </button>
                </Link>
                
                <button 
                  className={`flex items-center px-4 py-3 border-2 ${liked ? 'bg-white/10 border-white' : 'border-white/40'} rounded-lg hover:bg-white/10 transition`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-white' : ''}`} />
                  {liked ? 'Saved' : 'Save'}
                </button>
                
                <button className="flex items-center px-4 py-3 border-2 border-white/40 rounded-lg hover:bg-white/10 transition">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/3 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white self-start">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                  {eventWithDefaults.organizer.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white/70 text-sm">Organized by</p>
                  <p className="font-medium">{eventWithDefaults.organizer.name}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70">Available spots</span>
                  <span className="font-medium">{eventWithDefaults.totalSpots - eventWithDefaults.registeredCount}/{eventWithDefaults.totalSpots}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${(eventWithDefaults.registeredCount / eventWithDefaults.totalSpots) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  {eventWithDefaults.registeredCount} people registered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {eventWithDefaults.description}
              </p>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Event Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {eventWithDefaults.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {eventWithDefaults.speakers.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {eventWithDefaults.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-400 mr-4">
                        {speaker.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{speaker.name}</h3>
                        <p className="text-gray-600">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                {/* Map would go here */}
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold">{eventWithDefaults.location}</h3>
              <p className="text-gray-600">University Campus, Building 3</p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Registration</h2>
              
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold text-lg">
                  {eventWithDefaults.price === 0 ? "Free" : `₹${eventWithDefaults.price}`}
                </span>
              </div>
              
              <div className="py-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Available spots</span>
                  <span>{eventWithDefaults.totalSpots - eventWithDefaults.registeredCount}/{eventWithDefaults.totalSpots}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(eventWithDefaults.registeredCount / eventWithDefaults.totalSpots) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-indigo-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-indigo-900 font-medium">Registration ends soon</p>
                    <p className="text-indigo-700 text-sm">Register before spots fill up!</p>
                  </div>
                </div>
              </div>
              
              <Link href={`/events/${eventWithDefaults.id}/book`}>
                <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition">
                  {eventWithDefaults.price === 0 ? "Register Now" : "Book Ticket"}
                </button>
              </Link>
              
              <button 
                className={`mt-3 w-full py-3 border ${liked ? 'bg-indigo-50 border-indigo-600 text-indigo-600' : 'border-gray-300 text-gray-600'} rounded-lg hover:bg-gray-50 transition flex items-center justify-center`}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                {liked ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Share this event</h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                    {/* Facebook icon would go here */}
                    <span className="font-bold text-blue-600">f</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                    {/* Twitter/X icon would go here */}
                    <span className="font-bold">𝕏</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                    {/* LinkedIn icon would go here */}
                    <span className="font-bold text-blue-700">in</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Events */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Similar Events</h2>
          <Link href="/events">
            <span className="text-indigo-600 hover:underline">View all</span>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="h-40 bg-gray-200 relative">
                {/* Event image would go here */}
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {eventWithDefaults.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Mar {15 + item}, 2025</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Similar Event {item}</h3>
                <div className="flex items-center gap-1 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>University Campus</span>
                </div>
                <Link href={`/events/${101 + item}`}>
                  <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}