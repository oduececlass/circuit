/* Convenience access gate for a static site. This is not server authentication. */
(() => {
  'use strict';
  const config = window.CIRCUIT_SITE;
  let memoryAccess = false;
  function unlocked() {
    try { return memoryAccess || sessionStorage.getItem(config.sessionKey) === config.passwordHash; }
    catch { return memoryAccess; }
  }
  async function verify(password) {
    if (!globalThis.crypto?.subtle) throw new Error('Open the site using HTTPS or localhost to enter the password.');
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const digest = Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2, '0')).join('');
    if (digest !== config.passwordHash) return false;
    // Storage is required for access to carry into the separate Studio page.
    try { sessionStorage.setItem(config.sessionKey, digest); }
    catch { throw new Error('Allow session storage for this site, then try again.'); }
    memoryAccess = true;
    return true;
  }
  function lock() {
    memoryAccess = false;
    try { sessionStorage.removeItem(config.sessionKey); } catch {}
  }
  function safeNext(value) {
    try {
      const url = new URL(value, location.href);
      const target = new URL('studio.html', location.href);
      return url.origin === target.origin && url.pathname === target.pathname ? url.href : null;
    } catch { return null; }
  }
  window.CircuitAccess = { unlocked, verify, lock, safeNext };
})();
