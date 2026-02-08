// src/bufferPolyfill.js
import { Buffer } from 'buffer';

// Zorg dat Buffer ook in de browser bestaat (voor libs die het verwachten)
if (typeof globalThis !== 'undefined' && !globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}
