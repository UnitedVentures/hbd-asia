import {
  IconArrowRight, IconArrowUpRight, IconArrowDown, IconArrowLeft, IconClockHour4, IconCompass, IconUserCheck, IconSparkles, IconLeaf,
  IconPlaneArrival, IconCar, IconRoute, IconBrandInstagram, IconBrandFacebook, IconBrandWhatsapp, IconMail, IconPhone, IconMapPin,
  IconBuildingSkyscraper, IconBuildingFortress, IconBuildingMonument, IconBuildingPavilion, IconPaw, IconTrees, IconTrain, IconKayak, IconBinoculars, IconWaveSine, IconAnchor, IconSailboat, IconCoffee,
  IconMenu2, IconX, IconPlus, IconMinus, IconCheck, IconMountain, IconBeach, IconYoga, IconCalendar, IconSun, IconClock, IconBed,
} from '@tabler/icons-react'

const MAP = {
  'arrow-right': IconArrowRight, 'arrow-up-right': IconArrowUpRight, 'arrow-down': IconArrowDown, 'arrow-left': IconArrowLeft,
  clock: IconClockHour4, compass: IconCompass, 'user-check': IconUserCheck, sparkles: IconSparkles, leaf: IconLeaf,
  'plane-arrival': IconPlaneArrival, car: IconCar, route: IconRoute, instagram: IconBrandInstagram, facebook: IconBrandFacebook,
  whatsapp: IconBrandWhatsapp, mail: IconMail, phone: IconPhone, pin: IconMapPin, menu: IconMenu2, close: IconX, plus: IconPlus,
  minus: IconMinus, check: IconCheck, mountain: IconMountain, beach: IconBeach, yoga: IconYoga, calendar: IconCalendar, sun: IconSun,
  time: IconClock, bed: IconBed,
  city: IconBuildingSkyscraper, fortress: IconBuildingFortress, monument: IconBuildingMonument, pavilion: IconBuildingPavilion,
  paw: IconPaw, trees: IconTrees, train: IconTrain, kayak: IconKayak, binoculars: IconBinoculars, wave: IconWaveSine, anchor: IconAnchor,
  sailboat: IconSailboat, coffee: IconCoffee,
}

export default function Icon({ name, size = 20, stroke = 1.5, ...rest }) {
  const C = MAP[name]
  return C ? <C size={size} stroke={stroke} aria-hidden="true" {...rest} /> : null
}
