# River City Dental: Google Ads landing page

Static page, no build step, no form. Upload the folder to any host (SiteGround, Vercel, a subfolder on rivercitydental.com.au) and point the ad's final URL at `index.html`.

## Files

- `index.html` the landing page
- `thank-you.html` booking confirmation page, where the booking conversion fires
- `assets/css/styles.css` all styling; colours are variables at the top
- `assets/js/config.js` the only file you need to edit before launch
- `assets/js/main.js` tracking, scroll-to-booking, opening hours logic
- `images/` the practice logo and photos

## Online booking

The booking section under the banner is the practice's live **Core Practice** widget (the same one on rivercitydental.com.au/book-online). Every Book button on the page scrolls to it. It loads from corepractice.is, so it only appears once the page is hosted online; opened as a local file you'll see an "Open online booking" link in its place, which is also the fallback if the script is ever blocked.

## Before going live

1. **Tracking.** `assets/js/config.js` already has the practice's Google Ads ID (AW-648021917, taken from their website). Add two conversion labels:
   - `call` fires when someone taps a phone number
   - `booking` fires on `thank-you.html`
2. **Booking conversions.** Bookings happen inside the Core Practice frame, so this page can't see them directly. Core Practice's widget script supports sending the page to a URL after a booking: ask Core Practice support to set the River City Dental widget's post-booking redirect to this page's `thank-you.html`. Until that's set, track bookings from Core Practice's own reporting, and don't use "visited the booking page" as the conversion (it counts browsers, not bookings).
3. **Images.** All page photos are bundled in `images/`:
   - `dr-john-with-young-patients.jpg` banner background
   - `reception.jpg` beside "Easy to get to, easy to sit through"
   - `station-road-sign.jpg` under the address in "Find us on Station Road"
   The supplied files are small (447 to 669px wide), so the banner photo is capped at about 880px wide on desktop to stay sharp. If the practice has the original, full-size versions (especially Dr John with the kids), swap them in using the same file names for a crisper banner on large screens.
   The Dr John section still loads the team photo from rivercitydental.com.au; download it into `images/` and update its `src` in `index.html`.
4. **Confirm with the clinic** (see list below).
5. **Remove the health fund band** (`.fund-band` section) after 31 December, or rewrite it for the new year.

## Confirm with the clinic

- **Free implant consultation.** In the offers list to match the implant ads. "Implant Consult" is bookable in Core Practice, but "free" isn't stated on their website. Remove the word if it isn't a standing offer.
- **Appointment length.** The page says 90 minutes (as on their offers page); Core Practice books the New Patient Offer as a 75-minute slot.
- **Opening hours.** Their site shows two different sets. The page uses the header version (Mon 9 to 6, Tue 9 to 5, Wed 8:30 to 5, Thu 9 to 5, Fri 8:30 to 4). Hours also appear in `main.js` (`HOURS`) and the schema block in `index.html`.
- **New patient price.** Their site mentions both $270 and $260. The page uses $270, matching the offers page and page title.
- **Availability.** New patient times were fully booked for the week of 29 October and open from 5 November. If the widget shows no times for a visitor's first week, they need to move the date forward, so keep new patient slots open while the ads run.

## Notes

- The page is set to `noindex` so it doesn't compete with the main site in organic search.
- Book and call buttons repeat down the page, and a call/book bar sticks to the bottom on mobile.
- Colours are sampled from the logo (navy #00325D, teal #00ACBD) and the type is Montserrat, matching the wordmark. Both are variables at the top of `styles.css`.
