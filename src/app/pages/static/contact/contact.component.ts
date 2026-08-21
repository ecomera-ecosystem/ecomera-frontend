import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

const STORES = [
  {
    name: 'Ecomera Casablanca Mall',
    address: 'Morocco Mall, Boulevard de la Corniche, Casablanca',
    phone: '+212 5 22 10 20 30',
    hours: 'Mon–Sat 10:00 – 21:00',
    lat: 33.5951,
    lng: -7.6855,
  },
  {
    name: 'Ecomera Rabat City',
    address: 'Avenue Mohammed V, Agdal, Rabat',
    phone: '+212 5 37 10 40 50',
    hours: 'Mon–Sat 09:30 – 20:30',
    lat: 33.9716,
    lng: -6.8498,
  },
  {
    name: 'Ecomera Marrakech',
    address: 'Avenue Mohammed VI, Gueliz, Marrakech',
    phone: '+212 5 24 20 60 70',
    hours: 'Every day 10:00 – 22:00',
    lat: 31.6295,
    lng: -8.0232,
  },
  {
    name: 'Ecomera Tangier',
    address: 'Boulevard Pasteur, Ville Nouvelle, Tangier',
    phone: '+212 5 39 10 80 90',
    hours: 'Mon–Sat 10:00 – 21:00',
    lat: 35.7767,
    lng: -5.8056,
  },
  {
    name: 'Ecomera Oujda',
    address: 'Boulevard Mohammed V, Centre-ville, Oujda',
    phone: '+212 5 36 10 90 10',
    hours: 'Mon–Sat 09:30 – 20:00',
    lat: 34.6814,
    lng: -1.9086,
  },
];

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  stores = STORES;
  private map: L.Map | null = null;

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initMap() {
    const map = L.map('ecomera-map', {
      center: [33.5, -7.0],
      zoom: 6,
      scrollWheelZoom: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: 'ecomera-pin',
      html: '<div class="pin-dot"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 30],
    });

    const markers = STORES.map((store) =>
      L.marker([store.lat, store.lng], { icon }).bindPopup(`<strong>${store.name}</strong><br/>${store.address}`)
    );
    const group = L.featureGroup(markers).addTo(map);
    map.fitBounds(group.getBounds().pad(0.2));

    this.map = map;
    setTimeout(() => map.invalidateSize(), 100);
  }
}
