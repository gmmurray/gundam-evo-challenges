export type Unit = {
  id: string;
  name: string;
  avatar: string;
  websiteId: number;
  description: string;
  model: string;
};

export const unitOptions: Record<Unit['id'], Unit> = {
  pale_rider: {
    id: 'pale_rider',
    name: 'Pale Rider',
    avatar: 'pale_rider.png',
    websiteId: 1,
    description: `A prototype mobile suit developed by the Earth Federation Forces. Its unique HADES operating system grants superior combat performance, but puts an increased strain on the pilot and has limited operation time.`,
    model: `RX-80PR`,
  },
  gundam: {
    id: 'gundam',
    name: 'Gundam',
    avatar: 'gundam.png',
    websiteId: 2,
    description: `Trailing the Principality of Zeon in Mobile Suit development, the Federation developed this machine as part of Operation V to turn the tide. Boasts remarkable performance. Piloted by Amuro Ray.`,
    model: `RX-78-2`,
  },
  zaku_ranged: {
    id: 'zaku_ranged',
    name: 'Zaku II (Ranged)',
    avatar: 'zaku_ranged.png',
    websiteId: 3,
    description: `A mass-produced mobile suit developed by the Principality of Zeon. After overwhelming the Federation during the early days of the One Year War, the Zaku's versatile design spawned numerous variations. This model has an anti-mobile-suit Zaku Machine Gun as its main weapon.`,
    model: `MS-06`,
  },
  barbatos: {
    id: 'barbatos',
    name: 'Gundam Barbatos',
    avatar: 'barbatos.png',
    websiteId: 4,
    description: `One of the 72 Gundam Frames developed during the Calamity War. First unearthed on Mars, it eventually became Tekkadan's dominant battlefield weapon. Piloted by Mikazuki Augus.`,
    model: `ASW-G-08`,
  },
  sazabi: {
    id: 'sazabi',
    name: 'Sazabi',
    avatar: 'sazabi.png',
    websiteId: 5,
    description: `A Mobile Suit for Newtype pilots developed by Neo Zeon. Its cutting-edge Psycho-Frame provides unparalleled responsiveness, making the Sazabi the pinnacle of Zeon's Newtype design tech. Piloted by Char Aznable.`,
    model: `MSN-04`,
  },
  methuss: {
    id: 'methuss',
    name: 'Methuss',
    avatar: 'methuss.png',
    websiteId: 6,
    description: `The Methuss is the first transforming attack mobile suit developed by the AEUG. Easy to handle thanks to its simple transformation mechanism, it can also play support thanks to its energy supply cable.`,
    model: `MSA-005`,
  },
  gm_sniper: {
    id: 'gm_sniper',
    name: 'GM Sniper II',
    avatar: 'gm_sniper.png',
    websiteId: 7,
    description: `An offshoot of the GM, developed by the Federation Forces during the last days of the One Year War. With specs on par with the RX-78 Gundam and a sophisticated sensor array in its head, the GM Sniper II can use its head visor to snipe targets across staggeringly long distances.`,
    model: `RGM-79SP`,
  },
  asshimar: {
    id: 'asshimar',
    name: 'Asshimar',
    avatar: 'asshimar.png',
    websiteId: 8,
    description: `The first transforming mobile armor capable of self-sustaining flight within the Earth's atmosphere, the Asshimar's lifting body structure allows it to alter its aerodynamics by transforming its upper body into a disc shape.`,
    model: `NRX-044`,
  },
  dom_trooper: {
    id: 'dom_trooper',
    name: 'DOM Trooper',
    avatar: 'dom_trooper.png',
    websiteId: 9,
    description: `Although the DOM Trooper was originally intended to serve as ZAFT's next-generation machine, the Clyne Faction actually completed its design and deployed it in battle. The DOM Trooper's large, leg-mounted hovering units provide swift ground movement across all manner of terrain.`,
    model: `ZGMF-XX09T`,
  },
  turn_a: {
    id: 'turn_a',
    name: 'Turn A Gundam',
    avatar: 'turn_a.png',
    websiteId: 10,
    description: `A mysterious mobile suit found within a statue known as the White Doll. It was built with extraordinary technology, and legend speaks of it laying waste to Earth's civilization in a climactic battle long ago. Piloted by Loran Cehack.`,
    model: `WD-M01`,
  },
  guntank: {
    id: 'guntank',
    name: 'Guntank',
    avatar: 'guntank.png',
    websiteId: 11,
    description: `The first mobile suit successfully developed by the Earth Federation Forces as part of Operation V. Its tank-like design reveals a disparity between Federation and Zeon tech. It can launch the transforming Core Fighter stored inside its body.`,
    model: `RX-75`,
  },
  gm: {
    id: 'gm',
    name: 'GM',
    avatar: 'gm.png',
    websiteId: 12,
    description: `The main mobile suit of the Federation Forces. A low-cost version of the RX-78, GMs were mass produced and frequently deployed in combat alongside Ball combat pods.`,
    model: `RGM-79`,
  },
  marasai: {
    id: 'marasai',
    name: 'Marasai',
    avatar: 'marasai.png',
    websiteId: 14,
    description: `Developed by Anaheim Electronics, the Marasai was deployed by the Titans during the Gryps Conflict, and was later used by Neo Zeon Remnants.`,
    model: `RMS-108`,
  },
  exia: {
    id: 'exia',
    name: 'Gundam Exia',
    avatar: 'exia.png',
    websiteId: 13,
    description: `One of the four Gundams used by Celestial Being to end war through armed intervention. Developed to excel in melee combat under any conditions. Piloted by Setsuna F. Seiei.`,
    model: `GN-001`,
  },
  mahiroo: {
    id: 'mahiroo',
    name: 'Mahiroo',
    avatar: 'mahiroo.png',
    websiteId: 15,
    description: `The main mobile suit of the lunar Ghingnham Fleet. With a head full of sensors and an internal structure lined with artificial muscle fibers, the Mahiroo is clearly cut from a different cloth than other mobile suits of its time period.`,
    model: `G-838`,
  },
  zaku_melee: {
    id: 'zaku_melee',
    name: 'Zaku II (Melee)',
    avatar: 'zaku_melee.png',
    websiteId: 16,
    description: `A mass-produced mobile suit developed by the Principality of Zeon, the Zaku's versatile design spawned numerous variations. Vice Admiral Dozle Zabi's personal machine of this model is adorned with engravings and equipped with a large Heat Hawk.`,
    model: `MS-06`,
  },
  unicorn: {
    id: 'unicorn',
    name: 'Unicorn Gundam',
    avatar: 'unicorn.png',
    websiteId: 17,
    description:
      'The Unicorn utilizes the NT-D System, which activates against Newtypes and Cyber-Newtypes. Piloted by Banagher Links, whose psycho-waves resonate with the NT-D to become a supernatural force.',
    model: `RX-0`,
  },
  nu: {
    id: 'nu',
    name: 'Nu Gundam',
    avatar: 'nu.png',
    websiteId: 18,
    description:
      'The Nu Gundam was designed specifically for Newtypes, whose basic design came from the Federation’s ace Amuro Ray. The Psycho-Frame provides unparalleled responsiveness, and is equipped with Fin Funnels, guided weapons that are deployed to provide beam attacks and shield defenses at the same time.',
    model: `RX-93`,
  },
  hyperion: {
    id: 'hyperion',
    name: 'Hyperion Gundam',
    avatar: 'hyperion.png',
    websiteId: 19,
    description:
      'A unit that possesses two defensive arms—a shield and a barrier.While balanced for attack or defense for frontline and area control, its Armure Lumiere Lancer can break through enemy lines.',
    model: `CAT1-X1/3`,
  },
};
