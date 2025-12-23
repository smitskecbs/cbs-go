// src/ui/mapView.js
// Simple map view wrapper.
// If you are using realMapView (Leaflet GPS), this file should render that.

import { renderRealMapView, bindRealMapView } from './realMapView.js';

export function renderMapView() {
  return renderRealMapView();
}

export function bindMapView() {
  return bindRealMapView();
}
