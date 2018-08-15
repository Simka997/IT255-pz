-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2018 at 12:47 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cvecara-pz`
--

-- --------------------------------------------------------

--
-- Table structure for table `cvet`
--

CREATE TABLE `cvet` (
  `sifra` int(11) NOT NULL,
  `naziv` varchar(30) NOT NULL,
  `cena` bigint(1) NOT NULL,
  `opis` text NOT NULL,
  `cvet_tip_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cvet`
--

INSERT INTO `cvet` (`sifra`, `naziv`, `cena`, `opis`, `cvet_tip_id`) VALUES
(2356, 'Ruže i Milka', 15, 'Tri ruže i Milka sa lešnikom...slatka poruka', 1),
(22569, 'Buket za svaku priliku', 33, 'bele ruže, liziantusi i sezonsko zelenilo', 1),
(22585, 'Izuzetan dan', 24, 'Lep buket iznenadi?e svakog ko ga dobije.', 1),
(22586, 'Ciklama', 24, 'Ciklama u saksiji. Lep živ cvet za Osmi Mart.', 2),
(22587, 'Bela Orhideja', 37, 'Najelegantniji od svih cvetova, ?ist i nevin', 2),
(22588, 'Ljubi?ice u saksiji', 24, 'Lepo aranžirane dve saksije ljubi?ice u korpi.', 2);

-- --------------------------------------------------------

--
-- Table structure for table `cvet_tip`
--

CREATE TABLE `cvet_tip` (
  `id` int(11) NOT NULL,
  `tip` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cvet_tip`
--

INSERT INTO `cvet_tip` (`id`, `tip`) VALUES
(1, 'buket'),
(2, 'saksija');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cvet`
--
ALTER TABLE `cvet`
  ADD PRIMARY KEY (`sifra`),
  ADD KEY `cvet_ibfk_1` (`cvet_tip_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
