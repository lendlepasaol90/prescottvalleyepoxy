// Site-wide configuration for Prescott Valley Epoxy.

export const site = {
  name: 'Prescott Valley Epoxy',
  domain: 'https://prescottvalleyepoxy.com',
  city: 'Prescott Valley',
  cityLong: 'Prescott Valley',
  region: 'Yavapai County, Arizona',
  state: 'AZ',
  locale: 'en_US',

  // PLACEHOLDER — replace before launch, then set phoneVerified: true.
  phone: '(928) 555-0139',
  phoneHref: 'tel:+19285550139',
  phoneVerified: false,
  email: '',

  map: { query: 'Prescott Valley, AZ', lat: 34.61, lng: -112.3157, zoom: 12 },

  serviceAreas: [
    { name: 'Prescott Valley', note: 'All neighborhoods, from the town center out to StoneRidge and Pronghorn Ranch.' },
    { name: 'Dewey-Humboldt', note: 'Homes, barns and shops on larger lots along Highway 69.' },
    { name: 'Prescott', note: 'Garages and businesses just over Glassford Hill.' },
    { name: 'Chino Valley', note: 'Rural properties, workshops and new construction to the north.' },
    { name: 'Mayer', note: 'Homes and outbuildings to the southeast.' },
    { name: 'Cordes Lakes', note: 'Residential garages and patios off I-17.' },
    { name: 'Paulden', note: 'Ranch properties and detached garages north of Chino Valley.' },
  ],

  projectTypes: [
    'Garage floor coating',
    'Residential interior floor',
    'Decorative flake floor',
    'Metallic epoxy floor',
    'Polyaspartic coating',
    'Polyurea coating',
    'Patio or pool deck',
    'Commercial floor',
    'Warehouse or industrial floor',
    'Not sure yet',
  ],
};

// Licensed Unsplash photography (Unsplash License). Swap `id` for `src` to self-host.
export const images = {
  valley: { id: 'photo-1664413550793-872df9ff6676', alt: 'Open grassland stretching toward distant mountains' },
  grassPines: { id: 'photo-1757866039105-514e9cfd6d44', alt: 'Tall golden grass in the foreground with pine-covered hills beyond' },
  brownMountain: { id: 'photo-1581205135021-fbad89f942a6', alt: 'Rugged brown mountain under a clear blue sky' },
  grassSunset: { id: 'photo-1624592903540-54b548a6303e', alt: 'Grass field glowing at sunset' },
  dirtRoad: { id: 'photo-1672619762850-9c3e534c4fa1', alt: 'Dirt road crossing a dry grass field' },
  livingRoom: { id: 'photo-1758957701419-2c6e266f7988', alt: 'Modern living room with a sectional sofa over a seamless floor' },
  livingWindows: { id: 'photo-1721222203452-29aee6b651ac', alt: 'Bright living room with large windows and a smooth floor' },
  dining: { id: 'photo-1721989516850-a02c70e2fce3', alt: 'Dining room with a wooden table on a polished floor' },
  laundry: { id: 'photo-1778731660248-044f78e8c1fb', alt: 'Modern laundry room with a matching washer and dryer' },
  laundryWindow: { id: 'photo-1783125127006-ec73864353fb', alt: 'White laundry room with a large window and utility sink' },
  housePool: { id: 'photo-1721222203314-dfe0faf36b20', alt: 'Home with a pool and patio in front' },
  garageTwo: { id: 'photo-1694025926887-132752c2bac4', alt: 'Two cars parked on a clean, smooth garage floor' },
  garageCouple: { id: 'photo-1694026006855-6f4f0cdee8c0', alt: 'Pair of cars parked side by side in a finished garage' },
  garageSport: { id: 'photo-1694025964376-9dfdd394747c', alt: 'Black sports car on a glossy garage floor' },
  vintageGarage: { id: 'photo-1591278169757-deac26e49555', alt: 'White vintage car parked inside a garage' },
  autoShop: { id: 'photo-1727893119356-1702fe921cf9', alt: 'Bright automotive workshop with vehicles being serviced' },
  liftCar: { id: 'photo-1786198984387-b63cdf520602', alt: 'Car raised on a hydraulic lift in a service garage' },
  warehouseSun: { id: 'photo-1776090188612-a2dab458ce14', alt: 'Sunlight streaming across an empty warehouse floor' },
  warehouseGrid: { id: 'photo-1791763259248-dc41a1e9f84c', alt: 'Industrial interior with grid windows and long shadows on a concrete floor' },
};
