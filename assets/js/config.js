let namespace = (function() {
    // 1. Hash-Routing: index.html#/koeln-muelheim
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
        const seg = hash.slice(2).split('/')[0];
        if (seg) return seg;
    }
    // 2. Sicherheitsnetz für den ersten Lade-Zyklus mit ?id= (vor dem Redirect in app.js)
    const match = (new RegExp('[?|&]id=([^&;]+?)(&|#|;|$)').exec(location.search));
    if (match && match[1]) return decodeURIComponent(match[1].replace(/\+/g, '%20'));
    // 3. Default-Namespace
    return "koeln-muelheim";
})();
let languageCode;

/**************************************************************************************************/
// GET LANGUAGE
/**************************************************************************************************/

// Startsprache: URL-Parameter → localStorage → Browser → 'de'
let browserLanguage = (function () {
    var urlLng = getURLParameter('lng');
    if (urlLng) return urlLng;
    try {
        var stored = localStorage.getItem('fotopfade_language');
        if (stored) return stored;
    } catch (e) { /* SecurityError in privatem Modus (iOS Safari) — ignorieren */ }
    return (navigator.language || navigator.userLanguage || 'de').split('-')[0];
})();
console.log('Startsprache:', browserLanguage);

/**************************************************************************************************/
// URL PARAMETER START
/**************************************************************************************************/

function getURLParameter(name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)
      || [null, ''])[1].replace(/\+/g, '%20')
  ) || null;
}
