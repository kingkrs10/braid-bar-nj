/**
 * Utility Functions
 * =================
 * Shared helper functions used across the application.
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Merges class names with clsx — handles conditionals, arrays, objects.
 * Usage: cn('base-class', isActive && 'active', { 'special': isSpecial })
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Formats a price number to USD currency string.
 * @example formatPrice(29.99) => "$29.99"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Formats a duration in minutes to a human-readable string.
 * @example formatDuration(90) => "1h 30min"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

/**
 * Generates a WhatsApp deep link for booking confirmation.
 * Opens WhatsApp with a pre-filled message to the business number.
 */
export function getWhatsAppLink(params: {
  phone?: string;
  serviceName: string;
  date: string;
  time: string;
  customerName: string;
}): string {
  const phone = params.phone || process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_PHONE || '';
  const message = encodeURIComponent(
    `Hi! I'd like to confirm my booking:\n` +
    `• Service: ${params.serviceName}\n` +
    `• Date: ${params.date}\n` +
    `• Time: ${params.time}\n` +
    `• Name: ${params.customerName}\n` +
    `\nThank you! 💛`
  );
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`;
}

/**
 * Generates placeholder time slots for a given date.
 * In production, these would come from Supabase availability table.
 */
export function generateTimeSlots(date: Date): string[] {
  const dayOfWeek = date.getDay();
  
  // Sunday closed
  if (dayOfWeek === 0) return [];
  
  // Saturday: 9am - 4pm
  if (dayOfWeek === 6) {
    return ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];
  }
  
  // Weekdays: 10am - 7pm
  return [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  ];
}

/**
 * Truncates text to a maximum length with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}
