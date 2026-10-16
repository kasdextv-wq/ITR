const paths = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:
    '<path d="m8 3 2 5-3 2c1 4 3 6 7 7l2-3 5 2v3c0 2-2 3-4 2C9 20 4 15 3 7c-1-2 0-4 2-4Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  camera:
    '<path d="m3 6 13-3 4 10-13 3Z"/><path d="m19 9 3-1v6l-2-1M9 16l-2 4H2v-5"/><circle cx="15" cy="9" r="1.5"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',
  fire: '<path d="M12 2c1 5 7 6 7 12a7 7 0 0 1-14 0c0-3 2-5 4-7 0 4 2 4 2 4s3-3 1-9Z"/><path d="M10 21c-4-5 2-9 2-9s5 6 2 9"/>',
  shield:
    '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
  access:
    '<rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="8" r="2"/><path d="M9 15h6m-5 3h4"/>',
  network:
    '<rect x="8" y="2" width="8" height="6" rx="1"/><path d="M12 8v5M4 17v-4h16v4"/><rect x="1" y="17" width="6" height="5" rx="1"/><rect x="9" y="17" width="6" height="5" rx="1"/><rect x="17" y="17" width="6" height="5" rx="1"/>',
  building:
    '<path d="M3 22V6l10-4v20M13 9h8v13M1 22h22M6 8h3m-3 4h3m-3 4h3m8-3h1m-1 4h1"/>',
  factory: '<path d="M3 22V10l6 3V8l7 5V3h4l2 19ZM6 17h2m4 0h2m4 0h1"/>',
  home: '<path d="m2 11 10-9 10 9M5 9v13h14V9M9 22v-9h6v9"/>',
  document: '<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8m-8 4h8"/>',
  tools: '<path d="M14 6a5 5 0 0 0-6 6L2 18l4 4 6-6a5 5 0 0 0 6-6l-4 2-3-3Z"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
};

export const icon = (name, className = "") =>
  `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
