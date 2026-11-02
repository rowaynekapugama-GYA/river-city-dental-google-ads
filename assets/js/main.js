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

  /* ---------- Click tracking: calls, and opening the booking calendar ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-track]");
    if (!link) return;
    var kind = link.getAttribute("data-track");
    if (kind === "call") fireConversion("call");
    if (kind === "book") fireConversion("bookClick");
  });

  /* ---------- Book buttons scroll to the booking section ---------- */
  document.querySelectorAll("[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", a.getAttribute("href"));
    });
  });

  /* ---------- Booking calendar ----------
     Core Practice only draws its calendar on domains it has approved for the practice.
     The page shows a "See available times" panel by default while the calendar loads
     out of sight, and swaps the calendar in only once Core Practice reports that it has
     drawn. On a domain Core Practice doesn't allow, the panel simply stays. */
  var bookingWrap = document.querySelector("[data-booking]");
  if (bookingWrap) {
    window.addEventListener("message", function (e) {
      var host = "";
      try { host = new URL(e.origin).hostname; } catch (err) { return; }
      if (/(^|\.)corepractice\.is$/.test(host) && String(e.data).indexOf("[iFrameSizer]") === 0) {
        bookingWrap.classList.add("is-embed");
      }
    });
  }

  /* ---------- Opening hours (Brisbane time) ---------- */
  var HOURS = { 1: [900, 1800], 2: [900, 1700], 3: [830, 1700], 4: [900, 1700], 5: [830, 1600] };
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function fmt(hhmm) {
    var h = Math.floor(hhmm / 100), m = hhmm % 100;
    return (h % 12 || 12) + (m ? ":" + String(m).padStart(2, "0") : "") + (h >= 12 ? "pm" : "am");
  }
  function nextOpenDay(day) {
    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      if (HOURS[d]) return { day: d, label: i === 1 ? "tomorrow" : DAY_NAMES[d] };
    }
    return null;
  }
  try {
    var map = {};
    new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Brisbane", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date()).forEach(function (p) { map[p.type] = p.value; });
    var day = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[map.weekday];
    var now = (parseInt(map.hour, 10) % 24) * 100 + parseInt(map.minute, 10);
    var today = HOURS[day];

    var statusText, isOpen = false;
    if (today && now >= today[0] && now < today[1]) {
      statusText = "Open now until " + fmt(today[1]);
      isOpen = true;
    } else if (today && now < today[0]) {
      statusText = "Opens today at " + fmt(today[0]);
    } else {
      var next = nextOpenDay(day);
      statusText = next ? "Closed now, opens " + next.label + " at " + fmt(HOURS[next.day][0]) : "Closed now";
    }

    document.querySelectorAll("[data-open-status]").forEach(function (el) {
      el.textContent = statusText;
      el.classList.toggle("is-open", isOpen);
    });
    document.querySelectorAll('[data-day="' + day + '"]').forEach(function (el) {
      el.classList.add("is-today");
    });
  } catch (err) { /* keep the default text */ }
})();
