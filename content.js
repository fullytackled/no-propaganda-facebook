(() => {
  const SELECTORS = '[role="article"]';
  const BADGE_ATTR = 'data-counterpoint-added';
  const MAX_TEXT = 1200;

  function cleanText(value) {
    return (value || '').replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT);
  }

  function extractClaim(text) {
    // Pick a sentence that looks like a factual assertion; skip very short fragments.
    const sentences = text.match(/[^.!?]+[.!?]?/g) || [];
    const candidates = sentences.map(s => cleanText(s)).filter(s =>
      s.length >= 35 &&
      !/^(like|comment|share|reply|see more|sponsored)\b/i.test(s)
    );
    return candidates.sort((a, b) => b.length - a.length)[0] || cleanText(text).slice(0, 220);
  }

  function makeGoogleUrl(query) {
    return 'https://www.google.com/search?q=' + encodeURIComponent(query);
  }

  function addReview(article) {
    if (article.hasAttribute(BADGE_ATTR)) return;
    const postText = cleanText(article.innerText);
    if (postText.length < 50) return;

    article.setAttribute(BADGE_ATTR, '1');
    const claim = extractClaim(postText);
    if (!claim) return;

    const box = document.createElement('aside');
    box.className = 'counterpoint-box';
    box.innerHTML = `
      <div class="counterpoint-heading"><span aria-hidden="true">↔</span> No Propaganda</div>
      <p class="counterpoint-copy">Looking for the strongest evidence <strong>against</strong> this claim and credible context. This checks the claim, not the person sharing it.</p>
      <div class="counterpoint-actions"></div>
      <p class="counterpoint-note">Search results need your judgment. A search is not a verdict, and missing evidence does not prove a claim false.</p>
    `;
    const actions = box.querySelector('.counterpoint-actions');
    const searches = [
      ['Find counterevidence', 'evidence against'],
      ['Check fact-checks', 'fact check'],
      ['Find supporting context', 'context']
    ];
    for (const [label, suffix] of searches) {
      const a = document.createElement('a');
      a.textContent = label;
      a.href = makeGoogleUrl(`"${claim}" ${suffix}`);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      actions.appendChild(a);
    }
    const insertionPoint = article.querySelector('[data-ad-comet-preview="message"], [dir="auto"]');
    (insertionPoint?.parentElement || article).appendChild(box);
  }

  let enabled = true;
  function scan() {
    if (!enabled) return;
    document.querySelectorAll(SELECTORS).forEach(addReview);
  }
  chrome.storage.local.get({enabled:true}, state => { enabled = state.enabled; scan(); });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.enabled) enabled = changes.enabled.newValue;
    scan();
  });
  const observer = new MutationObserver(() => scan());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();


