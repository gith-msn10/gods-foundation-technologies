import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import { buildHeadHtml } from './utils/seo.js';

export const renderApp = () => renderToString(<App />);
export const renderNotFound = () => renderToString(<NotFoundPage />);
export const headHtml = () => buildHeadHtml();
