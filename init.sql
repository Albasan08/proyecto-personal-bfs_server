-- ELIMINAR TABLAS SI EXISTEN
DROP TABLE IF EXISTS blocks;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS timetables;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS users;

-- TABLA USERS
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

-- TABLA EXPERIENCES
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

-- TABLA TIMETABLES
CREATE TABLE timetables (
  id_hor SERIAL PRIMARY KEY,
  temporada_hor VARCHAR(50) NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL
  );

-- TABLA SCHEDULES
CREATE TABLE schedules (
  id_program SERIAL PRIMARY KEY,
  id_experience INT NOT NULL,
  fechas_program DATE [],
  id_horario_program INT NOT NULL,
  
  CONSTRAINT fk_schedules_experiences FOREIGN KEY (id_experience) REFERENCES experiences (id_expe),
  CONSTRAINT fk_schedules_timetables FOREIGN KEY (id_horario_program) REFERENCES timetables (id_hor)
  );

-- TABLA RESERVATIONS
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

-- TABLA BLOCKS
CREATE TABLE blocks (
  id_bloqueo SERIAL PRIMARY KEY,
  id_program INT NOT NULL,
  fecha_bloqueada DATE [] NOT NULL,
  razon_bloqueo VARCHAR(100) NOT NULL,
  
  CONSTRAINT fk_blocks_schedules FOREIGN KEY (id_program) REFERENCES schedules (id_program)
  );

-- PENDIENTE AÑADIR LAS EXPERIENCIAS