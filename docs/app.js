(function () {
  const root = document.documentElement;
  root.classList.add('js-ready');

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay');
            if (delay) entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // 1958 Kitchen-Table Shilling Ledger Calculator
  const LOANS = {
    2: {
      street: '2s / week · £2 interest in 20 wks (£0 repaid)',
      licensed: '15s 7d annual interest cap (39%)',
      cu: '~2s 7d total interest over 12 months + dividend'
    },
    5: {
      street: '5s / week · £5 interest in 20 wks (£0 repaid)',
      licensed: '£1 19s annual interest cap (39%)',
      cu: '~6s 6d total interest over 12 months + dividend'
    },
    10: {
      street: '10s / week · £10 interest in 20 wks (£0 repaid)',
      licensed: '£3 18s annual interest cap (39%)',
      cu: '~13s total interest over 12 months + dividend'
    },
    15: {
      street: '15s / week · £15 interest in 20 wks (£0 repaid)',
      licensed: '£5 17s annual interest cap (39%)',
      cu: '~19s 6d total interest over 12 months + dividend'
    }
  };

  const streetEl = document.getElementById('l-street');
  const licensedEl = document.getElementById('l-licensed');
  const cuEl = document.getElementById('l-cu');

  document.querySelectorAll('[data-loan]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-loan');
      const data = LOANS[key];
      if (!data) return;
      document.querySelectorAll('[data-loan]').forEach((b) => {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      if (streetEl) streetEl.textContent = data.street;
      if (licensedEl) licensedEl.textContent = data.licensed;
      if (cuEl) cuEl.textContent = data.cu;
    });
  });

  // Historical Diagram Switcher
  const diagImg = document.getElementById('diagram-preview');
  const diagCap = document.getElementById('diagram-caption');
  document.querySelectorAll('[data-diagram]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-diagram');
      const alt = btn.getAttribute('data-alt') || '';
      document.querySelectorAll('[data-diagram]').forEach((b) => {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      if (diagImg && src) {
        diagImg.src = src;
        diagImg.alt = alt;
      }
      if (diagCap) diagCap.textContent = alt;
    });
  });

  // Early Access Form
  const form = document.getElementById('sl-access-form');
  const emailInput = document.getElementById('sl-access-email');
  const statusEl = document.getElementById('sl-access-status');
  if (form && emailInput && statusEl) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        statusEl.textContent = 'Enter a valid email address.';
        emailInput.focus();
        return;
      }
      statusEl.textContent = 'Recorded locally for ' + email + '. Read the Prologue and Chapter One now.';
      form.reset();
    });
  }
})();
