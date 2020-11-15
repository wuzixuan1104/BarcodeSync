import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing/registerRoute';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import pjson from '../package.json';
import 'regenerator-runtime/runtime';

/*eslint-disable */
const version = pjson.version.split`.`.join``;
const cacheName = 'sanbei3000';

const VERSION = `${cacheName}-${version}`;

self.skipWaiting();
precacheAndRoute(self.__WB_MANIFEST);

// remove old page
caches.keys().then(cacheNames => {
  cacheNames.forEach(cacheName => {
    console.log('cacheName', cacheName, `${cacheName}-${+version}`);
    caches.delete(cacheName);
  });
});

// vendor
registerRoute(
  new RegExp('/vendor+'),
  new CacheFirst({
    cacheName: 'vendor',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

// image
registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

//google font  https://fonts.gstatic.com
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'gfont',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
