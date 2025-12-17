export function getMessageTemplate(
  templateName: string,
  language: string = 'en',
  userData: any = {},
): string {
  const templates = {
    'booking-confirmation': {
      en: () => `🙏 *Booking Confirmed*\n\nHi ${userData.name},\n\nYour booking for *${userData.eventName}* on ${userData.eventDate} is confirmed!\n\n📿 Poojas: ${userData.poojaNames?.join(', ')}\n💰 Amount: ₹${userData.totalAmount}\n📋 ID: ${userData.bookingId}\n\nThank you! 🙏`,
      hi: () => `🙏 *बुकिंग की गई*\n\nनमस्ते ${userData.name},\n\n*${userData.eventName}* की बुकिंग ${userData.eventDate} को पुष्टि हुई है!\n\n📿 पूजाएं: ${userData.poojaNames?.join(', ')}\n💰 राशि: ₹${userData.totalAmount}\n📋 ID: ${userData.bookingId}\n\nधन्यवाद! 🙏`,
    },
    'payment-success': {
      en: () => `✅ *Payment Successful*\n\nHi ${userData.name},\n\nPayment of ₹${userData.totalAmount} for ${userData.eventName} received!\n\n💳 ID: ${userData.transactionId}\n\nTicket ready. See you! 🙏`,
      hi: () => `✅ *भुगतान सफल*\n\nनमस्ते ${userData.name},\n\nआपका ₹${userData.totalAmount} का भुगतान प्राप्त हुआ!\n\n💳 ID: ${userData.transactionId}\n\nटिकट तैयार है। मिलेंगे! 🙏`,
    },
    'payment-failure': {
      en: () => `❌ *Payment Failed*\n\nHi ${userData.name},\n\nPayment of ₹${userData.amount} for ${userData.eventName} failed.\n\nPlease retry. 🙏`,
      hi: () => `❌ *भुगतान विफल*\n\nनमस्ते ${userData.name},\n\nभुगतान विफल रहा।\n\nफिर से प्रयास करें। 🙏`,
    },
    'event-reminder': {
      en: () => `🔔 *Event Reminder*\n\nHi ${userData.name},\n\n${userData.eventName} is tomorrow at ${userData.eventDate}!\n\nDon't miss it! 🙏`,
      hi: () => `🔔 *ईवेंट रिमाइंडर*\n\nनमस्ते ${userData.name},\n\n${userData.eventName} कल है!\n\nमिलेंगे! 🙏`,
    },
  };
  const template = templates[templateName]?.[language] || templates[templateName]?.['en'];
  return template ? template() : null;
}
