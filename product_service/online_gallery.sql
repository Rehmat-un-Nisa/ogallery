-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 14, 2014 at 03:43 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `online_gallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`session_id`, `ip_address`, `user_agent`, `last_activity`, `user_data`) VALUES
('14e83a2e31b0495780e8259f501a9998', '192.168.0.107', 'Dalvik/1.4.0 (Linux; U; Android 2.3.6; GT-S5360 Build/GINGERBREAD)', 1405344692, ''),
('68c4261e45634aec61306397dd6d57dd', '192.168.0.107', 'Dalvik/1.4.0 (Linux; U; Android 2.3.6; GT-S5360 Build/GINGERBREAD)', 1405344548, ''),
('c659411f0790972d888215bd14f5e0cc', '192.168.0.107', 'Mozilla/5.0 (Linux; U; Android 2.3.6; en-gb; GT-S5360 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4', 1405344891, 'a:3:{s:9:"user_data";s:0:"";s:5:"email";s:20:"to.msaads2@gmail.com";s:9:"logged_in";b:1;}');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_image` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_image`, `user_id`) VALUES
(1, '20499266.jpg', 1),
(2, '01251272.jpg', 1),
(3, '17842068.jpg', 1),
(4, '11214119.jpg', 1),
(5, '01172128.jpg', 1),
(6, '01177114.jpg', 4),
(7, '123456789999.jpg', 4),
(8, '780672318863.jpg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`) VALUES
(1, 'to.msaads@gmail.com', '347602146a923872538f3803eb5f3cef'),
(4, 'to.msaads2@gmail.com', '347602146a923872538f3803eb5f3cef'),
(5, 'to.msaads3@gmail.com', '347602146a923872538f3803eb5f3cef'),
(6, 'to.msaads4@gmail.com', '347602146a923872538f3803eb5f3cef'),
(7, 'to.msaadds@gmail.com', '347602146a923872538f3803eb5f3cef'),
(9, 'to.msaads5@gmail.com', '347602146a923872538f3803eb5f3cef');

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `sess_cleanup` ON SCHEDULE EVERY 15 MINUTE STARTS '2014-06-21 12:18:51' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM `sessions` WHERE `expires` > 0 and `expires` < UNIX_TIMESTAMP()$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
