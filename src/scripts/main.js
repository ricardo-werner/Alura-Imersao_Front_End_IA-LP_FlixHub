import { initNavigation } from './modules/navigation.js';
import './script.js';

document.documentElement.classList.add('js-enabled');

initNavigation({
  mainSelector: '#main-content',
  menuSelector: 'aside nav ul li a[href^="#"]',
});
