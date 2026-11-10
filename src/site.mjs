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

// Licensed Envato Elements photography, self-hosted as WebP in src/assets/img (key-<width>.webp).
export const images = {
  valley: { file: 'valley', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Open grassland stretching toward distant mountains" },
  grassPines: { file: 'grassPines', w: 1600, h: 1070, widths: [480, 800, 1200, 1600], alt: "Golden grass on a hillside with pine trees and mountains beyond" },
  brownMountain: { file: 'brownMountain', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Rugged brown peak under a clear blue sky" },
  grassSunset: { file: 'grassSunset', w: 1600, h: 1068, widths: [480, 800, 1200, 1600], alt: "Tall grass glowing in the setting sun" },
  dirtRoad: { file: 'dirtRoad', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Dirt road crossing a dry grass plain toward low mountains" },
  livingRoom: { file: 'livingRoom', w: 1600, h: 900, widths: [480, 800, 1200, 1600], alt: "Loft living room with a dark sectional over a smooth grey floor" },
  livingWindows: { file: 'livingWindows', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Bright living room with large windows and a pale floor" },
  dining: { file: 'dining', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "Dining room with a long table and pendant lights" },
  laundry: { file: 'laundry', w: 1600, h: 1400, widths: [480, 800, 1200, 1600], alt: "Laundry room with a matching washer and dryer and a farmhouse sink" },
  laundryWindow: { file: 'laundryWindow', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "White laundry room with a large window and washing machine" },
  housePool: { file: 'housePool', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "Modern home with a covered patio beside a long pool" },
  garageTwo: { file: 'garageTwo', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Grey SUV with its doors open in a bright, clean garage" },
  garageCouple: { file: 'garageCouple', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Two white garage doors on a yellow-sided home" },
  garageSport: { file: 'garageSport', w: 1600, h: 1091, widths: [480, 800, 1200, 1600], alt: "Car with its headlights on in a brightly lit service bay" },
  vintageGarage: { file: 'vintageGarage', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Vintage yellow and black car parked in a concrete garage" },
  autoShop: { file: 'autoShop', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Automotive shop with two-post lifts over a concrete floor" },
  liftCar: { file: 'liftCar', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Car raised on a scissor lift in a busy service garage" },
  warehouseSun: { file: 'warehouseSun', w: 1600, h: 1199, widths: [480, 800, 1200, 1600], alt: "Shafts of sunlight falling across a dark industrial interior" },
  warehouseGrid: { file: 'warehouseGrid', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Late sunlight through tall windows onto an empty concrete floor" },
};
