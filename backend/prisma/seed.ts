import { prisma } from '../src/core/prisma';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 Iniciando siembra (Seed) de la Base de Datos PostgreSQL de LVLUP (4 items x categoría)...');

  // 1. Limpiar tablas existentes para un reset limpio
  await prisma.menuItem.deleteMany();
  await prisma.gamingStation.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.businessInfo.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Administrador Principal
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@lvlup.com',
      password: hashedPassword,
      name: 'Administrador LVLUP',
      role: 'SUPERADMIN',
    },
  });
  console.log(`👤 Usuario Admin creado: ${admin.email}`);

  // 3. Catálogo de 20 Platos y Cocteles (4 por Categoría)
  const menuData = [
    // Cocteles (4)
    {
      name: 'Luna',
      description: 'Coctel clásico con ingredientes premium seleccionados de la barra',
      price: 4.00,
      category: 'COCTELES' as const,
      photoUrl: '/images/sample/cocktail.jpg',
      isAvailable: true,
      isPopular: true,
      tags: ['Clásico', 'Popular'],
      ingredients: ['Ron', 'Limón', 'Azúcar', 'Soda'],
      orderIndex: 1,
    },
    {
      name: 'Venus',
      description: 'Mezcla tropical con frutos cítricos y espíritu aventurero',
      price: 4.00,
      category: 'COCTELES' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Tropical'],
      ingredients: ['Vodka', 'Jugo de Piña', 'Coco'],
      orderIndex: 2,
    },
    {
      name: 'Marte',
      description: 'Intenso y atrevido, para los que no le huyen a la aventura',
      price: 4.00,
      category: 'COCTELES' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Intenso'],
      ingredients: ['Whisky', 'Jengibre', 'Lima', 'Menta'],
      orderIndex: 3,
    },
    {
      name: 'Supernova Signature',
      description: 'La explosión de sabores más impresionante de todo el universo LVLUP',
      price: 10.00,
      category: 'COCTELES' as const,
      isAvailable: true,
      isPopular: true,
      tags: ['Signature', 'Estrella'],
      ingredients: ['Ron Añejo', 'Licor de Naranja', 'Jarabe Especial'],
      orderIndex: 4,
    },

    // Burgers & Platos (4)
    {
      name: 'Hamburguesa Interestelar',
      description: 'Carne de res premium 180g, queso cheddar fundido, vegetales frescos y salsa secreta',
      price: 7.00,
      category: 'BURGERS' as const,
      photoUrl: '/images/sample/burger.jpg',
      isAvailable: true,
      isPopular: true,
      tags: ['Popular', 'Clásica'],
      ingredients: ['Carne 180g', 'Cheddar', 'Lechuga', 'Tomate', 'Salsa secreta'],
      orderIndex: 5,
    },
    {
      name: 'Hamburguesa Depredador',
      description: 'Doble carne de res, doble queso cheddar, tocineta crujiente y salsa BBQ artesanal',
      price: 8.00,
      category: 'BURGERS' as const,
      isAvailable: true,
      isPopular: true,
      tags: ['Doble Carne', 'BBQ'],
      ingredients: ['2x Carne', 'Cheddar', 'Tocineta', 'Salsa BBQ'],
      orderIndex: 6,
    },
    {
      name: 'Hamburguesa E.T. Picante',
      description: 'Carne especiada, jalapeños al grill, queso pepper jack y salsa sriracha de la casa',
      price: 8.00,
      category: 'BURGERS' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Picante', 'Especiada'],
      ingredients: ['Carne Res', 'Jalapeños', 'Pepper Jack', 'Sriracha'],
      orderIndex: 7,
    },
    {
      name: 'Hamburguesa Armageddon XXL',
      description: 'La más contundente con triple carne, mix de quesos derretidos y cebolla caramelizada',
      price: 9.00,
      category: 'BURGERS' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Triple Carne', 'XXL'],
      ingredients: ['3x Carne', 'Mix Quesos', 'Cebolla Caramelizada'],
      orderIndex: 8,
    },

    // Sushi & Rolls (4)
    {
      name: 'Nigiri Surtido Fresco',
      description: 'Selección de niguiris frescos con topping de salmón, atún o camarón sobre arroz sazonado',
      price: 8.00,
      category: 'SUSHI' as const,
      photoUrl: '/images/sample/sushi.jpg',
      isAvailable: true,
      isPopular: true,
      tags: ['Fresco', 'Popular'],
      ingredients: ['Salmón', 'Atún', 'Arroz Sushi', 'Soya'],
      orderIndex: 9,
    },
    {
      name: 'Urumaki Especial',
      description: 'Roll invertido con relleno de camarón tempura, queso crema y tope de aguacate',
      price: 9.00,
      category: 'SUSHI' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Invertido', 'Camarón'],
      ingredients: ['Camarón Tempura', 'Queso Crema', 'Aguacate'],
      orderIndex: 10,
    },
    {
      name: 'Nori Maki Tradicional',
      description: 'Rollo clásico envuelto en alga nori con salmón fresco, pepino y toque de sésamo',
      price: 8.00,
      category: 'SUSHI' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Clásico', 'Salmón'],
      ingredients: ['Alga Nori', 'Salmón', 'Pepino', 'Sésamo'],
      orderIndex: 11,
    },
    {
      name: 'Dinamita Roll Flameado',
      description: 'Roll picante bañado en salsa dinamita de cangrejo gratinada y queso fundido',
      price: 10.00,
      category: 'SUSHI' as const,
      isAvailable: true,
      isPopular: true,
      tags: ['Picante', 'Signature'],
      ingredients: ['Cangrejo', 'Salsa Dinamita', 'Queso Crema'],
      orderIndex: 12,
    },

    // Snacks & Naves (4)
    {
      name: 'Nave de Cotufas de Pollo',
      description: 'Abundante porción de cotufas de pollo crujientes con papas fritas y salsas al gusto',
      price: 5.00,
      category: 'SNACKS' as const,
      photoUrl: '/images/sample/snack.jpg',
      isAvailable: true,
      isPopular: true,
      promoTag: '2x1',
      tags: ['2x1', 'Popular', 'Pollo'],
      ingredients: ['Pollo Crujiente', 'Papas Fritas', 'Salsas'],
      orderIndex: 13,
    },
    {
      name: 'Servicio de Papas Rústicas',
      description: 'Papas fritas sazonadas con sal marina, paprika y queso cheddar líquido',
      price: 5.00,
      category: 'SNACKS' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Clásico'],
      ingredients: ['Papas', 'Cheddar', 'Paprika'],
      orderIndex: 14,
    },
    {
      name: 'Tequeños Gourmet con Tártara',
      description: '6 Tequeños de queso blanco recién dorados con salsa tártara artesanal',
      price: 7.00,
      category: 'SNACKS' as const,
      isAvailable: true,
      isPopular: true,
      tags: ['Queso', 'Popular'],
      ingredients: ['Queso Blanco', 'Masa Artesanal', 'Salsa Tártara'],
      orderIndex: 15,
    },
    {
      name: 'Alitas BBQ Galácticas',
      description: 'Alitas de pollo glaseadas en salsa BBQ ahumada con bastones de apio',
      price: 8.00,
      category: 'SNACKS' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Alitas', 'BBQ'],
      ingredients: ['Alitas', 'Salsa BBQ', 'Aderezo Ranch'],
      orderIndex: 16,
    },

    // Servicios de Licores (4)
    {
      name: 'Servicio Old Parr 12 Años',
      description: 'Botella de whisky escocés 12 años con hielera, vasos y acompañantes',
      price: 45.00,
      category: 'SERVICIOS' as const,
      isAvailable: true,
      isPopular: true,
      tags: ['Premium', 'Whisky'],
      ingredients: [],
      orderIndex: 17,
    },
    {
      name: 'Servicio Buchanan\'s 12',
      description: 'Botella de Blended Scotch whisky suave con hielera y servicio de barra completo',
      price: 45.00,
      category: 'SERVICIOS' as const,
      isAvailable: true,
      isPopular: true,
      tags: ['Premium', 'Whisky'],
      ingredients: [],
      orderIndex: 18,
    },
    {
      name: 'Servicio Ron Cacique 500',
      description: 'Ron venezolano reserva especial con servicio de hielo y refrescos',
      price: 25.00,
      category: 'SERVICIOS' as const,
      isAvailable: true,
      isPopular: false,
      tags: ['Ron', 'Venezolano'],
      ingredients: [],
      orderIndex: 19,
    },
    {
      name: 'Balde de Cervezas Corona (Pack 6)',
      description: 'Balde con hielo y 6 cervezas Corona bien frías para compartir',
      price: 15.00,
      category: 'SERVICIOS' as const,
      isAvailable: true,
      isPopular: true,
      tags: ['Cerveza', 'Pack 6'],
      ingredients: [],
      orderIndex: 20,
    },
  ];

  for (const item of menuData) {
    await prisma.menuItem.create({ data: item });
  }
  console.log(`🍔 20 Platos y Cocteles sembrados en la base de datos (4 por categoría).`);

  // 4. Estaciones de Juego (5)
  const stationsData = [
    {
      name: 'PlayStation 5 — Estación 1',
      type: 'CONSOLA' as const,
      price30min: 3.00,
      price1hour: 6.00,
      description: 'Gráficos 4K HDR a 120 FPS con respuesta háptica en mandos DualSense.',
      features: ['4K HDR', 'DualSense Háptico', 'Juegos de Combate & Deportes'],
      isAvailable: true,
      orderIndex: 1,
    },
    {
      name: 'PlayStation 5 — Estación 2',
      type: 'CONSOLA' as const,
      price30min: 3.00,
      price1hour: 6.00,
      description: 'Pantalla gaming de baja latencia para partidas competitivas 1v1 y cooperativo local.',
      features: ['Pantalla OLED', 'Audio Espacial 3D', 'Multijugador Local'],
      isAvailable: true,
      orderIndex: 2,
    },
    {
      name: 'Nintendo Switch Lounge',
      type: 'CONSOLA' as const,
      price30min: 3.00,
      price1hour: 6.00,
      description: 'Diversión para grupos de hasta 4 jugadores con Joy-Cons y party games.',
      features: ['Hasta 4 Jugadores', 'Joy-Cons Inalámbricos', 'Fiesta & Carreras'],
      isAvailable: true,
      orderIndex: 3,
    },
    {
      name: 'Mesa de Billar Reglamentaria',
      type: 'MESA' as const,
      price30min: 3.00,
      price1hour: 6.00,
      description: 'Paño profesional, tacos balanceados y juego de bolas de precisión.',
      features: ['Paño de Alta Velocidad', 'Tacos de Madera Maciza', 'Ambiente Lounge'],
      isAvailable: true,
      orderIndex: 4,
    },
    {
      name: 'Torre Jenga Gigante XXL & Tenis de Mesa',
      type: 'MESA' as const,
      price30min: 3.00,
      price1hour: 6.00,
      description: 'Juego de tensión en madera maciza y mesa de ping pong con paletas de competencia.',
      features: ['Torre Gigante', 'Mesa de Ping Pong', 'Diversión en Grupo'],
      isAvailable: true,
      orderIndex: 5,
    },
  ];

  for (const station of stationsData) {
    await prisma.gamingStation.create({ data: station });
  }
  console.log(`🎮 5 Estaciones Gaming sembradas en la base de datos.`);

  // 5. Promociones (4)
  const promosData = [
    {
      title: 'Happy Hour Cocteles 2x1',
      description: 'Disfruta de cualquier coctel de la carta en 2x1 de lunes a jueves.',
      days: ['Lunes', 'Martes', 'Miercoles', 'Jueves'],
      startTime: '16:00',
      endTime: '19:00',
      isActive: true,
      tag: 'HAPPY HOUR',
      color: 'pink',
      promoPrice: 4.00,
    },
    {
      title: 'Nave de Cotufas 2x1',
      description: 'Por la compra de una Nave de Cotufas de Pollo te llevas la segunda completamente gratis.',
      days: ['Martes', 'Miercoles'],
      startTime: '14:00',
      endTime: '22:00',
      isActive: true,
      tag: '2X1 SNACKS',
      color: 'cyan',
      promoPrice: 5.00,
    },
    {
      title: 'Gamer Pack: 1h Gaming + Burger',
      description: '1 hora de juego en PS5 o Switch más una Hamburguesa Interestelar con papas.',
      days: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
      isActive: true,
      tag: 'COMBO PACK',
      color: 'purple',
      promoPrice: 11.00,
    },
    {
      title: 'Jueves de Licores & Shots',
      description: 'Servicios de licores nacionales e importados con descuento especial en barra.',
      days: ['Jueves'],
      startTime: '18:00',
      endTime: '02:00',
      isActive: true,
      tag: 'BARRA LIBRE',
      color: 'pink',
    },
  ];

  for (const promo of promosData) {
    await prisma.promo.create({ data: promo });
  }
  console.log(`✨ 4 Promociones sembradas en la base de datos.`);

  // 6. Información del Negocio
  await prisma.businessInfo.create({
    data: {
      id: 'default',
      name: 'LVLUP Game Bar & Lounge',
      slogan: 'Juega, Come, Vive la Noche',
      address: 'Centro Comercial Las Virtudes, Valencia, Venezuela',
      whatsapp: '+58 424-0000000',
      instagram: '@lvlup_gamebar',
      hoursJson: {
        Lunes: '2:00pm — 12:00am',
        Martes: '2:00pm — 12:00am',
        Miercoles: '2:00pm — 12:00am',
        Jueves: '2:00pm — 12:00am',
        Viernes: '2:00pm — 2:00am',
        Sabado: '12:00pm — 2:00am',
        Domingo: '12:00pm — 12:00am',
      },
    },
  });
  console.log(`📍 Información del Negocio sembrada exitosamente.`);

  console.log('🚀 ¡Siembra (Seed) completada con éxito!');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
