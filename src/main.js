import './style.css';
import { mountApp } from './ui/appShell.js';

mountApp();

document.getElementById('startBtn').addEventListener('click', () => {
  alert('CBS GO coming online…');
});
