import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { paymentService } from '../services/paymentService';
import toast from 'react-hot-toast';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPoojas, setSelectedPoojas] = useState<string[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/events/${id}`);
      if (!response.ok) throw new Error('Event not found');
      const data = await response.json();
      setEvent(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Event not found');
      navigate('/events');
    }
  };

  const handlePoojaToggle = (poojaName: string) => {
    setSelectedPoojas(prev =>
      prev.includes(poojaName)
        ? prev.filter(p => p !== poojaName)
        : [...prev, poojaName]
    );
  };

  const calculateTotal = () => {
    if (!event) return 0;
    return event.poojas
      .filter((p: any) => selectedPoojas.includes(p.name))
      .reduce((sum: number, p: any) => sum + p.price, 0);
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }

    if (selectedPoojas.length === 0) {
      toast.error('Please select at least one pooja');
      return;
    }

    const total = calculateTotal();
    setBookingLoading(true);

    try {
      // Step 1: Create Razorpay Order
      const orderResponse = await paymentService.createOrder({
        userId: user?.id || user?.id || '',
        eventId: id || '',
        poojaIds: selectedPoojas,
        amount: total,
      });

      const { orderId, key } = orderResponse.data;

      // Step 2: Initialize Razorpay Checkout
      await paymentService.initializeRazorpay({
        key,
        order_id: orderId,
        customer_notification: 1,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phoneNumber || '',
        },
        handler: async (response: any) => {
          try {
            // Step 3: Verify Payment
            const verifyResponse = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              // Step 4: Create Booking
              const bookingData = {
                userId: user?.id || user?.id,
                eventId: id,
                poojaIds: selectedPoojas,
                paymentId: response.razorpay_payment_id,
                amount: total,
                poojaDetails: event.poojas.filter((p: any) =>
                  selectedPoojas.includes(p.name)
                ),
              };

              await paymentService.createBooking(bookingData);

              toast.success('✅ Payment successful! Booking confirmed!');
              setSelectedPoojas([]);
              
              // Redirect to bookings after 2 seconds
              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
            } else {
              toast.error('❌ Payment verification failed');
            }
          } catch (error: any) {
            toast.error(error.message || 'Payment verification failed');
          } finally {
            setBookingLoading(false);
          }
        },
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to initiate payment');
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Event not found</p>
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <button
        onClick={() => navigate('/events')}
        className="mb-6 px-4 py-2 text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
      >
        ← Back to Events
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Info */}
        <div className="lg:col-span-2">
          {/* Title & Meta */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{event.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-orange-50 p-4 rounded">
                <p className="text-sm text-gray-600">📅 Date</p>
                <p className="font-semibold">{new Date(event.startDate).toLocaleDateString()}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded">
                <p className="text-sm text-gray-600">⏰ Time</p>
                <p className="font-semibold">{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded">
                <p className="text-sm text-gray-600">📍 Venue</p>
                <p className="font-semibold">{event.venue}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded">
                <p className="text-sm text-gray-600">👥 Attendees</p>
                <p className="font-semibold">{event.attendees || 0}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                event.status === 'future' ? 'bg-green-100 text-green-800' :
                event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.status.toUpperCase()}
              </span>
              {event.isActive && (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  Active Bookings
                </span>
              )}
            </div>
          </div>

          {/* Poojas Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🕉️ Poojas Available</h2>
            <div className="space-y-4">
              {event.poojas.map((pooja: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{pooja.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{pooja.significance}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <span>⏱️ {pooja.durationMinutes} mins</span>
                        <span>💰 ₹{pooja.price}</span>
                      </div>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPoojas.includes(pooja.name)}
                        onChange={() => handlePoojaToggle(pooja.name)}
                        className="w-5 h-5 accent-orange-600"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card - Sticky */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-20">
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

            {/* Selected Poojas */}
            <div className="bg-gray-50 rounded p-4 mb-4 max-h-48 overflow-y-auto">
              {selectedPoojas.length === 0 ? (
                <p className="text-gray-500 text-sm">No poojas selected</p>
              ) : (
                <div className="space-y-2">
                  {selectedPoojas.map(poojaName => {
                    const pooja = event.poojas.find((p: any) => p.name === poojaName);
                    return (
                      <div key={poojaName} className="flex justify-between text-sm">
                        <span className="font-medium">{poojaName}</span>
                        <span>₹{pooja.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t-2 pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total:</span>
                <span className="text-2xl font-bold text-orange-600">₹{total}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={bookingLoading || selectedPoojas.length === 0}
              className="w-full px-4 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
            >
              {bookingLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>

            {/* Login Prompt */}
            {!isAuthenticated && (
              <p className="text-xs text-gray-600 text-center mt-3">
                <button
                  onClick={() => navigate('/login')}
                  className="text-orange-600 hover:underline"
                >
                  Login
                </button>
                {' '}to book this event
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
