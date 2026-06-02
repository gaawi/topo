// Datos de EJEMPLO para el prototipo. El motor real los reemplazará con
// candidatos calculados desde Gmail (hilos pendientes) + HubSpot (contactos/proyectos).
// Los correos son ficticios (example.org) a propósito.

window.DATA = {
  date: new Date(),

  projects: [
    { id: "nyc", name: "Temporada NYC 26/27", desc: "Conciertos en DiMenna Center y salas de Nueva York.", contacts: 38, pending: 6, color: "#e0533d" },
    { id: "spain", name: "Gira España 2026", desc: "Festival ADAR, Asturias y norte de España.", contacts: 27, pending: 9, color: "#f0a93b" },
    { id: "adar27", name: "Festival ADAR 2027", desc: "Programación y co-producciones para la edición 2027.", contacts: 14, pending: 3, color: "#5aa9ff" },
    { id: "resid", name: "Residencias y colaboraciones", desc: "Universidades, galerías y espacios para arte visual + música.", contacts: 21, pending: 4, color: "#3ecf8e" },
  ],

  emails: [
    {
      id: 1, type: "reply", project: "nyc", priority: "Alta",
      to: "Sarah Whitman", org: "DiMenna Center", email: "programming@example.org",
      subject: "RE: Disponibilidad de sala — programa 'Currents' (30 oct 2026)",
      why: "Respondió hace 3 días confirmando interés y pidió ficha técnica. Sin responder.",
      body: `Hola Sarah:\n\nGracias por la rápida respuesta y por confirmar el interés en "Currents". Adjunto la ficha técnica y el programa: incluye estrenos de Yurui (Rain) y Eric Moe junto al Quinteto de Sibelius (40').\n\n¿Te vendría bien una llamada esta semana para cerrar fecha y horario de montaje? Tengo disponible jueves y viernes por la tarde.\n\nUn abrazo,\nGuillermo Laporta\nCreArtBox`
    },
    {
      id: 2, type: "reply", project: "spain", priority: "Alta",
      to: "Marta Iglesias", org: "Festival ADAR", email: "direccion@example.org",
      subject: "RE: Fechas agosto 2026 — 'The Silent Project' y 'UMBRAL ZERO'",
      why: "Hilo abierto sobre cachés y alojamiento del 10-13 ago. Falta confirmar tu parte.",
      body: `Querida Marta:\n\nPerfecto con las fechas del 10 al 13 de agosto. Confirmo "The Silent Project" con el Trío Barcelona y "UMBRAL ZERO" en Belmonte de Miranda.\n\n¿Podemos cerrar el caché y el alojamiento para los cinco intérpretes? Te paso el rider técnico para los espacios de Villanueva de Oscos y El Franco.\n\nGracias por todo el cariño con el festival.\nUn abrazo,\nGuillermo`
    },
    {
      id: 3, type: "reply", project: "resid", priority: "Media",
      to: "Dr. James Holloway", org: "Illinois College", email: "music@example.org",
      subject: "RE: Recital de trío — Rammelkamp Chapel (6 nov 2026)",
      why: "Pidió biografías y fotos en alta para el programa de mano. Pendiente de enviar.",
      body: `Dear Dr. Holloway,\n\nThank you — we're delighted to confirm the piano trio program for November 6 at Rammelkamp Chapel.\n\nI'm attaching our bios and high-resolution photos for the program. The set includes Shostakovich's Piano Trio No. 1, Lili Boulanger's Nocturne and Casarrubios' "Silbo".\n\nWould you like me to send a short note for your audience newsletter as well?\n\nWarm regards,\nGuillermo Laporta — CreArtBox`
    },
    {
      id: 4, type: "reply", project: "nyc", priority: "Media",
      to: "Plaxall Gallery", org: "Plaxall Art Gallery (Queens)", email: "events@example.org",
      subject: "RE: Conciertos en Queens — propuesta noviembre",
      why: "Mencionaron compartir taquilla 50/50. Hay que proponer fechas concretas.",
      body: `Hola equipo de Plaxall:\n\nGracias por la apertura a recibirnos. Para los conciertos de noviembre proponemos dos fechas de fin de semana con un programa de cámara + proyección visual (arte + música).\n\nEntiendo el reparto de taquilla 50/50 y el ensayo en sala. ¿Os encajan los sábados 14 o 21? Os mando dossier con el formato escénico.\n\nGracias,\nGuillermo — CreArtBox`
    },
    {
      id: 5, type: "reply", project: "adar27", priority: "Baja",
      to: "Caroline Shaw Office", org: "Compositora invitada", email: "studio@example.org",
      subject: "RE: Encargo 'Oranges' para ADAR 2027",
      why: "Conversación sobre arreglo y caché del encargo. Falta tu confirmación de presupuesto.",
      body: `Hi,\n\nThank you for the details on "Oranges". We'd love to feature it at Festival ADAR 2027 alongside the Brahms quartet.\n\nThe budget you outlined works on our end. Could you confirm the delivery timeline for the parts so we can plan rehearsals?\n\nBest,\nGuillermo Laporta — CreArtBox`
    },
    {
      id: 6, type: "new", project: "nyc", priority: "Alta",
      to: "Director/a de programación", org: "(Sala) The Tank — NYC", email: "booking@example.org",
      subject: "Propuesta: música de cámara + arte visual en The Tank",
      why: "Ya tocasteis 'Lipstick' ahí en el pasado. Sin contacto hace >12 meses: reactivar.",
      body: `Hola:\n\nSoy Guillermo Laporta, director de CreArtBox. Hace un tiempo presentamos "Lipstick" en The Tank y nos encantaría volver con nuestra nueva temporada, que combina música de cámara con arte visual y teatro.\n\n¿Tendríais disponibilidad para una velada esta temporada? Os comparto vídeo y dossier.\n\nGracias por vuestro tiempo,\nGuillermo Laporta — CreArtBox`
    },
    {
      id: 7, type: "new", project: "spain", priority: "Alta",
      to: "Programación", org: "Auditorio de El Franco (Asturias)", email: "cultura@example.org",
      subject: "Concierto CreArtBox en gira por Asturias — agosto 2026",
      why: "Encaja geográficamente con la gira ADAR. Nuevo contacto en zona de la gira.",
      body: `Estimado equipo del Auditorio de El Franco:\n\nDurante agosto de 2026 CreArtBox estará de gira por Asturias en el marco del Festival ADAR. Nos encantaría incluir El Franco con un programa de cámara ("Oranges" de Caroline Shaw y cuarteto de Brahms).\n\n¿Podríamos explorar una fecha entre el 9 y el 13 de agosto? Quedo atento.\n\nUn cordial saludo,\nGuillermo Laporta — CreArtBox`
    },
    {
      id: 8, type: "new", project: "resid", priority: "Media",
      to: "Dirección artística", org: "Chamber Music Society of Louisville", email: "info@example.org",
      subject: "Propuesta de programa para temporada 2026/27",
      why: "Ya programaron 'NO TITLE' en feb. Buen momento para proponer la siguiente temporada.",
      body: `Dear Chamber Music Society of Louisville,\n\nIt was a pleasure to share our February program with your audience. For the 2026/27 season we're touring a program built around Ravel's "Ma Mère l'Oye", Dvořák's Piano Quintet and a Lili Boulanger Nocturne.\n\nWould you be open to discussing a date? Happy to send full materials.\n\nWarm regards,\nGuillermo Laporta — CreArtBox`
    },
    {
      id: 9, type: "new", project: "adar27", priority: "Media",
      to: "Equipo de programación", org: "Digital Concert Hall", email: "partners@example.org",
      subject: "Posible grabación/streaming de la temporada CreArtBox",
      why: "Aparece como canal en tu hoja maestra. Oportunidad de difusión digital.",
      body: `Hola:\n\nCreArtBox prepara una temporada 26/27 con estrenos y un fuerte componente visual. Nos interesaría explorar una colaboración de grabación o streaming.\n\n¿Sería posible una llamada para ver formatos y condiciones? Encantado de enviar repertorio y fechas.\n\nGracias,\nGuillermo Laporta — CreArtBox`
    },
    {
      id: 10, type: "new", project: "nyc", priority: "Baja",
      to: "Coordinación cultural", org: "Saugerties Pro Musica", email: "concerts@example.org",
      subject: "Trío (flauta, cello y piano) — fecha en abril 2027",
      why: "Saugerties figura en tu calendario (18 abr 2027). Confirmar interlocutor y fecha.",
      body: `Hola:\n\nCreArtBox tiene previsto un trío de flauta, cello y piano en abril de 2027 y nos gustaría incluir Saugerties en la ruta.\n\n¿Quién sería la persona de contacto para coordinar fecha y sala? Os comparto programa y necesidades técnicas.\n\nGracias,\nGuillermo Laporta — CreArtBox`
    },
  ],

  contacts: [
    { name: "Sarah Whitman", org: "DiMenna Center", city: "Nueva York", project: "Temporada NYC 26/27", status: "warm", last: "hace 3 días" },
    { name: "Marta Iglesias", org: "Festival ADAR", city: "Asturias", project: "Gira España 2026", status: "warm", last: "hace 4 días" },
    { name: "Dr. James Holloway", org: "Illinois College", city: "Jacksonville, IL", project: "Residencias", status: "warm", last: "hace 6 días" },
    { name: "Plaxall Art Gallery", org: "Plaxall", city: "Queens, NY", project: "Temporada NYC 26/27", status: "cool", last: "hace 9 días" },
    { name: "Caroline Shaw Office", org: "Compositora", city: "—", project: "Festival ADAR 2027", status: "cool", last: "hace 12 días" },
    { name: "The Tank", org: "Sala", city: "Nueva York", project: "Temporada NYC 26/27", status: "cold", last: "hace 14 meses" },
    { name: "Auditorio de El Franco", org: "Auditorio", city: "Asturias", project: "Gira España 2026", status: "cold", last: "sin contacto" },
    { name: "Chamber Music Society", org: "CMS Louisville", city: "Louisville, KY", project: "Residencias", status: "cool", last: "hace 3 meses" },
    { name: "Digital Concert Hall", org: "Streaming", city: "—", project: "Festival ADAR 2027", status: "cold", last: "sin contacto" },
    { name: "Saugerties Pro Musica", org: "Serie de conciertos", city: "Saugerties, NY", project: "Temporada NYC 26/27", status: "cold", last: "sin contacto" },
    { name: "Parador de Corias", org: "Espacio", city: "Asturias", project: "Gira España 2026", status: "cool", last: "hace 1 mes" },
    { name: "Trío Barcelona", org: "Colaboradores", city: "Barcelona", project: "Gira España 2026", status: "warm", last: "hace 2 días" },
  ],
};
