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
      name: 'Luna Cósmica',
      description: 'Coctel clásico refrescante con ron blanco premium, hierbabuena, jugo de limón fresco y toque gasificado',
      price: 4.00,
      category: 'COCTELES' as const,
      photoUrl: '/images/cocteles/coctel_luna_cosmica.png',
      isAvailable: true,
      isPopular: true,
      tags: ['Clásico', 'Refrescante'],
      ingredients: ['Ron Blanco', 'Hierbabuena', 'Limón', 'Azúcar', 'Soda'],
      orderIndex: 1,
    },
    {
      name: 'Venus Tropical',
      description: 'Mezcla dulce y exótica con vodka, jugo natural de piña, crema de coco y notas cítricas de aventura',
      price: 4.00,
      category: 'COCTELES' as const,
      photoUrl: '/images/cocteles/coctel_venus_tropical.png',
      isAvailable: true,
      isPopular: false,
      tags: ['Tropical', 'Frutal'],
      ingredients: ['Vodka', 'Jugo de Piña', 'Crema de Coco', 'Cítricos'],
      orderIndex: 2,
    },
    {
      name: 'Marte Red Punch',
      description: 'Intenso y especiado con whisky escocés, toques de jengibre natural, lima y menta fresca',
      price: 4.00,
      category: 'COCTELES' as const,
      photoUrl: '/images/cocteles/coctel_marte_red_punch.png',
      isAvailable: true,
      isPopular: false,
      tags: ['Intenso', 'Especiado'],
      ingredients: ['Whisky', 'Jengibre', 'Lima', 'Menta Fresca'],
      orderIndex: 3,
    },
    {
      name: 'Supernova Signature LVLUP',
      description: 'El coctel insignia de la casa con ron añejo venezolano, licor de naranja, jarabe especial y presentación flameada',
      price: 10.00,
      category: 'COCTELES' as const,
      photoUrl: '/images/cocteles/coctel_supernova_signature.png',
      isAvailable: true,
      isPopular: true,
      tags: ['Signature', 'Insignia', 'Flameado'],
      ingredients: ['Ron Añejo', 'Licor de Naranja', 'Jarabe Secreto LVLUP'],
      orderIndex: 4,
    },

    // Burgers & Platos (4)
    {
      name: 'Hamburguesa Cyber Smash 180g',
      description: 'Carne de res premium 180g sellada al grill, queso cheddar americano fundido, vegetales frescos y salsa especial LVLUP en pan brioche artesanal',
      price: 7.00,
      category: 'BURGERS' as const,
      photoUrl: '/images/hamburguesas/hamburguesa_cyber_smash.png',
      isAvailable: true,
      isPopular: true,
      tags: ['Popular', 'Smash 180g', 'Gourmet'],
      ingredients: ['Carne Res 180g', 'Cheddar Fundido', 'Lechuga', 'Tomate', 'Salsa LVLUP', 'Pan Brioche'],
      orderIndex: 5,
    },
    {
      name: 'Hamburguesa Titán Doble BBQ',
      description: 'Doble carne de res jugosa, doble queso cheddar fundido, tocineta crujiente, aros de cebolla dorados y salsa BBQ ahumada artesanal',
      price: 8.00,
      category: 'BURGERS' as const,
      photoUrl: '/images/hamburguesas/hamburguesa_titan_doble_bbq.jpg',
      isAvailable: true,
      isPopular: true,
      tags: ['Doble Carne', 'Tocineta', 'BBQ'],
      ingredients: ['2x Carne Res', 'Doble Cheddar', 'Tocineta Crujiente', 'Aros de Cebolla', 'Salsa BBQ'],
      orderIndex: 6,
    },
    {
      name: 'Hamburguesa Fuego Crítico (Picante)',
      description: 'Carne de res sazonada, queso fundido, jalapeños al grill, cebolla morada encurtida y mayonesa sriracha cremosa de la casa',
      price: 8.00,
      category: 'BURGERS' as const,
      photoUrl: '/images/hamburguesas/hamburguesa_fuego_critico.jpg',
      isAvailable: true,
      isPopular: false,
      tags: ['Picante', 'Jalapeños Grill'],
      ingredients: ['Carne Res Sazonada', 'Queso Pepper Jack', 'Jalapeños Asados', 'Cebolla Morada', 'Salsa Sriracha'],
      orderIndex: 7,
    },
    {
      name: 'Hamburguesa Jefe Final 3X (XXL)',
      description: 'La más imponente de la casa con triple carne de res a la parrilla, triple queso derretido, tocineta crujiente y cebolla caramelizada',
      price: 9.00,
      category: 'BURGERS' as const,
      photoUrl: '/images/hamburguesas/hamburguesa_jefe_final_3x.jpg',
      isAvailable: true,
      isPopular: false,
      tags: ['Triple Carne', 'XXL', 'Jefe Final'],
      ingredients: ['3x Carne Res', 'Mix de Quesos', 'Tocineta Crujiente', 'Cebolla Caramelizada'],
      orderIndex: 8,
    },

    // Sushi & Rolls (4)
    {
      name: 'Combo Nigiri Cyber Nori (6 piezas)',
      description: 'Selección fresca de 6 piezas de nigiri con salmón noruego, atún rojo y camarón langostino sobre arroz sazonado',
      price: 8.00,
      category: 'SUSHI' as const,
      photoUrl: '/images/sushi/combo_nigiri_cyber_nori.jpg',
      isAvailable: true,
      isPopular: true,
      tags: ['Fresco', 'Salmón', 'Atún'],
      ingredients: ['Salmón Noruego', 'Atún Rojo', 'Camarón', 'Arroz Sushi', 'Salsa Soya'],
      orderIndex: 9,
    },
    {
      name: 'Quantum Crunch Roll (Uramaki)',
      description: 'Roll invertido con relleno de camarón tempura crujiente, queso crema y cubierta de láminas de aguacate fresco con salsa teriyaki',
      price: 9.00,
      category: 'SUSHI' as const,
      photoUrl: '/images/sushi/roll_quantum_crunch.jpg',
      isAvailable: true,
      isPopular: false,
      tags: ['Camarón Tempura', 'Aguacate'],
      ingredients: ['Camarón Tempura', 'Queso Crema', 'Aguacate Hass', 'Salsa Teriyaki', 'Sésamo'],
      orderIndex: 10,
    },
    {
      name: 'Roll Retrowave Salmón (Maki)',
      description: 'Roll tradicional envuelto en alga nori crujiente con salmón fresco corte grueso, bastones de pepino japonés y toque de sésamo',
      price: 8.00,
      category: 'SUSHI' as const,
      photoUrl: '/images/sushi/roll_retrowave_salmon.jpg',
      isAvailable: true,
      isPopular: false,
      tags: ['Clásico', 'Salmón Fresco'],
      ingredients: ['Alga Nori', 'Salmón Fresco', 'Pepino Japonés', 'Arroz Sushi', 'Sésamo'],
      orderIndex: 11,
    },
    {
      name: 'Volcán Dinamita Flameado',
      description: 'Roll relleno de cangrejo y queso crema, gratinado al soplete con pasta dinamita picante de cangrejo y reducción de anguila',
      price: 10.00,
      category: 'SUSHI' as const,
      photoUrl: '/images/sushi/roll_volcan_dinamita.jpg',
      isAvailable: true,
      isPopular: true,
      tags: ['Flameado', 'Picante', 'Especialidad'],
      ingredients: ['Cangrejo Kanikama', 'Pasta Dinamita', 'Queso Crema', 'Salsa de Anguila', 'Masago'],
      orderIndex: 12,
    },

    // Snacks & Para Compartir (4)
    {
      name: 'Cofre Popcorn Chicken (Loot Box)',
      description: 'Abundante porción de trozos crujientes de pollo estilo popcorn sobre una cama de papas fritas con salsas tártara y miel mostaza',
      price: 5.00,
      category: 'SNACKS' as const,
      photoUrl: '/images/snacks/pollo_popcorn_loot_box.jpg',
      isAvailable: true,
      isPopular: true,
      promoTag: '2x1',
      tags: ['2x1', 'Popular', 'Pollo Crujiente'],
      ingredients: ['Pollo Popcorn', 'Papas Fritas', 'Salsa Tártara', 'Miel Mostaza'],
      orderIndex: 13,
    },
    {
      name: 'Papas Turbo Cheddar & Tocineta',
      description: 'Papas fritas rústicas con piel sazonadas con paprika ahumada, cubiertas con abundante queso cheddar líquido caliente y tocineta',
      price: 5.00,
      category: 'SNACKS' as const,
      photoUrl: '/images/snacks/papas_turbo_cheddar_tocineta.jpg',
      isAvailable: true,
      isPopular: false,
      tags: ['Papas Rústicas', 'Cheddar'],
      ingredients: ['Papas Rústicas', 'Queso Cheddar', 'Tocineta Picada', 'Paprika'],
      orderIndex: 14,
    },
    {
      name: 'Varitas de Maná (Tequeños x6)',
      description: '6 Tequeños tradicionales dorados y crujientes rellenos de abundante queso blanco derretido, servidos con salsa tártara casera',
      price: 7.00,
      category: 'SNACKS' as const,
      photoUrl: '/images/snacks/menu_tequenos.png',
      isAvailable: true,
      isPopular: true,
      tags: ['Tequeños', 'Queso', 'Popular'],
      ingredients: ['Masa Artesanal', 'Queso Blanco', 'Salsa Tártara'],
      orderIndex: 15,
    },
    {
      name: 'Alitas Fénix BBQ Glaseadas',
      description: '8 Alitas de pollo doradas glaseadas en salsa barbacoa ahumada artesanal con semillas de sésamo, bastones de apio y aderezo ranch',
      price: 8.00,
      category: 'SNACKS' as const,
      photoUrl: '/images/snacks/menu_alitas_bbq.png',
      isAvailable: true,
      isPopular: false,
      tags: ['Alitas', 'BBQ Ahumada'],
      ingredients: ['Alitas de Pollo', 'Salsa BBQ Ahumada', 'Bastones de Apio', 'Aderezo Ranch'],
      orderIndex: 16,
    },

    // Servicios de Licores (4)
    {
      name: 'Servicio Old Parr 12 Años Blended Scotch',
      description: 'Botella de whisky escocés 12 años con hielera, vasos y acompañantes',
      price: 45.00,
      category: 'SERVICIOS' as const,
      photoUrl: '/images/servicios/menu_oldparr.png',
      isAvailable: true,
      isPopular: true,
      tags: ['Premium', 'Whisky Escocés'],
      ingredients: ['Botella Old Parr 12 Años', 'Hielera', 'Servicio de Barra'],
      orderIndex: 17,
    },
    {
      name: 'Servicio Buchanan\'s 12 Años De Luxe',
      description: 'Botella de Blended Scotch whisky suave con hielera y servicio de barra completo',
      price: 45.00,
      category: 'SERVICIOS' as const,
      photoUrl: '/images/servicios/menu_buchanans.png',
      isAvailable: true,
      isPopular: true,
      tags: ['Premium', 'Whisky Escocés'],
      ingredients: ['Botella Buchanan\'s 12', 'Hielera', 'Servicio de Barra'],
      orderIndex: 18,
    },
    {
      name: 'Servicio Ron Cacique 500 Extra Añejo',
      description: 'Ron venezolano reserva especial con servicio de hielo, limones y refrescos',
      price: 25.00,
      category: 'SERVICIOS' as const,
      photoUrl: '/images/servicios/menu_ron_cacique.png',
      isAvailable: true,
      isPopular: false,
      tags: ['Ron', 'Venezolano'],
      ingredients: ['Botella Cacique 500', 'Hielera', 'Limones', 'Refrescos'],
      orderIndex: 19,
    },
    {
      name: 'Balde Corona Extra (Pack 6 Heladas)',
      description: 'Balde con hielo y 6 cervezas Corona bien frías con rodajas de limón para compartir',
      price: 15.00,
      category: 'SERVICIOS' as const,
      photoUrl: '/images/servicios/menu_balde_corona.png',
      isAvailable: true,
      isPopular: true,
      tags: ['Cerveza', 'Pack 6'],
      ingredients: ['6 Cervezas Corona', 'Balde con Hielo', 'Limones'],
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
      description: 'Disfruta de cualquier coctel de la carta en 2x1 de lunes a jueves de 4pm a 7pm.',
      days: ['Lunes', 'Martes', 'Miercoles', 'Jueves'],
      startTime: '16:00',
      endTime: '19:00',
      isActive: true,
      tag: 'HAPPY HOUR',
      color: 'pink',
      promoPrice: 4.00,
    },
    {
      title: 'Cofre Popcorn Chicken 2x1',
      description: 'Por la compra de un Cofre Popcorn Chicken te llevas el segundo completamente gratis.',
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
      description: '1 hora de juego en PS5 o Switch más una Hamburguesa Cyber Smash 180g con papas.',
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
