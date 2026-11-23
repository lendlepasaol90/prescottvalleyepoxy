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
  valley: { file: 'prescott-valley-open-grassland-stretching-toward-distant-mountains', group: 'scene', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Open grassland stretching toward distant mountains" },
  grassPines: { file: 'prescott-valley-golden-grass-hillside-pine-trees-mountains', group: 'scene', w: 1600, h: 1070, widths: [480, 800, 1200, 1600], alt: "Golden grass on a hillside with pine trees and mountains beyond" },
  brownMountain: { file: 'prescott-valley-rugged-brown-peak-clear-blue-sky', group: 'scene', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Rugged brown peak under a clear blue sky" },
  grassSunset: { file: 'prescott-valley-tall-grass-glowing-setting-sun', group: 'scene', w: 1600, h: 1068, widths: [480, 800, 1200, 1600], alt: "Tall grass glowing in the setting sun" },
  dirtRoad: { file: 'prescott-valley-dirt-road-crossing-dry-grass-plain', group: 'scene', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Dirt road crossing a dry grass plain toward low mountains" },
  livingRoom: { file: 'prescott-valley-loft-living-room-dark-sectional-smooth', group: 'interior', w: 1600, h: 900, widths: [480, 800, 1200, 1600], alt: "Loft living room with a dark sectional over a smooth grey floor" },
  livingWindows: { file: 'prescott-valley-bright-living-room-large-windows-pale', group: 'interior', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Bright living room with large windows and a pale floor" },
  dining: { file: 'prescott-valley-dining-room-long-table-pendant-lights', group: 'interior', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "Dining room with a long table and pendant lights" },
  laundry: { file: 'prescott-valley-laundry-room-matching-washer-dryer-farmhouse', group: 'interior', w: 1600, h: 1400, widths: [480, 800, 1200, 1600], alt: "Laundry room with a matching washer and dryer and a farmhouse sink" },
  laundryWindow: { file: 'prescott-valley-white-laundry-room-large-window-washing', group: 'interior', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "White laundry room with a large window and washing machine" },
  housePool: { file: 'prescott-valley-modern-home-covered-patio-beside-long', group: 'outdoor', w: 1600, h: 1200, widths: [480, 800, 1200, 1600], alt: "Modern home with a covered patio beside a long pool" },
  garageTwo: { file: 'prescott-valley-grey-suv-doors-open-bright-clean', group: 'garage', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Grey SUV with its doors open in a bright, clean garage" },
  garageCouple: { file: 'prescott-valley-two-white-garage-doors-yellow-sided', group: 'garage', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Two white garage doors on a yellow-sided home" },
  garageSport: { file: 'prescott-valley-car-headlights-brightly-lit-service-bay', group: 'garage', w: 1600, h: 1091, widths: [480, 800, 1200, 1600], alt: "Car with its headlights on in a brightly lit service bay" },
  vintageGarage: { file: 'prescott-valley-vintage-yellow-black-car-parked-concrete', group: 'garage', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Vintage yellow and black car parked in a concrete garage" },
  autoShop: { file: 'prescott-valley-automotive-shop-two-post-lifts-concrete', group: 'industrial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Automotive shop with two-post lifts over a concrete floor" },
  liftCar: { file: 'prescott-valley-car-raised-scissor-lift-busy-service', group: 'industrial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Car raised on a scissor lift in a busy service garage" },
  warehouseSun: { file: 'prescott-valley-shafts-sunlight-falling-dark-industrial-interior', group: 'industrial', w: 1600, h: 1199, widths: [480, 800, 1200, 1600], alt: "Shafts of sunlight falling across a dark industrial interior" },
  warehouseGrid: { file: 'prescott-valley-late-sunlight-through-tall-windows-empty', group: 'industrial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Late sunlight through tall windows onto an empty concrete floor" },
  xMotoShop: { file: 'prescott-valley-man-motorcycle-brick-walled-garage-workshop', group: 'garage', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Man with a motorcycle in a brick-walled garage workshop" },
  xMotoLift: { file: 'prescott-valley-motorcycle-lift-tidy-repair-garage', group: 'garage', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Motorcycle on a lift in a tidy repair garage" },
  xBodyShop: { file: 'prescott-valley-cars-repair-large-metal-walled-body', group: 'garage', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Cars under repair in a large metal-walled body shop" },
  garageBright: { file: 'prescott-valley-empty-bright-garage-white-walls-light', group: 'garage', w: 1600, h: 1067, widths: [480, 800, 1200, 1600], alt: "Empty, bright garage with white walls and a light grey floor" },
  xFirePatio: { file: 'prescott-valley-backyard-patio-fire-pit-red-chairs', group: 'outdoor', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Backyard patio with a fire pit and red chairs" },
  xMudroom: { file: 'prescott-valley-mudroom-wooden-cubbies-coats-smooth-floor', group: 'interior', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Mudroom with wooden cubbies, coats and a smooth floor" },
  xEntry: { file: 'prescott-valley-entryway-coat-rack-shoe-storage-white', group: 'interior', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Entryway with a coat rack and shoe storage by a white brick wall" },
  xLiving: { file: 'prescott-valley-modern-living-room-sectional-sofa-pale', group: 'interior', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Modern living room with a sectional sofa and pale floor" },
  xPrimer: { file: 'prescott-valley-installer-rolling-primer-ground-concrete-floor', group: 'industrial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Installer rolling primer onto a ground concrete floor" },
  xSpikes: { file: 'prescott-valley-installer-spiked-shoes-working-fresh-self', group: 'industrial', w: 1600, h: 874, widths: [480, 800, 1200, 1600], alt: "Installer in spiked shoes working a fresh self-leveling coat" },
  xGrinder: { file: 'prescott-valley-concrete-grinder-dust-extraction-work-site', group: 'industrial', w: 1600, h: 1066, widths: [480, 800, 1200, 1600], alt: "Concrete grinder with dust extraction on a work site" },
};
