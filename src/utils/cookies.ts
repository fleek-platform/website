import { isServer } from './common';
import { getSiteUrl, getTopLevelDomain } from '@utils/url';

const baseUrl = getSiteUrl();
const siteHostname = getTopLevelDomain(baseUrl);

export function getCookie(key: string) {
  if (isServer) return '';
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function setCookie(key: string, value: string, days: number) {
  if (isServer) return '';
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  // We're required to set the "Domain" attribute
  // to make cookies available on domain and subdomains
  // e.g. fleek.xyz
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent
  document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/;domain=${siteHostname}`;
}

export function clearCookie(name: string) {
  if (isServer) return '';
  // We're required to set the "Domain" attribute
  // to make cookies available on domain and subdomains
  // e.g. fleek.xyz and app.fleek.xyz
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent
  document.cookie =
    name +
    `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=${siteHostname}`;
}
