//LVLUP — Data Layer

export type MenuCategory = 'cocteles' | 'burgers' | 'sushi' | 'snacks' | 'servicios' | 'promos';
export type ConsolaType = 'PS5' | 'Switch';
export type MesaType = 'Billar' | 'Jenga' | 'Ping Pong';

export interface MenuItem {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: MenuCategory;
  foto?: string;
  popular?: boolean;
  disponible: boolean;
  etiquetas?: string[];
  ingredientes?: string[];
  promo?: string;
}

export interface GamingStation {
  id: string;
  nombre: string;
  tipo: 'consola' | 'mesa';
  consola?: ConsolaType;
  mesa?: MesaType;
  precio30min?: number;
  precio1hora?: number;
  precioPorConsumo?: boolean;
  disponible: boolean;
  juegos?: string[];
  descripcion?: string;
  imagen?: string;
}

export interface Promo {
  id: string;
  titulo: string;
  descripcion: string;
  dias?: string[];
  horaInicio?: string;
  horaFin?: string;
  precioPromo?: number;
  activa: boolean;
  color: 'pink' | 'cyan' | 'purple';
  etiqueta?: string;
  rareza?: 'COMUN' | 'POCO COMUN' | 'RARA' | 'EPICA' | 'LEGENDARIA';
  icono?: string;
  c1?: string;
  c2?: string;
  dropPercent?: number;
}

export interface InfoGeneral {
  nombre: string;
  slogan: string;
  ubicacion: {
    lugar: string;
    ciudad: string;
    mapaLat: number;
    mapaLng: number;
  };
  horarios: Record<string, string>;
  contacto: {
    whatsapp: string;
    instagram: string;
  };
}

  // MENU ITEMS

export const menuItems: MenuItem[] = [
  // ── COCTELES GALÁCTICOS (4) ─────────────────────
  {
    id: 'c1', nombre: 'Luna Cósmica', descripcion: 'Coctel clásico refrescante con ron blanco premium, hierbabuena, jugo de limón fresco y toque gasificado',
    precio: 4.00, categoria: 'cocteles', disponible: true, popular: true, foto: '/images/cocteles/coctel_luna_cosmica.png',
    etiquetas: ['Clásico', 'Refrescante'], ingredientes: ['Ron Blanco', 'Hierbabuena', 'Limón', 'Azúcar', 'Soda']
  },
  {
    id: 'c2', nombre: 'Venus Tropical', descripcion: 'Mezcla dulce y exótica con vodka, jugo natural de piña, crema de coco y notas cítricas de aventura',
    precio: 4.00, categoria: 'cocteles', disponible: true, foto: '/images/cocteles/coctel_venus_tropical.png',
    etiquetas: ['Tropical', 'Frutal'], ingredientes: ['Vodka', 'Jugo de Piña', 'Crema de Coco', 'Cítricos']
  },
  {
    id: 'c3', nombre: 'Marte Red Punch', descripcion: 'Intenso y especiado con whisky escocés, toques de jengibre natural, lima y menta fresca',
    precio: 4.00, categoria: 'cocteles', disponible: true, foto: '/images/cocteles/coctel_marte_red_punch.png',
    etiquetas: ['Intenso', 'Especiado'], ingredientes: ['Whisky', 'Jengibre', 'Lima', 'Menta Fresca']
  },
  {
    id: 'c4', nombre: 'Supernova Signature LVLUP', descripcion: 'El coctel insignia de la casa con ron añejo venezolano, licor de naranja, jarabe especial y presentación flameada',
    precio: 10.00, categoria: 'cocteles', disponible: true, popular: true, foto: '/images/cocteles/coctel_supernova_signature.png',
    etiquetas: ['Signature', 'Insignia', 'Flameado'], ingredientes: ['Ron Añejo', 'Licor de Naranja', 'Jarabe Secreto LVLUP']
  },

  // ── BURGERS & PLATOS (4) ────────────────────────
  {
    id: 'b1', nombre: 'Hamburguesa Cyber Smash 180g', descripcion: 'Carne de res premium 180g sellada al grill, queso cheddar americano fundido, vegetales frescos y salsa especial LVLUP en pan brioche artesanal',
    precio: 7.00, categoria: 'burgers', disponible: true, popular: true, foto: '/images/hamburguesas/hamburguesa_cyber_smash.png',
    etiquetas: ['Popular', 'Smash 180g', 'Gourmet'], ingredientes: ['Carne Res 180g', 'Cheddar Fundido', 'Lechuga', 'Tomate', 'Salsa LVLUP', 'Pan Brioche']
  },
  {
    id: 'b2', nombre: 'Hamburguesa Titán Doble BBQ', descripcion: 'Doble carne de res jugosa, doble queso cheddar fundido, tocineta crujiente, aros de cebolla dorados y salsa BBQ ahumada artesanal',
    precio: 8.00, categoria: 'burgers', disponible: true, popular: true, foto: '/images/hamburguesas/hamburguesa_titan_doble_bbq.jpg',
    etiquetas: ['Doble Carne', 'Tocineta', 'BBQ'], ingredientes: ['2x Carne Res', 'Doble Cheddar', 'Tocineta Crujiente', 'Aros de Cebolla', 'Salsa BBQ']
  },
  {
    id: 'b3', nombre: 'Hamburguesa Fuego Crítico (Picante)', descripcion: 'Carne de res sazonada, queso fundido, jalapeños al grill, cebolla morada encurtida y mayonesa sriracha cremosa de la casa',
    precio: 8.00, categoria: 'burgers', disponible: true, foto: '/images/hamburguesas/hamburguesa_fuego_critico.jpg',
    etiquetas: ['Picante', 'Jalapeños Grill'], ingredientes: ['Carne Res Sazonada', 'Queso Pepper Jack', 'Jalapeños Asados', 'Cebolla Morada', 'Salsa Sriracha']
  },
  {
    id: 'b4', nombre: 'Hamburguesa Jefe Final 3X (XXL)', descripcion: 'La más imponente de la casa con triple carne de res a la parrilla, triple queso derretido, tocineta crujiente y cebolla caramelizada',
    precio: 9.00, categoria: 'burgers', disponible: true, foto: '/images/hamburguesas/hamburguesa_jefe_final_3x.jpg',
    etiquetas: ['Triple Carne', 'XXL', 'Jefe Final'], ingredientes: ['3x Carne Res', 'Mix de Quesos', 'Tocineta Crujiente', 'Cebolla Caramelizada']
  },

  // ── SUSHI & ROLLS (4) ───────────────────────────
  {
    id: 's1', nombre: 'Combo Nigiri Cyber Nori (6 piezas)', descripcion: 'Selección fresca de 6 piezas de nigiri con salmón noruego, atún rojo y camarón langostino sobre arroz sazonado',
    precio: 8.00, categoria: 'sushi', disponible: true, popular: true, foto: '/images/sushi/combo_nigiri_cyber_nori.jpg',
    etiquetas: ['Fresco', 'Salmón', 'Atún'], ingredientes: ['Salmón Noruego', 'Atún Rojo', 'Camarón', 'Arroz Sushi', 'Salsa Soya']
  },
  {
    id: 's2', nombre: 'Quantum Crunch Roll (Uramaki)', descripcion: 'Roll invertido con relleno de camarón tempura crujiente, queso crema y cubierta de láminas de aguacate fresco con salsa teriyaki',
    precio: 9.00, categoria: 'sushi', disponible: true, foto: '/images/sushi/roll_quantum_crunch.jpg',
    etiquetas: ['Camarón Tempura', 'Aguacate'], ingredientes: ['Camarón Tempura', 'Queso Crema', 'Aguacate Hass', 'Salsa Teriyaki', 'Sésamo']
  },
  {
    id: 's3', nombre: 'Roll Retrowave Salmón (Maki)', descripcion: 'Roll tradicional envuelto en alga nori crujiente con salmón fresco corte grueso, bastones de pepino japonés y toque de sésamo',
    precio: 8.00, categoria: 'sushi', disponible: true, foto: '/images/sushi/roll_retrowave_salmon.jpg',
    etiquetas: ['Clásico', 'Salmón Fresco'], ingredientes: ['Alga Nori', 'Salmón Fresco', 'Pepino Japonés', 'Arroz Sushi', 'Sésamo']
  },
  {
    id: 's4', nombre: 'Volcán Dinamita Flameado', descripcion: 'Roll relleno de cangrejo y queso crema, gratinado al soplete con pasta dinamita picante de cangrejo y reducción de anguila',
    precio: 10.00, categoria: 'sushi', disponible: true, popular: true, foto: '/images/sushi/roll_volcan_dinamita.jpg',
    etiquetas: ['Flameado', 'Picante', 'Especialidad'], ingredientes: ['Cangrejo Kanikama', 'Pasta Dinamita', 'Queso Crema', 'Salsa de Anguila', 'Masago']
  },

  // ── SNACKS & PARA COMPARTIR (4) ─────────────────
  {
    id: 'sn1', nombre: 'Cofre Popcorn Chicken (Loot Box)', descripcion: 'Abundante porción de trozos crujientes de pollo estilo popcorn sobre una cama de papas fritas con salsas tártara y miel mostaza',
    precio: 5.00, categoria: 'snacks', disponible: true, popular: true, foto: '/images/snacks/pollo_popcorn_loot_box.jpg',
    promo: '2x1', etiquetas: ['2x1', 'Popular', 'Pollo Crujiente'], ingredientes: ['Pollo Popcorn', 'Papas Fritas', 'Salsa Tártara', 'Miel Mostaza']
  },
  {
    id: 'sn2', nombre: 'Papas Turbo Cheddar & Tocineta', descripcion: 'Papas fritas rústicas con piel sazonadas con paprika ahumada, cubiertas con abundante queso cheddar líquido caliente y tocineta',
    precio: 5.00, categoria: 'snacks', disponible: true, foto: '/images/snacks/papas_turbo_cheddar_tocineta.jpg',
    etiquetas: ['Papas Rústicas', 'Cheddar'], ingredientes: ['Papas Rústicas', 'Queso Cheddar', 'Tocineta Picada', 'Paprika']
  },
  {
    id: 'sn3', nombre: 'Varitas de Maná (Tequeños x6)', descripcion: '6 Tequeños tradicionales dorados y crujientes rellenos de abundante queso blanco derretido, servidos con salsa tártara casera',
    precio: 7.00, categoria: 'snacks', disponible: true, popular: true,
    etiquetas: ['Tequeños', 'Queso', 'Popular'], ingredientes: ['Masa Artesanal', 'Queso Blanco', 'Salsa Tártara']
  },
  {
    id: 'sn4', nombre: 'Alitas Fénix BBQ Glaseadas', descripcion: '8 Alitas de pollo doradas glaseadas en salsa barbacoa ahumada artesanal con semillas de sésamo, bastones de apio y aderezo ranch',
    precio: 8.00, categoria: 'snacks', disponible: true,
    etiquetas: ['Alitas', 'BBQ Ahumada'], ingredientes: ['Alitas de Pollo', 'Salsa BBQ Ahumada', 'Bastones de Apio', 'Aderezo Ranch']
  },

  // ── SERVICIOS DE LICORES (4) ─────────────────────
  {
    id: 'sv1', nombre: 'Servicio Old Parr 12 Años Blended Scotch', descripcion: 'Botella de whisky escocés 12 años con hielera, vasos y acompañantes',
    precio: 45.00, categoria: 'servicios', disponible: true, popular: true,
    etiquetas: ['Premium', 'Whisky Escocés']
  },
  {
    id: 'sv2', nombre: 'Servicio Buchanan\'s 12 Años De Luxe', descripcion: 'Botella de Blended Scotch whisky suave con hielera y servicio de barra completo',
    precio: 45.00, categoria: 'servicios', disponible: true, popular: true,
    etiquetas: ['Premium', 'Whisky Escocés']
  },
  {
    id: 'sv3', nombre: 'Servicio Ron Cacique 500 Extra Añejo', descripcion: 'Ron venezolano reserva especial con servicio de hielo, limones y refrescos',
    precio: 25.00, categoria: 'servicios', disponible: true,
    etiquetas: ['Ron', 'Venezolano']
  },
  {
    id: 'sv4', nombre: 'Balde Corona Extra (Pack 6 Heladas)', descripcion: 'Balde con hielo y 6 cervezas Corona bien frías con rodajas de limón para compartir',
    precio: 15.00, categoria: 'servicios', disponible: true, popular: true,
    etiquetas: ['Cerveza', 'Pack 6']
  },
];

/* ──────────────────────────────────────────────
   GAMING STATIONS
   ────────────────────────────────────────────── */

export const gamingStations: GamingStation[] = [
  {
    id: 'g1',
    nombre: 'PlayStation 5 Next-Gen',
    tipo: 'consola',
    consola: 'PS5',
    precio30min: 3.00,
    precio1hora: 6.00,
    disponible: true,
    descripcion: 'Poder gráfico 4K HDR, audio 3D inmersivo y mandos DualSense con gatillos adaptativos para juego competitivo y versus.',
    juegos: ['Gráficos 4K HDR & 60/120 FPS', 'Controles DualSense Hápticos', 'Deportes, Lucha y Aventura', 'Partidas 1v1 y Cooperativo Local'],
  },
  {
    id: 'g2',
    nombre: 'Nintendo Switch Lounge',
    tipo: 'consola',
    consola: 'Switch',
    precio30min: 3.00,
    precio1hora: 6.00,
    disponible: true,
    descripcion: 'Diversión cooperativa y competitiva instantánea para grupos de amigos con mandos Joy-Con inalámbricos.',
    juegos: ['Multiplayer Local hasta 4 Jugadores', 'Controles Joy-Con Inalámbricos', 'Carreras, Party Games y Versus', 'Experiencia Grupal Dinámica'],
  },
  {
    id: 'g3',
    nombre: 'Mesa de Billar Profesional',
    tipo: 'mesa',
    mesa: 'Billar',
    precio30min: 3.00,
    precio1hora: 6.00,
    disponible: true,
    descripcion: 'Mesa de billar reglamentaria con paño de alta precisión. Tacos balanceados de madera, juego de bolas y tizas completos.',
    juegos: ['Mesa Reglamentaria Profesional', 'Paño y Bandas de Precisión', 'Tacos Balanceados de Madera', 'Tizas y Triángulo Incluidos'],
  },
  {
    id: 'g4',
    nombre: 'Torre Jenga Gigante XXL',
    tipo: 'mesa',
    mesa: 'Jenga',
    precio30min: 3.00,
    precio1hora: 6.00,
    disponible: true,
    descripcion: 'Bloques de madera maciza a escala gigante. El juego de estrategia, pulso y tensión definitivo para disfrutar en grupo.',
    juegos: ['Bloques de Madera Maciza XXL', 'Estrategia y Tensión en Grupo', 'Ideal para Compartir en Lounge', 'Retos y Dinámicas Grupales'],
  },
  {
    id: 'g5',
    nombre: 'Tenis de Mesa / Ping Pong',
    tipo: 'mesa',
    mesa: 'Ping Pong',
    precio30min: 3.00,
    precio1hora: 6.00,
    disponible: true,
    descripcion: 'Mesa de ping pong reglamentaria para duelos rápidos 1v1 o dobles con paletas pro y pelotas reglamentarias.',
    juegos: ['Mesa Reglamentaria Profesional', 'Paletas Pro y Pelotas Incluidas', 'Duelos 1v1 y Dobles', 'Partidas Rápidas y Dinámicas'],
  },
];

/* ──────────────────────────────────────────────
   PROMOS
   ────────────────────────────────────────────── */

export const promos: Promo[] = [
  {
    id: 'p1',
    titulo: 'Happy Hour Cocteles 2x1',
    descripcion: 'Dos cocteles de la casa por el precio de uno. De lunes a jueves de 4pm a 7pm.',
    dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves'],
    horaInicio: '16:00',
    horaFin: '19:00',
    activa: true,
    color: 'cyan',
    etiqueta: 'HAPPY HOUR',
    rareza: 'COMUN',
    icono: 'cocktail',
    c1: '#1a2a2e',
    c2: '#5df0d8',
    dropPercent: 90,
  },
  {
    id: 'p2',
    titulo: 'Cofre Popcorn Chicken 2x1',
    descripcion: 'Dos porciones crujientes de pollo popcorn con papas por el precio de una. Todos los días.',
    activa: true,
    color: 'pink',
    precioPromo: 7.00,
    etiqueta: 'TODO EL DIA',
    rareza: 'RARA',
    icono: 'snack',
    c1: '#1a2434',
    c2: '#4d9dff',
    dropPercent: 65,
  },
  {
    id: 'p3',
    titulo: 'Gamer Pack — Combo Absoluto',
    descripcion: '1 hora de consola (PS5 o Switch) + Hamburguesa Cyber Smash 180g + Bebida refrescante.',
    activa: true,
    color: 'purple',
    precioPromo: 12.00,
    etiqueta: 'COMBO',
    rareza: 'EPICA',
    icono: 'gamepad',
    c1: '#2a1a3a',
    c2: '#b26bff',
    dropPercent: 35,
  },
  {
    id: 'p4',
    titulo: 'Promo Burgers 2x1',
    descripcion: 'Dos hamburguesas Cyber Smash o Titán BBQ al precio de una. Exclusivo para consumo en local.',
    dias: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves'],
    activa: true,
    color: 'cyan',
    etiqueta: '2x1 BURGERS',
    rareza: 'POCO COMUN',
    icono: 'burger',
    c1: '#1a2e22',
    c2: '#7be07e',
    dropPercent: 75,
  },
];

/* ──────────────────────────────────────────────
   INFO GENERAL
   ────────────────────────────────────────────── */

export const infoGeneral: InfoGeneral = {
  nombre: 'LVLUP Game Bar & Lounge',
  slogan: 'Juega, Come, Vive la Noche',
  ubicacion: {
    lugar: 'Centro Comercial Las Virtudes',
    ciudad: 'Valencia, Venezuela',
    mapaLat: 10.1579,
    mapaLng: -67.9953,
  },
  horarios: {
    Lunes: '14:00 — 00:00',
    Martes: '14:00 — 00:00',
    Miercoles: '14:00 — 00:00',
    Jueves: '14:00 — 00:00',
    Viernes: '14:00 — 02:00',
    Sabado: '12:00 — 02:00',
    Domingo: '12:00 — 00:00',
  },
  contacto: {
    whatsapp: '+58 424-0000000',
    instagram: '@lvlup_gamebar',
  },
};
