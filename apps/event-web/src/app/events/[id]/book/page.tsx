"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BookTicket({ params }) {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState("regular");
  const router = useRouter();

  const ticketTypes = {
    regular: { price: 500, name: "Regular" },
    vip: { price: 1200, name: "VIP" },
    premium: { price: 2000, name: "Premium" }
  };

  // Calculate total price based on quantity and ticket type
  const calculateTotal = () => {
    return ticketTypes[selectedTicketType].price * quantity;
  };

  useEffect(() => {
    // Fetch event details
    async function fetchEventDetails() {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        const data = await res.json();
        setEventDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        setLoading(false);
      }
    }

    fetchEventDetails();
  }, [params.id]);

  useEffect(() => {
    // Create order when ticket type or quantity changes
    async function createOrder() {
      if (!eventDetails) return;
      
      setLoading(true);
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: params.id,
            amount: calculateTotal(),
            ticketType: selectedTicketType,
            quantity: quantity
          }),
        });
        
        const data = await res.json();
        setOrderId(data.orderId);
        setLoading(false);
      } catch (error) {
        console.error("Failed to create order:", error);
        setLoading(false);
      }
    }
    
    if (eventDetails) {
      createOrder();
    }
  }, [params.id, selectedTicketType, quantity, eventDetails]);

  const handlePayment = async () => {
    if (!orderId) return alert("Failed to create order. Please try again.");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: calculateTotal() * 100,
      currency: "INR",
      name: eventDetails?.title || "Event Ticket",
      description: `${ticketTypes[selectedTicketType].name} Ticket for ${eventDetails?.title || "the event"}`,
      order_id: orderId,
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#3B82F6",
      },
      modal: {
        ondismiss: function() {
          console.log("Payment dismissed");
        }
      },
      handler: async function (response) {
        setLoading(true);
        try {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              ticketType: selectedTicketType,
              quantity: quantity,
              eventId: params.id
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push(`/events/${params.id}/confirm?ticketId=${verifyData.ticketId}`);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("An error occurred during payment verification");
        } finally {
          setLoading(false);
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (loading && !eventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        {/* Event Header */}
        {eventDetails?.coverImage && (
          <div className="relative h-64 w-full">
            <Image
              src={eventDetails.coverImage}
              alt={eventDetails.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white">{eventDetails.title}</h1>
              <p className="text-white/90">
                {new Date(eventDetails.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                {eventDetails.time && ` • ${eventDetails.time}`}
              </p>
            </div>
          </div>
        )}

        {/* Ticket Selection */}
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Ticket Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(ticketTypes).map(([type, details]) => (
                <div 
                  key={type}
                  onClick={() => setSelectedTicketType(type)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedTicketType === type 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{details.name}</h3>
                    <div className={`h-5 w-5 rounded-full border ${
                      selectedTicketType === type 
                        ? 'border-blue-600 bg-blue-600' 
                        : 'border-gray-300'
                    }`}>
                      {selectedTicketType === type && (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xl font-bold mt-2">₹{details.price}</p>
                  {type === 'vip' && <p className="text-sm text-gray-600 mt-1">Priority seating + Welcome drink</p>}
                  {type === 'premium' && <p className="text-sm text-gray-600 mt-1">Front row + Welcome drink + Meet & Greet</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quantity</h2>
            <div className="flex items-center">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="h-10 w-10 rounded-l-md bg-gray-100 flex items-center justify-center border border-gray-300"
                disabled={quantity <= 1}
              >
                <span className="text-xl">-</span>
              </button>
              <div className="h-10 w-16 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button 
                onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-r-md bg-gray-100 flex items-center justify-center border border-gray-300"
                disabled={quantity >= 10}
              >
                <span className="text-xl">+</span>
              </button>
              <p className="ml-4 text-gray-600">Maximum 10 tickets per transaction</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>{ticketTypes[selectedTicketType].name} Ticket x {quantity}</span>
              <span>₹{ticketTypes[selectedTicketType].price * quantity}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Platform Fee</span>
              <span>₹49</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>GST (18%)</span>
              <span>₹{Math.round((ticketTypes[selectedTicketType].price * quantity + 49) * 0.18)}</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{calculateTotal() + 49 + Math.round((ticketTypes[selectedTicketType].price * quantity + 49) * 0.18)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <button 
          onClick={() => router.back()}
          className="w-full md:w-auto px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Go Back
        </button>
        <button 
          onClick={handlePayment} 
          disabled={loading || !orderId}
          className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-blue-400"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
          ) : null}
          Pay ₹{calculateTotal() + 49 + Math.round((ticketTypes[selectedTicketType].price * quantity + 49) * 0.18)}
        </button>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Important Information:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tickets are non-refundable once purchased</li>
          <li>Please arrive 30 minutes before the event starts</li>
          <li>Ticket confirmation will be sent to your email</li>
          <li>For any queries, contact support@eventname.com</li>
        </ul>
      </div>
    </div>
  );
}