import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const sitemap = new SitemapStream({ hostname: 'https://aranasayesh.ir' });

const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/AboutUs', changefreq: 'daily', priority: 0.8 },
  { url: '/Application', changefreq: 'daily', priority: 0.8 },
  { url: '/Blogs', changefreq: 'daily', priority: 0.8 },
  { url: '/BySubscription', changefreq: 'daily', priority: 0.8 },
  { url: '/OurGoals', changefreq: 'daily', priority: 0.8 },
  { url: '/OurHistory', changefreq: 'daily', priority: 0.8 },
  { url: '/Question', changefreq: 'daily', priority: 0.8 },
  { url: '/Search', changefreq: 'daily', priority: 0.8 },
  { url: '/Services', changefreq: 'daily', priority: 0.8 },
  { url: '/WorkwithUs', changefreq: 'daily', priority: 0.8 },
  { url: '/subcategory', changefreq: 'daily', priority: 0.8 },
  { url: '/categories', changefreq: 'daily', priority: 0.8 },
  { url: '/CCP/ConfirmCode', changefreq: 'daily', priority: 0.8 },
  { url: '/CCP/DiscountHistory', changefreq: 'daily', priority: 0.8 },
  { url: '/CCP/SelectDate', changefreq: 'daily', priority: 0.8 },
];

pages.forEach(page => sitemap.write(page));
sitemap.end();

streamToPromise(sitemap).then(data =>
  createWriteStream(resolve(dirname(fileURLToPath(import.meta.url)), 'public', 'sitemap.xml')).write(data) // تغییر مسیر به public
);