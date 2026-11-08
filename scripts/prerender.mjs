// Runs after `vite build` and `vite build --ssr`. Writes real HTML into dist/index.html (hydrated by main.jsx)
// and creates dist/404.html. Search engines and slow phones get content without waiting for JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const serverDir = path.resolve('dist-server');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const server = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

const ROOT = /<div id="root"><\/div>/;
if (!ROOT.test(template)) throw new Error('Prerender: <div id="root"></div> not found in dist/index.html');
const withHead = (html, tags) => (html.includes('<!--app-head-->') ? html.replace('<!--app-head-->', tags) : html.replace('</head>', `${tags}\n  </head>`));

// Home page
const home = withHead(template, server.headHtml()).replace(ROOT, `<div id="root">${server.renderApp()}</div>`);
fs.writeFileSync(path.join(dist, 'index.html'), home);

// 404 page: not indexable, no canonical, no business structured data.
const title = "Page not found | God's Foundation Technologies";
const notFound = withHead(template, '<meta name="robots" content="noindex" />')
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  .replace(/<meta\s+name="description"[\s\S]*?\/>/, '<meta name="description" content="This page could not be found." />')
  .replace(ROOT, `<div id="root" data-page="404">${server.renderNotFound()}</div>`);
fs.writeFileSync(path.join(dist, '404.html'), notFound);

fs.rmSync(serverDir, { recursive: true, force: true });
console.log('Prerendered dist/index.html and dist/404.html');
