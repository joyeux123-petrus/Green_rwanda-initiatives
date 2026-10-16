/**
 * Email Notification Service for Green Rwanda Initiative
 * Delivers contact form messages and newsletter subscriptions directly to greenrwandainitiative@gmail.com
 */

const RECIPIENT_EMAIL = 'greenrwandainitiative@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
}

/**
 * Fetch helper with strict timeout to prevent UI hanging
 */
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = 4000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Sends a contact inquiry email directly to greenrwandainitiative@gmail.com
 */
export async function sendContactEmailNotification(data: ContactFormData): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[GRI Contact Form] ${data.subject} - ${data.name}`,
        _template: 'table',
        _captcha: 'false',
        "Name": data.name,
        "Email": data.email,
        "Organization": data.organization || 'N/A',
        "Subject": data.subject,
        "Message": data.message,
        "Date": new Date().toLocaleString()
      })
    }, 4000);

    return response.ok;
  } catch (err) {
    console.warn("Contact email notification bypassed or timed out:", err);
    return false;
  }
}

/**
 * Sends a newsletter subscriber alert directly to greenrwandainitiative@gmail.com
 */
export async function sendNewsletterNotification(subscriberEmail: string): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[GRI Newsletter] New Subscriber: ${subscriberEmail}`,
        _template: 'table',
        _captcha: 'false',
        "Subscriber Email": subscriberEmail,
        "Action": "New Newsletter Subscription via Website",
        "Date": new Date().toLocaleString()
      })
    }, 4000);

    return response.ok;
  } catch (err) {
    console.warn("Newsletter email notification bypassed or timed out:", err);
    return false;
  }
}
