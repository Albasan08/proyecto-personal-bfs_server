-- TABLA USUARIOS
CREATE TABLE users (
  uid_user VARCHAR(50) PRIMARY KEY,
  nombre_user VARCHAR(50) NOT NULL,
  apellido_user VARCHAR(75) NOT NULL,
  email_user VARCHAR(50) NOT NULL UNIQUE,
  contrasenia_user VARCHAR(150) NOT NULL,
  provincia_user VARCHAR(20) NOT NULL,
  id_stripe_pago VARCHAR(20),
  rol_user VARCHAR(20) DEFAULT 'user'
);
 
-- TABLA EXPERIENCIAS
CREATE TABLE experiences (
  id_expe SERIAL PRIMARY KEY,
  nombre_expe VARCHAR(100) NOT NULL,
  desc_corta_expe VARCHAR(250) NOT NULL,
  desc_larga_expe VARCHAR(750) NOT NULL,
  imagen_expe VARCHAR(200) NOT NULL,
  duracion_expe NUMERIC(3) NOT NULL,
  precio_expe NUMERIC,
  personas_max_expe NUMERIC
);

-- TABLA HORARIOS
CREATE TABLE timetables (
  id_hor SERIAL PRIMARY KEY,
  hora_inicio TIME,
  hora_fin TIME,
  hora_inicio_bloqueada TIME,
  hora_fin_bloqueada TIME
);

-- TABLA HORARIOS
CREATE TABLE schedules ( 
    id_program SERIAL PRIMARY KEY, 
    id_experience INT NOT NULL, 
    fechas_program DATE[] NOT NULL, 
    fechas_bloqueada DATE[], 
    id_horario_program INT NOT NULL, 
    
    CONSTRAINT fk_schedules_experiences FOREIGN KEY (id_experience) REFERENCES experiences (id_expe), 
    CONSTRAINT fk_schedules_timetables FOREIGN KEY (id_horario_program) REFERENCES timetables (id_hor) 
);

-- TABLA RESERVAS
CREATE TABLE reservations (
  id_reserva SERIAL PRIMARY KEY,
  email_user VARCHAR(50) NOT NULL,
  id_experience INT NOT NULL,
  fecha_reserva DATE NOT NULL,
  horario_reserva TIME NOT NULL,
  personas_reserva INT NOT NULL,
  estado_reserva BOOLEAN DEFAULT FALSE,
  
  CONSTRAINT fk_reservations_users FOREIGN KEY (email_user) REFERENCES users (email_user),
  CONSTRAINT fk_reservations_experiences_id FOREIGN KEY (id_experience) REFERENCES experiences (id_expe)
);

-- EXPERIENCIAS DE PRUEBA
-- CUIDADO: EL VALOR DE IMAGEN_EXPE ES TEMPORAL. SE ACONSEJA UNA VEZ CREADAS LAS EXPERIENCIAS DE PRUEBA DESDE LA INTERFAZ MODIFICAR EL CAMPO DE LA IMAGEN CON LAS IMÁGENES DE LA CARPETA FOTOGRAFIAS-EXPERIENCIAS-PRUEBAS
INSERT INTO experiences (
    nombre_expe,
    desc_corta_expe,
    desc_larga_expe,
    imagen_expe,
    duracion_expe,
    precio_expe,
    personas_max_expe )

VALUES (
    'Zahari Fine Experience',
    '<p>Una cata completa de los <strong>vinos más especiales de Neohazi, </strong>algunos de viñedos singulares, maridados con aperitivos y disfrutados en un espacio con vistas únicas al paisaje vasco.</p>',
    '<p>Sumérgete en la esencia de Zahari con una cata guiada de nuestros vinos más exclusivos, incluidos aquellos procedentes de viñedos singulares.</p><p>Cada vino se <strong>acompaña de un aperitivo</strong> diseñado para potenciar sus matices.</p><p>La experiencia incluye un <strong>recorrido por la bodega y finaliza en nuestro salón panorámico,</strong> un espacio privilegiado desde el que contemplar el paisaje que da vida a nuestros vinos. Una propuesta ideal para quienes buscan conocer Zahari de forma profunda y sensorial.</p>',
    '1767908214958-zahari-fine-experience.jpg',
    90,
    42,
    12
);

INSERT INTO experiences (
    nombre_expe,
    desc_corta_expe,
    desc_larga_expe,
    imagen_expe,
    duracion_expe,
    precio_expe,
    personas_max_expe )

VALUES (
    'Zahari Private Winecar Tour',
    '<p>Un recorrido exclusivo para dos personas por los viñedos y la bodega Zahari, con cata completa y aperitivos maridados en un espacio reservado.</p>',
    '<p>Vive Zahari sin prisas en un tour diseñado para dos personas.</p><p>Comenzamos frente a la bodega, donde arquitectura y naturaleza se funden. Recorremos nuestros viñedos más representativos y descubrimos parcelas recuperadas con historia propia.</p><p>La visita continúa en la <strong>sala de barricas</strong> y culmina en un <strong>salón privado</strong> donde cataréis toda la gama de Zahari, acompañada de aperitivos seleccionados. Incluye fotografía de recuerdo y atención personalizada.</p><p>Una experiencia 360º perfecta para parejas que buscan algo único.</p>',
    '1767908308661-zahari-private-winecar-tour.jpg',
    120,
    200,
    2
);

INSERT INTO experiences (
    nombre_expe,
    desc_corta_expe,
    desc_larga_expe,
    imagen_expe,
    duracion_expe,
    precio_expe,
    personas_max_expe )

VALUES (
    'Viñedo Zahari & Cata',
    '<p>Un recorrido por el viñedo Zahari, visita a la <strong>sala de barricas</strong> y cata de dos vinos con aperitivo local.</p>',
    '<p>Una experiencia que une naturaleza, tradición y arquitectura.</p><p>Comenzamos en el viñedo Zahari, donde explicamos el clima, los suelos y la historia de vides centenarias que representan el legado de la región.</p><p>Continuamos en la sala de barricas y finalizamos con la cata de dos vinos en un <strong>salón con vistas, acompañados de un aperitivo local.</strong> Una propuesta ideal para quienes desean descubrir Zahari desde su origen.</p>',
    '1767908175482-vinedo-zahari-cata.jpg',
    90,
    42,
    12
);

INSERT INTO experiences (
    nombre_expe,
    desc_corta_expe,
    desc_larga_expe,
    imagen_expe,
    duracion_expe,
    precio_expe,
    personas_max_expe )

VALUES (
    'Zahari Sunset Tasting',
    '<p>Una cata al <strong>atardecer entre viñedos</strong>, con música suave, vinos seleccionados y aperitivos locales.</p><p>Una experiencia sensorial para desconectar.</p>',
    '<p>Vive el atardecer desde los viñedos de Zahari con una cata guiada al aire libre.</p><p>Disfrutarás de una selección de vinos acompañados de aperitivos locales <strong>mientras el paisaje se tiñe de colores cálidos. </strong>Música suave, ambiente relajado y un entorno natural que invita a desconectar.</p><p>Una experiencia perfecta para parejas, amigos o quienes buscan un momento especial en plena naturaleza.</p>',
    '1767908134898-zahari-sunset-tasting.jpg',
    90,
    57,
    12
);

INSERT INTO experiences (
    nombre_expe,
    desc_corta_expe,
    desc_larga_expe,
    imagen_expe,
    duracion_expe,
    precio_expe,
    personas_max_expe )

VALUES (
    'Zahari Wine & Local Bites',
    '<p>Cata <strong>maridada con productos locales:</strong> quesos, embutidos, panes artesanos y conservas de proximidad.</p>',
    '<p>Una experiencia pensada para amantes de la gastronomía local.</p><p>Cataremos <strong>cuatro vinos Zahari maridados</strong> con productos de pequeños productores del entorno: quesos artesanos, embutidos, panes de masa madre y conservas de temporada.</p><p>Una propuesta que celebra el KM0, la sostenibilidad y el sabor auténtico del territorio.</p><p>Ideal para quienes buscan una experiencia completa y deliciosa.</p>',
    '1767908261548-zahari-wine-local-bites.jpg',
    90,
    55,
    12
);

-- USUARIOS DE PRUEBA
-- SE RECOMIENDA USAR LA INTERFAZ PARA CREAR LOS USUARIOS, ESTOS PUEDEN USARSE PARA HACER PRUEBAS, TENIENDO EN CUENTA QUE AL PRINCIPIO SE DEBE CAMBIAR EL ROL PARA PODER PROBAR LAS DIFERENTES FUNCIONES
Usuario 1 - rol admin:
    - Nombre usuario: Admin
    - Apellido usuario: Experiencias
    - Email usuario: admin@gmail.com
    - Contraseña usuario: Admin12345@
    - Provincia: Álava

Usuario 2 - rol program:
    - Nombre usuario: Program
    - Apellido usuario: Gestor
    - Email usuario: programgestor@gmail.com
    - Contraseña usuario: ProgramGestor1@
    - Provincia: Álava

Usuario 3 - rol user:
    - Nombre usuario: User
    - Apellido usuario: Normal
    - Email usuario: user@gmail.com
    - Contraseña usuario: User12345@
    - Provincia: Álava


-- RESERVAS DE PRUEBA
-- SE RECOMIENDA INSERTAR LA INFORMACIÓN UNA VEZ CREADOS LOS USUARIOS
INSERT INTO reservations (
    email_user,
    id_experience,
    fecha_reserva,
    horario_reserva,
    personas_reserva,
    estado_reserva
) 

VALUES
('admin@gmail.com', 1, '2025-02-10', '14:30:00', 2, FALSE),
('admin@gmail.com', 1, '2025-02-10', '14:30:00', 3, TRUE),
('admin@gmail.com', 1, '2025-02-10', '14:30:00', 3, FALSE),
('admin@gmail.com', 1, '2025-02-10', '14:30:00', 3, TRUE);
