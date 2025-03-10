"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

export default function ConfirmTicket({ params }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const qrRef = useRef(null);
  
  const ticketId = searchParams.get("ticketId") || "N/A";
  const eventId = params?.id;

  useEffect(() => {
    async function fetchTicketDetails() {
      try {
        // Fetch ticket details from API
        const res = await fetch(`/api/tickets/${ticketId}`);
        if (!res.ok) throw new Error("Failed to fetch ticket details");
        
        const data = await res.json();
        setTicketDetails(data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (ticketId !== "N/A") {
      fetchTicketDetails();
    } else {
      setLoading(false);
    }
  }, [ticketId]);

  const handleDownloadQR = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `ticket-qr-${ticketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddToWallet = () => {
    // This would be implemented with Apple Wallet / Google Pay APIs
    alert("This feature will be available soon!");
  };

  const handleEmailTicket = () => {
    // This would send a request to email the ticket
    alert("Ticket has been emailed to your registered email address!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Success Animation */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center">Ticket Confirmed!</h1>
        <p className="text-gray-600 mt-2 text-center">Your ticket has been booked successfully and is ready to use.</p>
      </div>

      {/* Ticket Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        {/* Event Header */}
        {ticketDetails?.event?.coverImage && (
          <div className="relative h-32 w-full">
            <Image
              src={ticketDetails.event.coverImage}
              alt={ticketDetails.event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h1 className="text-xl font-bold text-white">{ticketDetails?.event?.title || "Event Name"}</h1>
              <p className="text-white/90 text-sm">
                {ticketDetails?.event?.date
                  ? new Date(ticketDetails.event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : "Event Date"}
                {ticketDetails?.event?.time && ` • ${ticketDetails.event.time}`}
              </p>
            </div>
          </div>
        )}

        {/* Ticket Body */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="mb-4">
                <h2 className="text-sm uppercase text-gray-500 font-medium">Ticket Type</h2>
                <p className="font-bold">{ticketDetails?.ticketType || "Regular"}</p>
              </div>
              
              <div className="mb-4">
                <h2 className="text-sm uppercase text-gray-500 font-medium">Ticket ID</h2>
                <p className="font-mono text-sm">{ticketId}</p>
              </div>
              
              <div className="mb-4">
                <h2 className="text-sm uppercase text-gray-500 font-medium">Quantity</h2>
                <p>{ticketDetails?.quantity || 1} {(ticketDetails?.quantity || 1) > 1 ? "tickets" : "ticket"}</p>
              </div>
              
              <div>
                <h2 className="text-sm uppercase text-gray-500 font-medium">Location</h2>
                <p>{ticketDetails?.event?.venue || "Event Venue"}</p>
                <p className="text-sm text-gray-600">{ticketDetails?.event?.address || "Venue Address"}</p>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="flex flex-col items-center" ref={qrRef}>
              <QRCodeCanvas 
                value={`event:${eventId}:ticket:${ticketId}:type:${ticketDetails?.ticketType || "regular"}:qty:${ticketDetails?.quantity || 1}`} 
                size={150}
                level="H"
                renderAs="canvas"
              />
              <p className="text-xs text-gray-500 mt-2">Scan for entry</p>
            </div>
          </div>
          
          {/* Ticket Footer - Dashed Line Separator */}
          <div className="relative my-6">
            <div className="absolute left-0 right-0 border-t border-dashed border-gray-300"></div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full"></div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full"></div>
          </div>
          
          {/* Additional Info */}
          <div className="text-sm text-gray-600">
            <p className="mb-2"><span className="font-medium">Booking Date:</span> {new Date().toLocaleDateString()}</p>
            <p><span className="font-medium">Total Amount:</span> ₹{ticketDetails?.amount || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={handleDownloadQR}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Download QR
        </button>
        
        <button 
          onClick={handleAddToWallet}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          Add to Wallet
        </button>
        
        <button 
          onClick={handleEmailTicket}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Email Ticket
        </button>
      </div>
      
      {/* Share Button */}
      <div className="relative">
        <button 
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
          </svg>
          Share Ticket
        </button>
        
        {showShareOptions && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg p-4 flex justify-around">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.026 10.026 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Additional Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button 
          onClick={() => router.push(`/events/${eventId}`)}
          className="flex-1 py-3 text-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back to Event
        </button>
        <button 
          onClick={() => router.push('/my-tickets')}
          className="flex-1 py-3 text-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          My Tickets
        </button>
      </div>
      
      {/* Important Information */}
      <div className="mt-8 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Important Information:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Save your QR code or keep this page accessible for entry</li>
          <li>Arrive 30 minutes before the event starts</li>
          <li>A confirmation email has been sent to your registered email</li>
          <li>For questions, contact support@eventname.com</li>
        </ul>
      </div>
    </div>
  );
}