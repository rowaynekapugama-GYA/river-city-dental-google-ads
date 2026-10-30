(function () {
  "use strict";

  var CFG = window.RCD_CONFIG || {};

  /* ---------- Google Ads tag ---------- */
  if (CFG.googleAdsId) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CFG.googleAdsId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", CFG.googleAdsId);
  }

  function fireConversion(kind) {
    var label = CFG.conversionLabels && CFG.conversionLabels[kind];
    if (window.gtag && CFG.googleAdsId && label) {
      window.gtag("event", "conversion", { send_to: CFG.googleAdsId + "/" + label });
    }
  }
  window.rcdFireConversion = fireConversion;

  /* ---------- Call tracking ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('[data-track="call"]');
    if (link) fireConversion("call");
  });

  /* ---------- Book buttons scroll to the booking widget ---------- */
  document.querySelectorAll("[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", a.getAttribute("href"));
    });
  });


  /* ---------- Booking widget watchdog ----------
     The Core Practice calendar reports its height to this page once it has drawn.
     If that never happens, swap the empty frame for a clear "open in a new tab" panel
     so an ad visitor never lands on a blank box. */
  var bookingWrap = document.querySelector("[data-booking]");
  var bookingFrame = document.getElementById("core-widget");
  if (bookingWrap && bookingFrame) {
    var widgetAlive = false;
    window.addEventListener("message", function (e) {
      if (/corepractice\.is$/.test(e.origin.replace(/^https?:\/\//, "").split(":")[0]) &&
          String(e.data).indexOf("[iFrameSizer]") === 0) {
        widgetAlive = true;
        // A slow connection can draw the calendar after the fallback appeared: bring it back.
        if (bookingWrap.classList.contains("is-failed") && window.location.protocol !== "file:") {
          bookingWrap.classList.remove("is-failed");
          var fbEl = bookingWrap.querySelector(".booking-fallback");
          if (fbEl) fbEl.hidden = true;
        }
      }
    });
    function showFallback() {
      if (widgetAlive) return;
      // If Core Practice's resize script itself didn't load, the calendar can still work
      // (just without auto-height), so keep it and rely on the "open in a new tab" link below it.
      if (window.location.protocol !== "file:" && typeof window.iFrameResize !== "function") return;
      bookingWrap.classList.add("is-failed");
      var fb = bookingWrap.querySelector(".booking-fallback");
      if (fb) fb.hidden = false;
    }
    // Opened as a local file: third-party booking apps won't run, so go straight to the fallback.
    if (window.location.protocol === "file:") {
      showFallback();
    } else {
      setTimeout(showFallback, 12000);
    }
  }

  /* ---------- Opening hours: highlight today, show open status (Brisbane time) ---------- */
  var HOURS = { 1: [900, 1800], 2: [900, 1700], 3: [830, 1700], 4: [900, 1700], 5: [830, 1600] };
  function fmt(hhmm) {
    var h = Math.floor(hhmm / 100), m = hhmm % 100;
    return (h % 12 || 12) + (m ? ":" + String(m).padStart(2, "0") : "") + (h >= 12 ? "pm" : "am");
  }
  try {
    var map = {};
    new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Brisbane", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date()).forEach(function (p) { map[p.type] = p.value; });
    var day = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[map.weekday];
    var now = (parseInt(map.hour, 10) % 24) * 100 + parseInt(map.minute, 10);

    var row = document.querySelector('.hours tr[data-day="' + day + '"]');
    if (row) row.classList.add("is-today");

    var status = document.querySelector("[data-open-status]");
    var today = HOURS[day];
    if (status) {
      if (today && now >= today[0] && now < today[1]) {
        status.textContent = "Open now until " + fmt(today[1]);
        status.classList.add("is-open");
      } else if (today && now < today[0]) {
        status.textContent = "Opens today at " + fmt(today[0]);
      } else {
        status.textContent = "Book online any time";
      }
    }
  } catch (err) { /* keep default text */ }
})();
