# River City Dental: Google Ads landing page

Static page, no build step, no form. Upload the folder to any host (SiteGround, Vercel, a subfolder on rivercitydental.com.au) and point the ad's final URL at `index.html`.

## Files

- `index.html` the landing page
- `thank-you.html` booking confirmation page, where the booking conversion fires
- `assets/css/styles.css` all styling; colours are variables at the top
- `assets/js/config.js` the only file you need to edit before launch
- `assets/js/main.js` tracking, scroll-to-booking, opening hours logic
- `images/` the practice logo and photos

## Online booking (read this first)

Core Practice only draws its booking calendar on domains it has approved for the practice. Tested 30 Oct 2026: the embed shows the live calendar on rivercitydental.com.au and stays blank on other websites. Whether it works on a subdomain such as book.rivercitydental.com.au can only be checked once that subdomain is live.

The page handles this on its own. It always shows a "See available times" panel first (three steps, plus a button that opens the Core Practice booking page in a new tab) while the calendar loads out of sight. The moment Core Practice reports that the calendar has drawn, the calendar takes the panel's place. On a domain Core Practice doesn't allow, the panel just stays, so visitors never see a blank box.

If the calendar doesn't appear on the live domain, ask Core Practice support to approve that domain for River City Dental's online booking widget. No code change is needed afterwards.

## Hosting on book.rivercitydental.com.au (Vercel)

rivercitydental.com.au's DNS is not managed in SiteGround. Its nameservers are ns1, ns2 and ns3.nameserver.net.au (the registrar's DNS), so records added in SiteGround's DNS Zone Editor have no effect. Add the CNAME where those nameservers are managed:

- Type: CNAME
- Host/Name: book
- Value: the target Vercel shows for the domain (e.g. `xxxx.vercel-dns-016.com`)

Then press Refresh on the domain in Vercel. Delete the unused CNAME from SiteGround's zone editor to avoid confusion later. Don't move the nameservers to SiteGround just for this: their website, email and other records are all set up at the registrar.

## Before going live

1. **Tracking.** `assets/js/config.js` already has the practice's Google Ads ID (AW-648021917, taken from their website). Add two conversion labels:
   - `call` fires when someone taps a phone number
   - `booking` fires on `thank-you.html`
   - `bookClick` (optional) fires when someone opens the booking calendar in a new tab, for when the page isn't on their domain
2. **Booking conversions.** Bookings happen inside the Core Practice frame, so this page can't see them directly. Core Practice's widget script supports sending the page to a URL after a booking: ask Core Practice support to set the River City Dental widget's post-booking redirect to this page's `thank-you.html`. Until that's set, track bookings from Core Practice's own reporting, and don't use "visited the booking page" as the conversion (it counts browsers, not bookings).
3. **Images.** All page photos are bundled in `images/`:
   - `dr-john-with-young-patients.jpg` banner background
   - `reception.jpg` beside "Easy to get to, easy to sit through"
   The supplied files are small (516 to 669px wide), so the banner photo is capped at about 880px wide on desktop to stay sharp. If the practice has the original, full-size versions (especially Dr John with the kids), swap them in using the same file names for a crisper banner on large screens.
   The Dr John section still loads the team photo from rivercitydental.com.au; download it into `images/` and update its `src` in `index.html`.
4. **Confirm with the clinic** (see list below).
5. **Google rating.** The banner shows "5.0 from 147 Google reviews" (checked on Google on 30 Oct 2026). Update the number every month or so in `index.html` (search for "Google reviews"); a stale count looks careless next to the real listing.
6. **Remove the health fund band** (`.fund-band` section) after 31 December, or rewrite it for the new year.

## Confirm with the clinic

- **Free implant consultation.** In the offers list to match the implant ads. "Implant Consult" is bookable in Core Practice, but "free" isn't stated on their website. Remove the word if it isn't a standing offer.
- **Practice website.** The practice confirmed (2 Nov 2026) the kids' new patient cap is $135 and the appointment is 75 minutes. Their own offers page still says $130 and 90 minutes; worth updating so the ad, landing page and website match.
- **Opening hours.** Their site shows two different sets. The page uses the header version (Mon 9 to 6, Tue 9 to 5, Wed 8:30 to 5, Thu 9 to 5, Fri 8:30 to 4). Hours also appear in `main.js` (`HOURS`) and the schema block in `index.html`.
- **New patient price.** Their site mentions both $270 and $260. The page uses $270, matching the offers page and page title.
- **Star rating in ads (AHPRA).** The page shows only the star rating and review count, with no review text. Ahpra treats reviews that mention treatment or outcomes as testimonials, which can't be used in advertising; it hasn't clearly ruled on bare star ratings. Most practices display them, but check the practice is comfortable, and never add quoted reviews about treatment.
- **Availability.** New patient times were fully booked for the week of 29 October and open from 5 November. If the widget shows no times for a visitor's first week, they need to move the date forward, so keep new patient slots open while the ads run.

## Notes

- The page is set to `noindex` so it doesn't compete with the main site in organic search.
- Book and call buttons repeat down the page, and a call/book bar sticks to the bottom on mobile.
- The opening hours bar at the top highlights today and shows live open/closed status in Brisbane time. Hours live in three places: the top bar and hours table in `index.html`, and `HOURS` in `main.js`.
- Colours are sampled from the logo (navy #00325D, teal #00ACBD) and the type is Montserrat, matching the wordmark. Both are variables at the top of `styles.css`.
