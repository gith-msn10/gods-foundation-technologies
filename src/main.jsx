import React from 'react';
import ReactDOM from 'react-dom/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import App from './App.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import './index.css';

// Tailwind handles layout; stop Font Awesome injecting its own CSS a second time.
config.autoAddCss = false;

const rootEl = document.getElementById('root');
const Page = rootEl.dataset.page === '404' ? NotFoundPage : App;
const tree = (
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);

// Prerendered HTML is hydrated; in `npm run dev` the root is empty and rendered normally.
if (rootEl.hasChildNodes()) ReactDOM.hydrateRoot(rootEl, tree);
else ReactDOM.createRoot(rootEl).render(tree);
