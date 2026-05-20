/**
 * Inline theme bootstrap — rendered in <head> to prevent flash of wrong theme.
 * Must run before React hydrates.
 */
export function ThemeScript() {
  const script = `
(function () {
  try {
    var root = document.documentElement;
    var theme = localStorage.getItem('lsc-theme');
    var mode = localStorage.getItem('lsc-mode');
    if (!theme) {
      theme = root.getAttribute('data-theme') || 'default';
    }
    if (!mode) {
      mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme !== 'default' && theme !== 'advent' && theme !== 'easter') theme = 'default';
    if (mode !== 'light' && mode !== 'dark' && mode !== 'reading') mode = 'light';
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
  } catch (e) {}
})();
`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
