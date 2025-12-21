import './style.css';
import { renderAppShell } from './ui/appShell.js';

document.querySelector('#app').innerHTML = renderAppShell();

document.getElementById('startBtn').addEventListener('click', () => {
  alert('CBS GO coming online…');
});
