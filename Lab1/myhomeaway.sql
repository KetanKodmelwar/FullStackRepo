-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 08:18 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myhomeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `booked_property`
--

CREATE TABLE `booked_property` (
  `myprop_id` int(50) NOT NULL,
  `bookCheckin_date` date NOT NULL,
  `bookCheckout_date` date NOT NULL,
  `bookingUser_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booked_property`
--

INSERT INTO `booked_property` (`myprop_id`, `bookCheckin_date`, `bookCheckout_date`, `bookingUser_id`) VALUES
(34, '2018-10-09', '2018-10-16', 5),
(34, '2018-10-16', '2018-10-23', 12),
(1, '2018-10-09', '2018-10-15', 12),
(3, '2018-10-09', '2018-10-16', 5),
(4, '2018-10-09', '2018-10-16', 13),
(2, '2018-10-09', '2018-10-16', 13);

-- --------------------------------------------------------

--
-- Table structure for table `list_property`
--

CREATE TABLE `list_property` (
  `id` int(50) NOT NULL,
  `myprop_location` varchar(50) NOT NULL,
  `myprop_headline` varchar(50) NOT NULL,
  `myprop_description` varchar(200) NOT NULL,
  `myprop_type` varchar(45) NOT NULL,
  `myprop_bedrooms` int(50) NOT NULL,
  `myprop_accomodates` int(50) NOT NULL,
  `myprop_bathrooms` int(50) NOT NULL,
  `myprop_pricing` bigint(50) NOT NULL DEFAULT '100',
  `cleanFee` bigint(50) NOT NULL DEFAULT '0',
  `arrive_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `myprop_photos` varchar(200) NOT NULL,
  `ownerid` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `list_property`
--

INSERT INTO `list_property` (`id`, `myprop_location`, `myprop_headline`, `myprop_description`, `myprop_type`, `myprop_bedrooms`, `myprop_accomodates`, `myprop_bathrooms`, `myprop_pricing`, `cleanFee`, `arrive_date`, `checkout_date`, `myprop_photos`, `ownerid`) VALUES
(1, 'India', 'Incredible India', 'Places with multiple spots and authentic culture to visit. Must try the authentic dishes of the place', 'Bungalow', 3, 6, 3, 18500, 200, '2018-09-03', '2018-11-22', '', 0),
(2, 'Australia', 'Visit Australia', 'Meet Kangaroos and also the famous cricket stadiums. Koala is the famous animal found in Australia and the cutest of all. A zoo which is very close to this property is one of the famous ones ', 'Condo', 3, 5, 2, 230, 45, '2018-10-03', '2018-11-23', '', 0),
(3, 'UAE', 'Visit Dubai and Abu Dhabi', 'See the Burj Khalifa and also the Ferrari world', 'Condo', 2, 4, 3, 8500, 0, '2018-09-14', '2019-01-02', '', 0),
(4, 'India', 'India Part 2', 'part 2 is different and it is new', 'Condo', 5, 10, 5, 48000, 100, '2018-09-02', '2018-12-25', '', 0),
(5, 'Australia', 'Australia and New Zealand', 'This is a place where one must visit. Right in the middle of the city. Is accessible to all routes and has best places to visit nearby. Tourists mostly do take a stop over here due to its serene view ', 'House', 3, 6, 2, 515, 30, '2018-09-11', '2018-11-14', '', 0),
(6, 'Australia', 'Australia East Coast', 'This is a budget place for people who want to travel more and stay less.\r\nCan be a good place to hangout during winters as the place is cooler\r\nAlso visit the kangaroos and the koala which are the mos', 'House', 3, 6, 2, 85, 10, '2018-09-11', '2018-11-15', '', 0),
(7, 'UAE', 'UAE part 2', 'UAE has some tourist spots too', 'House', 3, 5, 3, 1200, 200, '2018-09-13', '2018-10-16', '', 0),
(8, 'San Jose', 'Villa Torino', 'VT is one of the most luxurious apartment in San Jose Downtown', 'Condo', 2, 5, 2, 400, 200, '2018-10-05', '2018-10-31', '', 0),
(34, 'South Africa', 'South Africa', 'A divine place to stay in and tourism', 'TownHouse', 4, 8, 4, 1200, 100, '2018-10-10', '2018-11-07', '', 0),
(35, 'San Jose', 'Centerra', 'A small place with all amenities', 'Condo', 2, 5, 2, 420, 45, '2018-10-14', '2018-11-22', '', 4);

-- --------------------------------------------------------

--
-- Table structure for table `owner_users`
--

CREATE TABLE `owner_users` (
  `userid` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `aboutMe` varchar(200) NOT NULL,
  `city` varchar(50) NOT NULL,
  `company` varchar(100) NOT NULL,
  `school` varchar(100) NOT NULL,
  `hometown` varchar(200) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `languages` varchar(200) NOT NULL,
  `phone` bigint(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owner_users`
--

INSERT INTO `owner_users` (`userid`, `username`, `password`, `firstName`, `lastName`, `aboutMe`, `city`, `company`, `school`, `hometown`, `gender`, `languages`, `phone`) VALUES
(1, 'alhadpathak@gmail.com', 'alhad', 'Alhad', 'Pathak', '', '', '', '', '', '', '', 0),
(2, 'ruchirtatar@gmail.com', 'ruchir', 'Ruchir', 'Tatar', '', '', '', '', '', '', '', 0),
(3, 'ruchirtatar@gmail.com', 'ruchir', 'Ruchir', 'Tatar', '', '', '', '', '', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `signup_users`
--

CREATE TABLE `signup_users` (
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `emailID` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `signup_users`
--

INSERT INTO `signup_users` (`firstName`, `lastName`, `emailID`, `password`) VALUES
('Ketan', 'Kodmelwar', 'ketankodmelwar@gmail.com', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `traveller_users`
--

CREATE TABLE `traveller_users` (
  `userid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `aboutMe` varchar(200) NOT NULL,
  `city` varchar(50) NOT NULL,
  `company` varchar(100) NOT NULL,
  `school` varchar(200) NOT NULL,
  `hometown` varchar(250) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `languages` varchar(200) NOT NULL,
  `phone` bigint(50) DEFAULT NULL,
  `isOwner` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `traveller_users`
--

INSERT INTO `traveller_users` (`userid`, `username`, `password`, `firstName`, `lastName`, `aboutMe`, `city`, `company`, `school`, `hometown`, `gender`, `languages`, `phone`, `isOwner`) VALUES
(4, 'ketankodmelwar@gmail.com', 'password', 'Ketan', 'Kodmelwar', 'I am fond of IceCream', 'India', 'Accenture', 'NCHS', 'Nashik', 'Male', 'English', 6692828705, 'yes'),
(5, 'aniketchandak@gmail.com', 'password123', 'Aniket', 'Chandak', '', 'India', 'GS Labs', 'Nav Rachna', 'Nashik', 'Male', 'English', 669282546, 'no'),
(6, 'kothawadesanket007@gmail.com', '12345', 'sanket ', 'kothawade', '', '', '', '', '', '', '', 0, 'no'),
(7, 'tusharpanpaliya@gmail.com', 'tushar', 'Tushar', 'Panpaliya', 'Hey its Tushar', 'India', 'None', 'Convent', 'Amravati', 'Male', 'English,Marwadi,Hindi', 6692824751, 'no'),
(9, 'prashantpardeshi@gmail.com', 'pdeshi', 'Prashant', 'Pardeshi', '', '', '', '', '', '', '', NULL, 'no'),
(11, 'sourabh@gmail.com', 'sourabh', 'Sourabh', 'Kshirsagar', '', '', '', '', '', '', '', NULL, 'yes'),
(12, 'vinit@gmail.com', 'vinit', 'Vinit', 'Bhosale', '', '', '', '', '', '', '', NULL, 'no'),
(13, 'kodmelwarketan@gmail.com', 'password', 'Ketan', 'Kodmelwar', 'I am fond of IceCream', 'India', 'None', 'NCHS', 'Nashik', 'Male', 'English,Hindi,Marathi', 6692828705, 'no');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `list_property`
--
ALTER TABLE `list_property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owner_users`
--
ALTER TABLE `owner_users`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `traveller_users`
--
ALTER TABLE `traveller_users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `list_property`
--
ALTER TABLE `list_property`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `owner_users`
--
ALTER TABLE `owner_users`
  MODIFY `userid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `traveller_users`
--
ALTER TABLE `traveller_users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
