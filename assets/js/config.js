/*
  River City Dental landing page settings.
  Fill these in before the page goes live. Nothing else needs editing.
*/
window.RCD_CONFIG = {
  // Google Ads account ID. AW-648021917 is the ID already running on rivercitydental.com.au.
  // Leave blank to switch tracking off.
  googleAdsId: "AW-648021917",

  // Calls from the landing page (the campaign's main website conversion).
  // The page shows the call tracking number 07 4074 9007, which forwards to the
  // practice on (07) 3667 9595. For visitors from an ad, Google swaps it for a Google
  // forwarding number that rings 07 4074 9007, so Google Ads counts the call and the
  // tracking system still logs it. Paste the label from the "Calls from website"
  // conversion action (Tag setup > Install the tag yourself). trackedPhone must match
  // the number shown on the page exactly.
  websiteCallLabel: "",
  trackedPhone: "07 4074 9007",

  // Optional extra labels. Leave blank unless the Google Ads team asks for them.
  conversionLabels: {
    call: "",      // tap on a phone number (secondary only; not a real call)
    booking: "",   // thank-you.html, only if Core Practice redirects there after a booking
    bookClick: ""  // opening the booking calendar in a new tab
  }
};
