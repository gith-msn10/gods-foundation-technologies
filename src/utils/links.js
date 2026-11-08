import { businessInfo } from '../data/businessInfo';

const digitsOnly = (value) => String(value || '').replace(/\D/g, '');

// Returns a wa.me URL, or null when no WhatsApp number has been configured.
export function whatsappUrl(message = '') {
  const number = digitsOnly(businessInfo.whatsappNumber);
  if (!number) return null;
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function generalInquiryMessage() {
  return `Hello ${businessInfo.name}, I would like to ask about a product.`;
}

export function productInquiryMessage(productName) {
  return `Hello ${businessInfo.name}, I'm interested in ${productName}. Please let me know the current price and availability.`;
}

export const productInquiryUrl = (productName) => whatsappUrl(productInquiryMessage(productName));
export const generalWhatsappUrl = () => whatsappUrl(generalInquiryMessage());

export function mailtoUrl(subject = `Enquiry for ${businessInfo.name}`) {
  const email = (businessInfo.email || '').trim();
  return email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : null;
}

export const facebookUrl = () => (businessInfo.facebookUrl || '').trim() || null;
export const mapsUrl = () => (businessInfo.mapsUrl || '').trim() || null;
