/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 100414
 Source Host           : localhost:3306
 Source Schema         : media_tecnica_app

 Target Server Type    : MySQL
 Target Server Version : 100414
 File Encoding         : 65001

 Date: 11/10/2020 21:38:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for actores
-- ----------------------------
DROP TABLE IF EXISTS `actores`;
CREATE TABLE `actores`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `documento` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_documento` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombres` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono_celular` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `numero_expediente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `genero` enum('hombre','mujer') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_nacimiento` date NULL DEFAULT NULL,
  `estado_actor_id` int(5) NOT NULL DEFAULT 1,
  `institucion_id` int(5) NULL DEFAULT NULL,
  `tipo_actor_id` int(5) NULL DEFAULT 1,
  `fecha_creacion` timestamp(0) NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP(0),
  `fecha_actualizacion` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_documento`(`documento`) USING BTREE,
  UNIQUE INDEX `uq_numero_expediente`(`numero_expediente`) USING BTREE,
  INDEX `fk_estado_actor`(`estado_actor_id`) USING BTREE,
  INDEX `fk_tipo_actor`(`tipo_actor_id`) USING BTREE,
  INDEX `fk_institucion_estudiante`(`institucion_id`) USING BTREE,
  INDEX `fk_tipo_documento`(`tipo_documento`) USING BTREE,
  CONSTRAINT `fk_estado_actor` FOREIGN KEY (`estado_actor_id`) REFERENCES `estado_actores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tipo_actor` FOREIGN KEY (`tipo_actor_id`) REFERENCES `tipo_actores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_institucion_estudiante` FOREIGN KEY (`institucion_id`) REFERENCES `instituciones_educativas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tipo_documento` FOREIGN KEY (`tipo_documento`) REFERENCES `tipo_documento` (`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of actores
-- ----------------------------
INSERT INTO `actores` VALUES (1, '1152188863', 'CC', 'Oscar', 'Mesa', '34c958e8afa723e3806b37fffa2d64d2ee0ceef9', 'oscarmesa.elpoli@elpoli.edu.co', '3023458976', NULL, 'hombre', '1999-10-09', 1, NULL, 2, '2020-10-09 00:31:57', NULL);
INSERT INTO `actores` VALUES (2, '11348473389', 'TI', 'Carlos', 'Meneses', '047cf3044503d764a4e8ccf00edb03fb67454986', 'carlosmeneses@gmail.com', '3013984758', 'EXP-9038-2A', 'hombre', '2020-07-09', 1, 1, 1, '2020-10-09 01:12:23', NULL);
INSERT INTO `actores` VALUES (3, '11437382974', 'TI', 'Maria Victoria', 'Diaz Granados', '9039449fca7dd913d746909bafc3861e616d093c', 'victoriadiaz@gmail.com', '3093283274', 'KW-9803-A3C', 'mujer', '1999-07-01', 1, 2, 1, '2020-10-09 01:12:11', NULL);
INSERT INTO `actores` VALUES (4, '30948394823', 'PAP', 'David', 'Cadavid', '9f6397db432e1f6c33556b029b9900158804f885', 'davidcadavid@outlook.com', '3884773732', 'KQ-PU987-CE', 'hombre', '2002-11-21', 1, 2, 1, '2020-10-09 01:15:56', NULL);
INSERT INTO `actores` VALUES (5, '83974732638', 'TI', 'Diana', 'Patiño', 'f3812ab06e685886f615b6a8c38533f11fc0311b', 'dianapatiño@outlook.co', '3012938475', 'KI-EDU900-PAT', 'mujer', '2003-03-29', 1, 1, 1, '2020-10-09 01:25:53', NULL);
INSERT INTO `actores` VALUES (6, '45679483', 'CC', 'Juan', 'Perez', 'f08791d5049311667aaa321342da7d662a25ac29', 'juan123@gmail.com', '3012938473', NULL, 'hombre', '1989-02-14', 1, NULL, 2, '2020-10-09 02:49:07', NULL);

-- ----------------------------
-- Table structure for asistencias_sesiones
-- ----------------------------
DROP TABLE IF EXISTS `asistencias_sesiones`;
CREATE TABLE `asistencias_sesiones`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `sesion_clase_id` int(5) NULL DEFAULT NULL,
  `integrante_grupo_id` int(5) NULL DEFAULT NULL,
  `asiste` int(1) NULL DEFAULT 0 COMMENT 'Permite determina si el estudiante asiste o no a clase',
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `fecha_creacion` timestamp(0) NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_sesion_integrante`(`sesion_clase_id`, `integrante_grupo_id`) USING BTREE COMMENT 'Un integrante solo puede asistir una vez por sesion',
  INDEX `fk_integrante_grupo`(`integrante_grupo_id`) USING BTREE,
  CONSTRAINT `fk_integrante_grupo` FOREIGN KEY (`integrante_grupo_id`) REFERENCES `integrantes_grupos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_sesion_clase` FOREIGN KEY (`sesion_clase_id`) REFERENCES `sesiones_clases` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of asistencias_sesiones
-- ----------------------------
INSERT INTO `asistencias_sesiones` VALUES (1, 1, 2, 1, NULL, '2020-10-09 02:22:59');
INSERT INTO `asistencias_sesiones` VALUES (2, 1, 3, 1, 'Entro tarde a clase', '2020-10-09 02:23:28');
INSERT INTO `asistencias_sesiones` VALUES (3, 2, 2, 0, 'No asistio a clase', '2020-10-09 02:39:13');
INSERT INTO `asistencias_sesiones` VALUES (4, 2, 3, 1, NULL, '2020-10-09 02:39:21');
INSERT INTO `asistencias_sesiones` VALUES (5, 3, 4, 1, NULL, '2020-10-09 02:56:25');
INSERT INTO `asistencias_sesiones` VALUES (6, 3, 5, 1, NULL, '2020-10-09 02:56:33');
INSERT INTO `asistencias_sesiones` VALUES (7, 4, 4, 0, 'Estaba enfermo', '2020-10-09 02:56:49');
INSERT INTO `asistencias_sesiones` VALUES (8, 4, 5, 1, NULL, '2020-10-09 02:56:56');

-- ----------------------------
-- Table structure for clases
-- ----------------------------
DROP TABLE IF EXISTS `clases`;
CREATE TABLE `clases`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `grupo_id` int(5) NULL DEFAULT NULL,
  `modulo_id` int(5) NULL DEFAULT NULL,
  `docente_id` int(5) NULL DEFAULT NULL,
  `fecha_creacion` timestamp(0) NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP(0),
  `fecha_actualizacion` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_clases_modulo`(`modulo_id`) USING BTREE,
  INDEX `fk_clases_docente`(`docente_id`) USING BTREE,
  INDEX `uq_clase`(`grupo_id`, `modulo_id`, `docente_id`) USING BTREE,
  CONSTRAINT `fk_clases_docente` FOREIGN KEY (`docente_id`) REFERENCES `actores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_clases_grupo` FOREIGN KEY (`grupo_id`) REFERENCES `grupos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_clases_modulo` FOREIGN KEY (`modulo_id`) REFERENCES `modulos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clases
-- ----------------------------
INSERT INTO `clases` VALUES (1, 1, 3, 1, '2020-10-09 01:52:17', NULL);
INSERT INTO `clases` VALUES (2, 1, 1, 1, '2020-10-09 01:54:10', NULL);
INSERT INTO `clases` VALUES (3, 2, 2, 6, '2020-10-09 02:49:46', NULL);
INSERT INTO `clases` VALUES (4, 2, 4, 6, '2020-10-09 02:49:53', NULL);

-- ----------------------------
-- Table structure for estado_actores
-- ----------------------------
DROP TABLE IF EXISTS `estado_actores`;
CREATE TABLE `estado_actores`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of estado_actores
-- ----------------------------
INSERT INTO `estado_actores` VALUES (1, 'Activo');
INSERT INTO `estado_actores` VALUES (2, 'Inactivo');
INSERT INTO `estado_actores` VALUES (3, 'Retirado');

-- ----------------------------
-- Table structure for grupos
-- ----------------------------
DROP TABLE IF EXISTS `grupos`;
CREATE TABLE `grupos`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `institucion_id` int(5) NOT NULL,
  `grado` int(2) NOT NULL,
  `letra` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `a_formacion` int(4) NULL DEFAULT NULL COMMENT 'Año de formación',
  `descripcion` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_ie_grado`(`institucion_id`, `grado`, `a_formacion`) USING BTREE COMMENT 'Un grado, de una institucion educativa solo puede estar presente una sola vez en un año	0	\r\nUn grado, de una institucion educativa solo puede estar presente una sola vez en un año',
  CONSTRAINT `fk_ie_grupo` FOREIGN KEY (`institucion_id`) REFERENCES `instituciones_educativas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grupos
-- ----------------------------
INSERT INTO `grupos` VALUES (1, 1, 11, '1', 2020, '11-1 del año 2020');
INSERT INTO `grupos` VALUES (2, 2, 11, 'B', 2020, '11-B del año 2020');

-- ----------------------------
-- Table structure for instituciones_educativas
-- ----------------------------
DROP TABLE IF EXISTS `instituciones_educativas`;
CREATE TABLE `instituciones_educativas`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_ie` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `docente_encargado_mt` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pagina_web` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `direccion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `foto_ie` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `descripcion_ie` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `telefono_institucional` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `correo_institucional` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of instituciones_educativas
-- ----------------------------
INSERT INTO `instituciones_educativas` VALUES (1, 'Colegios EDU – S.E. Nuestra Señora de las Nieves – Medellín', 'Carlos', 'https://ielasnieves.edu.co', 'Calle 82 No 39- 69 Barrio Santa Inés', 'https://arquiniel.com/wp-content/uploads/2019/02/destacada_0004_NUESTRA-SEÑORA-1920x1200.jpg', 'El proyecto se ubica al nororiente de la ciudad de Medellín, Colombia, barrio Manrique central.', '571-00-70', 'ie.lasnieves@medellin.gov.co');
INSERT INTO `instituciones_educativas` VALUES (2, 'Institución Educativa Concejo De Medellín (I.E.C.M)', 'Lina Vásquez', 'http://www.concejodemedellin.edu.co/', 'Cra 82 # 47A - 65,\r\nBarrio Floresta', 'https://pbs.twimg.com/media/Df6SVMQXUAArdor.jpg', '2002: Por resolución No. 16290 de noviembre del 2002 y para dar cumplimiento a la Ley General de Educación se da término a la fusión con las escuelas destinadas por la Secretaria de Educación Departamental: Clodomiro Ramírez, Juan XXIII, y la Escuela Pichincha.', '(4) 4119115 - 411921', 'ie.concejodemellin@medellin.gov.co');

-- ----------------------------
-- Table structure for integrantes_grupos
-- ----------------------------
DROP TABLE IF EXISTS `integrantes_grupos`;
CREATE TABLE `integrantes_grupos`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `estudiante_id` int(5) NOT NULL,
  `grupo_id` int(5) NOT NULL,
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_grupo_integrantes`(`grupo_id`) USING BTREE,
  UNIQUE INDEX `uq_grupo_estudiante`(`estudiante_id`, `grupo_id`) USING BTREE,
  CONSTRAINT `fk_estudiante_integrante` FOREIGN KEY (`estudiante_id`) REFERENCES `actores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_grupo_integrantes` FOREIGN KEY (`grupo_id`) REFERENCES `grupos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of integrantes_grupos
-- ----------------------------
INSERT INTO `integrantes_grupos` VALUES (2, 2, 1, 'Estudiante inscrito');
INSERT INTO `integrantes_grupos` VALUES (3, 5, 1, 'Estudiante inscrito');
INSERT INTO `integrantes_grupos` VALUES (4, 3, 2, 'Estudiante inscrito');
INSERT INTO `integrantes_grupos` VALUES (5, 4, 2, 'Estudiante inscrito');

-- ----------------------------
-- Table structure for modulos
-- ----------------------------
DROP TABLE IF EXISTS `modulos`;
CREATE TABLE `modulos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mod` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_mod`(`mod`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of modulos
-- ----------------------------
INSERT INTO `modulos` VALUES (1, 'Cocnstrucción de Elementos de Software 1', 'CES1');
INSERT INTO `modulos` VALUES (2, 'Taller de Base de Datos', 'BD');
INSERT INTO `modulos` VALUES (3, 'Interpretación de Requisitos', 'IR');
INSERT INTO `modulos` VALUES (4, 'Construcción de Elementos de Software Web 1', 'CESW1');

-- ----------------------------
-- Table structure for sesiones_clases
-- ----------------------------
DROP TABLE IF EXISTS `sesiones_clases`;
CREATE TABLE `sesiones_clases`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `clase_id` int(5) NOT NULL,
  `fecha_sesion` date NOT NULL,
  `observacion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_sesion_clase_fecha`(`clase_id`, `fecha_sesion`) USING BTREE COMMENT 'La sesión de una clase solo puede ser una por fecha',
  CONSTRAINT `fk_clase_sesion` FOREIGN KEY (`clase_id`) REFERENCES `clases` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sesiones_clases
-- ----------------------------
INSERT INTO `sesiones_clases` VALUES (1, 1, '2020-07-14', 'Clase de IR');
INSERT INTO `sesiones_clases` VALUES (2, 2, '2020-09-08', 'Clase de CES1');
INSERT INTO `sesiones_clases` VALUES (3, 3, '2020-09-17', 'Clase de BD');
INSERT INTO `sesiones_clases` VALUES (4, 4, '2020-08-21', 'Clase de CESW1');

-- ----------------------------
-- Table structure for tipo_actores
-- ----------------------------
DROP TABLE IF EXISTS `tipo_actores`;
CREATE TABLE `tipo_actores`  (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `perfil` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo_actores
-- ----------------------------
INSERT INTO `tipo_actores` VALUES (1, 'Estudiante');
INSERT INTO `tipo_actores` VALUES (2, 'Docente');
INSERT INTO `tipo_actores` VALUES (3, 'Asesor');
INSERT INTO `tipo_actores` VALUES (4, 'Coordinadora');

-- ----------------------------
-- Table structure for tipo_documento
-- ----------------------------
DROP TABLE IF EXISTS `tipo_documento`;
CREATE TABLE `tipo_documento`  (
  `codigo` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`codigo`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo_documento
-- ----------------------------
INSERT INTO `tipo_documento` VALUES ('CC', 'cedula de ciudadania');
INSERT INTO `tipo_documento` VALUES ('CE', 'cedula de extranjeria');
INSERT INTO `tipo_documento` VALUES ('NIP', 'numero de identificacion personal');
INSERT INTO `tipo_documento` VALUES ('NIT', 'numero de identificacion tributaria');
INSERT INTO `tipo_documento` VALUES ('PAP', 'pasaporte');
INSERT INTO `tipo_documento` VALUES ('TI', 'tarjeta de identidad');

SET FOREIGN_KEY_CHECKS = 1;
