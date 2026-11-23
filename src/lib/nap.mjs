import { site } from '../site.mjs';
import { esc } from './html.mjs';

// Business name / address / phone / hours helpers shared by footer, contact and home.
const a = site.address;
export const addressOneLine = () => (a ? `${a.street}, ${a.city}, ${a.state} ${a.zip}` : '');
export const addressHtml = () => (a ? `<address>${esc(a.street)}<br>${esc(a.city)}, ${esc(a.state)} ${esc(a.zip)}</address>` : '');
export const directionsUrl = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${addressOneLine()}`)}`;
export const hoursHtml = (cls = 'hours') =>
  site.hours ? `<dl class="${cls}">${site.hours.map((h) => `<div><dt>${esc(h.label)}</dt><dd>${esc(h.text)}</dd></div>`).join('')}</dl>` : '';
export const hoursShort = () => (site.hours ? site.hours.map((h) => `${h.label === 'Monday – Saturday' ? 'Mon – Sat' : h.label === 'Sunday' ? 'Sun' : h.label}: ${h.text}`).join(' · ') : '');
