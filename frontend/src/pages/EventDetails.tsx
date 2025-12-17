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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/events/${id}`);
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
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    if (selectedPoojas.length === 0) {
      toast.error('Please select at least one pooja');
      return;
    }

    setBookingLoading(true);

    try {
      // Create order
      const orderResponse = await paymentService.createOrder({
        userId: user?.id || user?._id || '',
        eventId: id || '',
        poojaIds: selectedPoojas,
        amount: calculateTotal(),
      });

      console.log('📤 Order response:', orderResponse.data);

      if (!orderResponse.data.order_id) {
        throw new Error('No order ID received from backend');
      }

      const orderId = orderResponse.data.order_id;
      const razorpayKey = orderResponse.data.key;
      
      console.log('✅ Order created:', orderId);
      console.log('🔑 Razorpay key from backend:', razorpayKey);

      // Open Razorpay with key from backend
      await paymentService.initializeRazorpay({
        key: razorpayKey,
        order_id: orderId,
        customer_notification: 1,
        prefill: {
          name: user?.name || 'Guest',
          email: user?.email || '',
          contact: user?.phoneNumber || '',
        },
        handler: async (response: any) => {
          try {
            console.log('✅ Payment successful:', response);

            const verifyResponse = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              // ✅ Booking is already created by payment verification endpoint
              // No need to call createBooking again!
              
              toast.success('✅ Booking confirmed!');
              setTimeout(() => {
                navigate('/events');
              }, 2000);
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed');
          } finally {
            setBookingLoading(false);
          }
        },
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
        ⏳ Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
        Event not found
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgb(147, 51, 234), rgb(249, 115, 22))', paddingBottom: '2rem' }}>
      <div style={{ padding: '1rem 2rem' }}>
        <button
          onClick={() => navigate('/events')}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          ← Back to Events
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: 'rgb(31, 41, 55)' }}>
            🏛️ {event.title}
          </h1>
          <p style={{ margin: '0 0 1.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '1.125rem' }}>
            {event.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>📍 Venue</p>
              <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>{event.venue}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>📅 Date</p>
              <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
                {new Date(event.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>🕐 Time</p>
              <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
                {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>👥 Attendees</p>
              <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>0</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🕉️</span>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'rgb(31, 41, 55)' }}>Poojas Available</h2>
          </div>

          {event.poojas && event.poojas.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {event.poojas.map((pooja: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    background: selectedPoojas.includes(pooja.name) ? 'rgb(240, 253, 244)' : 'rgb(249, 250, 251)',
                    border: selectedPoojas.includes(pooja.name) ? '2px solid rgb(34, 197, 94)' : '2px solid rgb(229, 231, 235)',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onClick={() => handlePoojaToggle(pooja.name)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedPoojas.includes(pooja.name)}
                        onChange={() => {}}
                        style={{ marginRight: '1rem', cursor: 'pointer', width: '20px', height: '20px' }}
                      />
                      <span style={{ fontSize: '1.125rem', fontWeight: '600', color: 'rgb(31, 41, 55)' }}>
                        {pooja.name}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 0.25rem 0', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                        ⏱️ {pooja.durationMinutes} mins
                      </p>
                      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: 'rgb(249, 115, 22)' }}>
                        ₹{pooja.price}
                      </p>
                    </div>
                  </div>
                  {pooja.significance && (
                    <p style={{ margin: '0.75rem 0 0 2rem', color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>
                      {pooja.significance}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'rgb(107, 114, 128)' }}>No poojas available</p>
          )}
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'rgb(31, 41, 55)' }}>📋 Booking Summary</h3>

          {selectedPoojas.length === 0 ? (
            <p style={{ color: 'rgb(107, 114, 128)' }}>No poojas selected</p>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                {selectedPoojas.map((poojaName, idx) => {
                  const pooja = event.poojas.find((p: any) => p.name === poojaName);
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>{poojaName}</span>
                      <span style={{ fontWeight: '600' }}>₹{pooja.price}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ borderTop: '2px solid rgb(229, 231, 235)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span style={{ color: 'rgb(249, 115, 22)' }}>₹{calculateTotal()}</span>
              </div>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={selectedPoojas.length === 0 || bookingLoading}
            style={{
              width: '100%',
              padding: '1rem',
              marginTop: '1.5rem',
              background: selectedPoojas.length === 0 || bookingLoading ? 'rgb(200, 200, 200)' : 'linear-gradient(to right, rgb(249, 115, 22), rgb(147, 51, 234))',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: selectedPoojas.length === 0 || bookingLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {bookingLoading ? '⏳ Processing...' : '💳 Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
