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
    id: 'c1', nombre: 'Luna', descripcion: 'Coctel clásico con ingredientes premium seleccionados de la barra',
    precio: 4.00, categoria: 'cocteles', disponible: true, popular: true, foto: '/images/sample/cocktail.jpg',
    etiquetas: ['Clásico', 'Popular'], ingredientes: ['Ron', 'Limón', 'Azúcar', 'Soda']
  },
  {
    id: 'c2', nombre: 'Venus', descripcion: 'Mezcla tropical con frutos cítricos y espíritu aventurero',
    precio: 4.00, categoria: 'cocteles', disponible: true,
    etiquetas: ['Tropical'], ingredientes: ['Vodka', 'Jugo de Piña', 'Coco']
  },
  {
    id: 'c3', nombre: 'Marte', descripcion: 'Intenso y atrevido, para los que no le huyen a la aventura',
    precio: 4.00, categoria: 'cocteles', disponible: true,
    etiquetas: ['Intenso'], ingredientes: ['Whisky', 'Jengibre', 'Lima', 'Menta']
  },
  {
    id: 'c4', nombre: 'Supernova Signature', descripcion: 'La explosión de sabores más impresionante de todo el universo LVLUP',
    precio: 10.00, categoria: 'cocteles', disponible: true, popular: true,
    etiquetas: ['Signature', 'Estrella'], ingredientes: ['Ron Añejo', 'Licor de Naranja', 'Jarabe Especial']
  },

  // ── BURGERS & PLATOS (4) ────────────────────────
  {
    id: 'b1', nombre: 'Hamburguesa Interestelar', descripcion: 'Carne de res premium 180g, queso cheddar fundido, vegetales frescos y salsa secreta',
    precio: 7.00, categoria: 'burgers', disponible: true, popular: true, foto: '/images/sample/burger.jpg',
    etiquetas: ['Popular', 'Clásica'], ingredientes: ['Carne 180g', 'Cheddar', 'Lechuga', 'Tomate', 'Salsa secreta']
  },
  {
    id: 'b2', nombre: 'Hamburguesa Depredador', descripcion: 'Doble carne de res, doble queso cheddar, tocineta crujiente y salsa BBQ artesanal',
    precio: 8.00, categoria: 'burgers', disponible: true, popular: true,
    etiquetas: ['Doble Carne', 'BBQ'], ingredientes: ['2x Carne', 'Cheddar', 'Tocineta', 'Salsa BBQ']
  },
  {
    id: 'b3', nombre: 'Hamburguesa E.T. Picante', descripcion: 'Carne especiada, jalapeños al grill, queso pepper jack y salsa sriracha de la casa',
    precio: 8.00, categoria: 'burgers', disponible: true,
    etiquetas: ['Picante', 'Especiada'], ingredientes: ['Carne Res', 'Jalapeños', 'Pepper Jack', 'Sriracha']
  },
  {
    id: 'b4', nombre: 'Hamburguesa Armageddon XXL', descripcion: 'La más contundente con triple carne, mix de quesos derretidos y cebolla caramelizada',
    precio: 9.00, categoria: 'burgers', disponible: true,
    etiquetas: ['Triple Carne', 'XXL'], ingredientes: ['3x Carne', 'Mix Quesos', 'Cebolla Caramelizada']
  },

  // ── SUSHI & ROLLS (4) ───────────────────────────
  {
    id: 's1', nombre: 'Nigiri Surtido Fresco', descripcion: 'Selección de niguiris frescos con topping de salmón, atún o camarón sobre arroz sazonado',
    precio: 8.00, categoria: 'sushi', disponible: true, popular: true, foto: '/images/sample/sushi.jpg',
    etiquetas: ['Fresco', 'Popular'], ingredientes: ['Salmón', 'Atún', 'Arroz Sushi', 'Soya']
  },
  {
    id: 's2', nombre: 'Urumaki Especial', descripcion: 'Roll invertido con relleno de camarón tempura, queso crema y tope de aguacate',
    precio: 9.00, categoria: 'sushi', disponible: true,
    etiquetas: ['Invertido', 'Camarón'], ingredientes: ['Camarón Tempura', 'Queso Crema', 'Aguacate']
  },
  {
    id: 's3', nombre: 'Nori Maki Tradicional', descripcion: 'Rollo clásico envuelto en alga nori con salmón fresco, pepino y toque de sésamo',
    precio: 8.00, categoria: 'sushi', disponible: true,
    etiquetas: ['Clásico', 'Salmón'], ingredientes: ['Alga Nori', 'Salmón', 'Pepino', 'Sésamo']
  },
  {
    id: 's4', nombre: 'Dinamita Roll Flameado', descripcion: 'Roll picante bañado en salsa dinamita de cangrejo gratinada y queso fundido',
    precio: 10.00, categoria: 'sushi', disponible: true, popular: true,
    etiquetas: ['Picante', 'Signature'], ingredientes: ['Cangrejo', 'Salsa Dinamita', 'Queso Crema']
  },

  // ── SNACKS & NAVES (4) ──────────────────────────
  {
    id: 'sn1', nombre: 'Nave de Cotufas de Pollo', descripcion: 'Abundante porción de cotufas de pollo crujientes con papas fritas y salsas al gusto',
    precio: 5.00, categoria: 'snacks', disponible: true, popular: true, foto: '/images/sample/snack.jpg',
    promo: '2x1', etiquetas: ['2x1', 'Popular', 'Pollo'], ingredientes: ['Pollo Crujiente', 'Papas Fritas', 'Salsas']
  },
  {
    id: 'sn2', nombre: 'Servicio de Papas Rústicas', descripcion: 'Papas fritas sazonadas con sal marina, paprika y queso cheddar líquido',
    precio: 5.00, categoria: 'snacks', disponible: true,
    etiquetas: ['Clásico'], ingredientes: ['Papas', 'Cheddar', 'Paprika']
  },
  {
    id: 'sn3', nombre: 'Tequeños Gourmet con Tártara', descripcion: '6 Tequeños de queso blanco recién dorados con salsa tártara artesanal',
    precio: 7.00, categoria: 'snacks', disponible: true, popular: true,
    etiquetas: ['Queso', 'Popular'], ingredientes: ['Queso Blanco', 'Masa Artesanal', 'Salsa Tártara']
  },
  {
    id: 'sn4', nombre: 'Alitas BBQ Galácticas', descripcion: 'Alitas de pollo glaseadas en salsa BBQ ahumada con bastones de apio',
    precio: 8.00, categoria: 'snacks', disponible: true,
    etiquetas: ['Alitas', 'BBQ'], ingredientes: ['Alitas', 'Salsa BBQ', 'Aderezo Ranch']
  },

  // ── SERVICIOS DE LICORES (4) ─────────────────────
  {
    id: 'sv1', nombre: 'Servicio Old Parr 12 Años', descripcion: 'Botella de whisky escocés 12 años con hielera, vasos y acompañantes',
    precio: 45.00, categoria: 'servicios', disponible: true, popular: true,
    etiquetas: ['Premium', 'Whisky']
  },
  {
    id: 'sv2', nombre: 'Servicio Buchanan\'s 12', descripcion: 'Botella de Blended Scotch whisky suave con hielera y servicio de barra completo',
    precio: 45.00, categoria: 'servicios', disponible: true, popular: true,
    etiquetas: ['Premium', 'Whisky']
  },
  {
    id: 'sv3', nombre: 'Servicio Ron Cacique 500', descripcion: 'Ron venezolano reserva especial con servicio de hielo y refrescos',
    precio: 25.00, categoria: 'servicios', disponible: true,
    etiquetas: ['Ron', 'Venezolano']
  },
  {
    id: 'sv4', nombre: 'Balde de Cervezas Corona (Pack 6)', descripcion: 'Balde con hielo y 6 cervezas Corona bien frías para compartir',
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
    titulo: 'Happy Hour 2x1',
    descripcion: 'Dos Mojitos por el precio de uno. Todos los lunes a jueves.',
    dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves'],
    horaInicio: '16:00',
    horaFin: '19:00',
    activa: true,
    color: 'cyan',
    etiqueta: 'HAPPY HOUR'
  },
  {
    id: 'p2',
    titulo: 'Nave de Cotufas 2x1',
    descripcion: 'Dos naves de cotufas de pollo crujientes por el precio de una. Todos los dias.',
    activa: true,
    color: 'pink',
    precioPromo: 7.00,
    etiqueta: 'TODO EL DIA'
  },
  {
    id: 'p3',
    titulo: 'Gamer Pack — Combo Absoluto',
    descripcion: '1 hora de consola (PS5 o Switch) + Hamburguesa Interestelar + Bebida refrescante por un precio irresistible.',
    activa: true,
    color: 'purple',
    precioPromo: 12.00,
    etiqueta: 'COMBO'
  },
  {
    id: 'p4',
    titulo: 'Promo Burgers 2x1',
    descripcion: 'Dos hamburguesas Americanas o Interestelar los domingos a jueves. Una por persona.',
    dias: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves'],
    activa: true,
    color: 'cyan',
    etiqueta: '2x1 BURGERS'
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
