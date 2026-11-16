/* Shared Clarity custom events. Safe if Clarity is blocked or not loaded. */
(function () {
  function track(name) {
    try { if (window.clarity) window.clarity("event", name); } catch (e) {}
  }
  window.track = track;

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href") || "";

    if (a.classList.contains("demo-link")) return track("sap_demo_link");
    if (/^mailto:/i.test(href) || /to=yaelkulish@gmail\.com/i.test(href)) return track("contact_email");
    if (/linkedin\.com/i.test(href)) return track("contact_linkedin");
    if (a.classList.contains("cc-link") || a.classList.contains("nav-back")) return track("next_project");

    if (a.classList.contains("card-cover") || a.classList.contains("p-link")) {
      var m = href.match(/^([a-z0-9-]+)-case-study\.html/i);
      if (m) track("open_case_" + m[1].replace(/-/g, "_"));
    }
  });

  var video = document.getElementById("conceptVideo");
  if (video) video.addEventListener("play", function () { track("sap_video_play"); }, { once: true });
})();
