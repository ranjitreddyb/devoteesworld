import api from './api';

interface RazorpayOptions {
  key: string;
  order_id: string;
  customer_notification: number;
  handler: (response: any) => void;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
}

interface CreateOrderData {
  userId: string;
  eventId: string;
  poojaIds: string[];
  amount: number;
}

export const paymentService = {
  // Create Razorpay order
  createOrder: (data: CreateOrderData) =>
    api.post('/v1/payments/create-order', data),

  // Verify payment signature
  verifyPayment: (paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) =>
    api.post('/v1/payments/verify', paymentData),

  // Refund payment (for GrievanceEngine)
  refund: (paymentId: string, amount: number) =>
    api.post('/v1/payments/refund', { paymentId, amount }),

  // Get payment details
  getPaymentDetails: (orderId: string) =>
    api.post(`/v1/payments/get-details/${orderId}`),

  // Create booking after payment
  createBooking: (bookingData: any) =>
    api.post('/v1/bookings/create', bookingData),

  // Get user bookings
  getUserBookings: (userId: string) =>
    api.get(`/v1/bookings/user/${userId}`),

  // Get booking details
  getBookingDetails: (bookingId: string) =>
    api.get(`/v1/bookings/${bookingId}`),

  // Initialize Razorpay Checkout
  initializeRazorpay: (options: RazorpayOptions) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        resolve(rzp);
      };
      script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
      document.body.appendChild(script);
    });
  },
};
