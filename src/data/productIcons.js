// Icon shown on a card until a real photo is added. Keys match product ids / category ids in products.js.
import {
  faMobileScreenButton, faMobileScreen, faTabletScreenButton, faPhone, faTv, faFan, faWind, faScissors,
  faVideo, faBolt, faFire, faSnowflake, faTemperatureLow, faMusic, faVolumeHigh, faLightbulb, faPlug,
  faBoxOpen, faBatteryFull, faShieldHalved, faHeadphones, faHeadset, faCamera, faSun, faBagShopping,
  faBorderAll,
} from '@fortawesome/free-solid-svg-icons';

export const fallbackIcon = faBoxOpen;
export const allProductsIcon = faBorderAll;

export const productIcons = {
  'android-phones': faMobileScreenButton,
  'iphones': faMobileScreen,
  'tablets': faTabletScreenButton,
  'button-phones': faPhone,
  'televisions': faTv,
  'standing-fans': faWind,
  'electric-clippers': faScissors,
  'cctv-cameras': faVideo,
  'electric-stabilizers': faBolt,
  'electric-cookers': faFire,
  'refrigerators': faSnowflake,
  'ceiling-fans': faFan,
  'freezers': faTemperatureLow,
  'sound-systems': faMusic,
  'bluetooth-speakers': faVolumeHigh,
  'light-bulbs': faLightbulb,
  'electrical-sockets': faPlug,
  'extension-boxes': faBoxOpen,
  'power-adapters': faBolt,
  'phone-cases': faShieldHalved,
  'screen-protectors': faMobileScreen,
  'usb-a-chargers': faPlug,
  'usb-c-chargers': faBolt,
  'wireless-chargers': faBatteryFull,
  'headphones': faHeadphones,
  'earpieces': faHeadset,
  'earbuds': faMusic,
  'power-banks-small': faBatteryFull,
  'power-banks-medium': faBatteryFull,
  'power-banks-high': faBatteryFull,
  'phone-pouches': faBagShopping,
  'tripods': faCamera,
  'selfie-sticks': faMobileScreenButton,
  'ring-lights': faSun,
  'rechargeable-torches': faBolt,
  'rechargeable-fans': faFan,
  'cooking-gas-cylinders': faFire,
};

export const categoryIcons = {
  'mobile-phones': faMobileScreenButton,
  'home-office': faTv,
  'electrical': faPlug,
  'phone-accessories': faHeadphones,
  'other-accessories': faBatteryFull,
  'other-products': faFire,
};
