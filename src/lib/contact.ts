/** Default country code used when the configured phone has no international prefix. */
const DEFAULT_COUNTRY_CODE = '1';

/**
 * Converts a display phone number into the digits-only format wa.me expects.
 * A 10-digit number is assumed to be US/Canada and gets the +1 prefix;
 * anything longer is treated as already carrying its country code.
 */
export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `${DEFAULT_COUNTRY_CODE}${digits}` : digits;
}

/** Builds a wa.me link with a prefilled, properly encoded message. */
export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`;
}

/** Digits-only number for `tel:` links. */
export function toTelNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}
