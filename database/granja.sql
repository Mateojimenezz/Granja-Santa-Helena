-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2025 a las 19:49:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `granja`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `granjas`
--

CREATE TABLE `granjas` (
  `id_granja` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `granjas`
--

INSERT INTO `granjas` (`id_granja`, `nombre`, `imagen`, `id_usuario`, `fecha_creacion`) VALUES
(26, 'SANTA HELENA', '/uploads/1749133749686-logo.png', 0, '2025-06-05 14:29:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_alimentos`
--

CREATE TABLE `inventario_alimentos` (
  `id` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `tipo` varchar(150) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_entrada` date NOT NULL,
  `proveedor` varchar(150) NOT NULL,
  `lote` varchar(100) NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `responsable` varchar(150) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `inventario_alimentos`
--

INSERT INTO `inventario_alimentos` (`id`, `categoria`, `tipo`, `cantidad`, `fecha_entrada`, `proveedor`, `lote`, `fecha_vencimiento`, `responsable`, `estado`, `created_at`) VALUES
(44, 'Energeticos', 'Granos y Cereales', 300, '2025-07-02', 'Proveedor 2', 'Lote 1', '2025-07-03', 'vdsv', 'Por Vencer', '2025-07-02 16:10:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Identificacion` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Cargo` enum('Administrador','Veterinario','Operador') NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `Fecha_Registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `permiso` enum('Permitido','Denegado') DEFAULT 'Denegado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Nombre`, `Identificacion`, `Email`, `Telefono`, `Cargo`, `contrasena`, `Fecha_Registro`, `reset_token`, `reset_expires`, `permiso`) VALUES
(1, 'Mateo Jimenez Galvis', '1003082644', 'majigal102013@gmail.com', '3332374761', 'Administrador', '$2b$10$d.PL3GeAC6wz3yHeZ9wpX.flR7rdLZhmvn7MEplreEER1PfiSxAmG', '2025-05-12 21:10:17', '16a67b6c-5d65-4b09-9cdd-b4b1daf6eb61', '2025-05-27 19:07:28', 'Permitido'),
(2, 'Mateo Jimenez Galvis', '1003082655', 'mateojimenez@unisinu.edu.co', '3332374761', 'Administrador', '$2b$10$IS/5RUajD8keXhHQn9nTe.z4To1k0u5YcZPhkLXzco27ed2O2lu2O', '2025-05-26 20:29:55', NULL, NULL, 'Denegado'),
(20, 'Mateo Jimenez Galvis', '1003082645', 'davi354215as@jean10.com', '3332374761', 'Administrador', '$2b$10$C21D7dSOSVnKqVRHhP460.V4Ab0Y31GpEHjkXtLsNLhlk.E6WYe0K', '2025-05-28 20:28:52', NULL, NULL, 'Denegado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `granjas`
--
ALTER TABLE `granjas`
  ADD PRIMARY KEY (`id_granja`);

--
-- Indices de la tabla `inventario_alimentos`
--
ALTER TABLE `inventario_alimentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Identificacion` (`Identificacion`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `granjas`
--
ALTER TABLE `granjas`
  MODIFY `id_granja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `inventario_alimentos`
--
ALTER TABLE `inventario_alimentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
