// ============================================
// READING PROGRESS BAR
// ============================================
(function() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;

  function updateBar() {
    const doc = document.documentElement;
    const body = document.body;
    const scrollTop = doc.scrollTop || body.scrollTop;
    const scrollHeight = (doc.scrollHeight || body.scrollHeight) - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }

  window.addEventListener('scroll', updateBar, { passive: true });
})();

// ============================================
// TABLE OF CONTENTS — BUILD + ACTIVE STATE
// ============================================
(function() {
  const tocList = document.getElementById('toc-list');
  const tocFixed = document.getElementById('post-toc-fixed');
  if (!tocList) return;

  const headings = document.querySelectorAll('.post-body h2');
  if (headings.length === 0) {
    if (tocFixed) tocFixed.style.display = 'none';
    return;
  }

  headings.forEach(function(h, i) {
    if (!h.id) h.id = 'section-' + i;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const top = h.getBoundingClientRect().top + scrollY - 90;
      window.scrollTo({ top: top, behavior: 'smooth' });
      document.documentElement.scrollTop = top;
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });

  const links = tocList.querySelectorAll('a');

  function updateTOC() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight || document.body.scrollHeight;

    let current = headings[0].id;
    if (scrollY + windowH >= docH - 40) {
      current = headings[headings.length - 1].id;
    } else {
      headings.forEach(function(h) {
        if (h.getBoundingClientRect().top <= 130) current = h.id;
      });
    }
    links.forEach(function(a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateTOC, { passive: true });
  updateTOC();
})();

// ============================================
// BACK TO TOP BUTTON
// ============================================
(function() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function checkScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    btn.style.opacity = scrollY > 600 ? '1' : '0';
    btn.style.pointerEvents = scrollY > 600 ? 'auto' : 'none';
  }

  window.addEventListener('scroll', checkScroll, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
})();

// ============================================
// MOBILE NAV TOGGLE
// ============================================
(function() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('is-open');
    });
  }
})();
