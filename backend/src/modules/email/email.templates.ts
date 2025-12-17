export const emailTemplates = {
  welcome: (data: any) => ({
    subject: '🎉 Welcome to DevoteeWorld!',
    text: `Hello ${data.name}, Welcome to DevoteeWorld! We're excited to have you join our community.`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🙏 Welcome to DevoteeWorld</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${data.name}</strong>,</p>
              <p>Thank you for joining DevoteeWorld! We're thrilled to have you as part of our community.</p>
              <p>With DevoteeWorld, you can:</p>
              <ul>
                <li>Discover and book spiritual events near you</li>
                <li>Make offerings and donations with ease</li>
                <li>Connect with like-minded devotees</li>
                <li>Track your spiritual journey</li>
              </ul>
              <a href="${data.appUrl}" class="button">Start Exploring</a>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Warm regards,<br><strong>DevoteeWorld Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 DevoteeWorld. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  bookingConfirmation: (data: any) => ({
    subject: `✅ Booking Confirmed - ${data.eventName}`,
    text: `Your booking for ${data.eventName} on ${data.eventDate} is confirmed. Booking ID: ${data.bookingId}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #28a745; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .details { background: white; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
            .value { color: #333; }
            .button { background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Booking Confirmed</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${data.userName}</strong>,</p>
              <p>Your booking has been confirmed! Here are your details:</p>
              
              <div class="details">
                <div class="detail-row">
                  <span class="label">Event:</span>
                  <span class="value">${data.eventName}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Date & Time:</span>
                  <span class="value">${data.eventDate} ${data.eventTime}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Location:</span>
                  <span class="value">${data.eventLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Booking ID:</span>
                  <span class="value"><strong>${data.bookingId}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="label">Selected Poojas:</span>
                  <span class="value">${data.selectedPoojas?.join(', ') || 'N/A'}</span>
                </div>
              </div>

              <p><strong>Payment Status:</strong> ${data.paymentStatus || 'Pending'}</p>
              
              <p>Please save your booking ID for reference. You can manage your bookings anytime from your account.</p>
              
              <a href="${data.appUrl}/bookings/${data.bookingId}" class="button">View Booking Details</a>
              
              <p>Questions? Contact us at support@devoteesworld.com</p>
              <p>Warm regards,<br><strong>DevoteeWorld Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 DevoteeWorld. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  paymentSuccess: (data: any) => ({
    subject: `💳 Payment Successful - ₹${data.amount}`,
    text: `Your payment of ₹${data.amount} has been processed successfully. Transaction ID: ${data.transactionId}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #17a2b8; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .amount-box { background: white; border: 2px solid #17a2b8; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .amount-box .currency { font-size: 24px; font-weight: bold; color: #17a2b8; }
            .details { background: white; border-left: 4px solid #17a2b8; padding: 15px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
            .value { color: #333; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💳 Payment Successful</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${data.userName}</strong>,</p>
              <p>Your payment has been processed successfully!</p>
              
              <div class="amount-box">
                <div class="currency">₹${data.amount}</div>
                <p style="margin: 0; color: #666;">Amount Paid</p>
              </div>

              <div class="details">
                <div class="detail-row">
                  <span class="label">Transaction ID:</span>
                  <span class="value">${data.transactionId}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Order ID:</span>
                  <span class="value">${data.orderId}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Date & Time:</span>
                  <span class="value">${data.timestamp}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Purpose:</span>
                  <span class="value">${data.purpose || 'Event Booking'}</span>
                </div>
              </div>

              <p>A receipt has been sent to your email. You can download and print it for your records.</p>
              <p>Thank you for your transaction!</p>
              <p>Warm regards,<br><strong>DevoteeWorld Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 DevoteeWorld. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  paymentFailure: (data: any) => ({
    subject: `❌ Payment Failed - Action Required`,
    text: `Your payment of ₹${data.amount} could not be processed. Please try again.`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .warning { background: #fff3cd; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; }
            .button { background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>❌ Payment Failed</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${data.userName}</strong>,</p>
              <p>Unfortunately, your payment could not be processed.</p>
              
              <div class="warning">
                <p><strong>Amount:</strong> ₹${data.amount}</p>
                <p><strong>Reason:</strong> ${data.failureReason || 'Transaction declined'}</p>
              </div>

              <p>Please try again or use a different payment method. Your booking will be confirmed once payment is successful.</p>
              
              <a href="${data.appUrl}/retry-payment?orderId=${data.orderId}" class="button">Retry Payment</a>
              
              <p>Need help? Contact us at support@devoteesworld.com</p>
              <p>Warm regards,<br><strong>DevoteeWorld Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 DevoteeWorld. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  adminNotification: (data: any) => ({
    subject: `🔔 New Booking - ${data.eventName}`,
    text: `New booking received from ${data.userName} for ${data.eventName}. Booking ID: ${data.bookingId}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .details { background: white; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
            .value { color: #333; }
            .button { background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Booking Alert</h1>
            </div>
            <div class="content">
              <p>A new booking has been received:</p>
              
              <div class="details">
                <div class="detail-row">
                  <span class="label">User:</span>
                  <span class="value">${data.userName}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Email:</span>
                  <span class="value">${data.userEmail}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Event:</span>
                  <span class="value">${data.eventName}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Booking ID:</span>
                  <span class="value"><strong>${data.bookingId}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="label">Amount:</span>
                  <span class="value">₹${data.amount}</span>
                </div>
              </div>

              <a href="${data.appUrl}/admin/bookings/${data.bookingId}" class="button">View Details</a>
              
              <p>Log in to your admin panel to manage this booking.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  eventReminder: (data: any) => ({
    subject: `📅 Reminder: ${data.eventName} - Tomorrow!`,
    text: `Reminder: ${data.eventName} is happening tomorrow at ${data.eventTime}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff9800; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .event-card { background: white; border: 2px solid #ff9800; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .event-name { font-size: 20px; font-weight: bold; color: #ff9800; margin-bottom: 10px; }
            .detail { padding: 8px 0; }
            .label { font-weight: bold; color: #666; }
            .button { background: #ff9800; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 Event Reminder</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${data.userName}</strong>,</p>
              <p>This is a friendly reminder about your upcoming event:</p>
              
              <div class="event-card">
                <div class="event-name">${data.eventName}</div>
                <div class="detail"><span class="label">Date:</span> ${data.eventDate}</div>
                <div class="detail"><span class="label">Time:</span> ${data.eventTime}</div>
                <div class="detail"><span class="label">Location:</span> ${data.eventLocation}</div>
              </div>

              <p>We look forward to seeing you there! Make sure to arrive on time.</p>
              
              <a href="${data.appUrl}/bookings/${data.bookingId}" class="button">View Booking</a>
              
              <p>See you soon!<br><strong>DevoteeWorld Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};
