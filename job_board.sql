-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 20 oct. 2024 à 13:47
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `job_board`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `name`, `lastname`, `email`, `password`, `token`) VALUES
(2, 'Lucas', 'Chauvain', 'Lucas.Chauvain@epitech.eu', '$2b$10$eNb5zVTz2HIU9GHWPFV3deD/r5Jkvd.F6L0qzm20AN8yGW.2iBFPK', '7_DErLsNtMgUCSE_FG0x66dWqWPsP5SJ');

-- --------------------------------------------------------

--
-- Structure de la table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `company` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contract` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL,
  `postDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `advertisements`
--

INSERT INTO `advertisements` (`id`, `title`, `description`, `company`, `location`, `contract`, `salary`, `postDate`) VALUES
(3, 'Dev Ops ingeneer', 'We are looking for an intern', 2, 'Biot', 'Internship', 25000, '2024-10-10'),
(4, 'Coffee servicing', 'We are looking for you', 3, 'Valbonne', 'CDD', 10000, '2024-10-06'),
(5, 'Data analyst', 'This is a fucking good job', 3, 'Nice', 'CDI', 30000, '2024-10-08'),
(26, 'Frontend Developer', 'We need a creative front-end dev', 8, 'Nice', 'CDD', 32000, '2024-10-12'),
(27, 'Backend Developer', 'Work with our cutting-edge tech stack', 13, 'Grenoble', 'CDI', 38000, '2024-10-14'),
(28, 'IT Support Specialist', 'Provide tech support for our clients', 14, 'Montpellier', 'CDD', 27000, '2024-10-13'),
(29, 'Cybersecurity Analyst', 'Help secure our digital infrastructure', 13, 'Biot', 'CDI', 46000, '2024-10-16'),
(30, 'Cloud Architect', 'Design scalable cloud solutions', 8, 'Paris', 'CDI', 55000, '2024-10-17'),
(31, 'HR Assistant', 'Assist in recruitment and employee management', 3, 'Valbonne', 'Alternance', 21000, '2024-10-14'),
(32, 'UX/UI Designer', 'Create user-centered designs', 10, 'Toulouse', 'CDD', 30000, '2024-10-15'),
(33, 'Mobile App Developer', 'Build native mobile apps', 7, 'Lyon', 'CDI', 39000, '2024-10-18'),
(34, 'Business Analyst', 'Analyze market trends and performance', 12, 'Bordeaux', 'Internship', 25000, '2024-10-16'),
(35, 'AI Researcher', 'Conduct cutting-edge AI research', 13, 'Grenoble', 'CDI', 50000, '2024-10-17'),
(36, 'QA Engineer', 'Ensure product quality through testing', 14, 'Montpellier', 'CDI', 35000, '2024-10-18'),
(37, 'Digital Marketing Manager', 'Lead our digital marketing strategy', 9, 'Marseille', 'CDI', 42000, '2024-10-19'),
(38, 'Network Administrator', 'Manage and maintain network systems', 8, 'Nice', 'CDD', 33000, '2024-10-20'),
(39, 'DevOps Engineer', 'Automate infrastructure and deployment', 11, 'Paris', 'CDI', 48000, '2024-10-21'),
(40, 'Research Scientist', 'Work on innovative tech research', 15, 'Strasbourg', 'CDI', 47000, '2024-10-22');

-- --------------------------------------------------------

--
-- Structure de la table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `clientId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `advertisementId` int(11) NOT NULL,
  `motivation` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `applications`
--

INSERT INTO `applications` (`id`, `clientId`, `name`, `lastName`, `email`, `phoneNumber`, `location`, `advertisementId`, `motivation`) VALUES
(32, -1, 'Axel', 'Huguet', 'axelh33@hotmail.fr', '0668838224', 'Grasse', 3, 'Bonjour je suis motivé mais je ne veux pas m\'inscrire'),
(33, 17, 'Axel', 'Huguet', 'huguet2607@gmail.com', '0668838224', 'Grasse', 5, 'Bonjour, je suis grandement motivé pour ce post'),
(34, 17, 'Axel', 'Huguet', 'huguet2607@gmail.com', '0668838224', 'Grasse', 5, 'Je réitère ma candidature'),
(35, 17, 'Axel', 'Huguet', 'huguet2607@gmail.com', '0668838224', 'Grasse', 4, 'Je suis aussi intéressé par cette offre'),
(36, -2, 'Lucas', 'Chauvain', 'Lucas.Chauvain@epitech.eu', '0668838224', 'Grasse', 4, 'Je suis un administrateur motivé\n'),
(41, 18, 'Clément', 'Lores', 'clement.lores@client.com', '0668838224', 'Grasse', 5, 'Je suis très motivé pour ce poste'),
(42, -3, 'admin', 'test', 'admin-test@jobboard.com', '0668838224', 'Grasse', 10, 'Coucou');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `name`, `lastName`, `email`, `password`, `phoneNumber`, `birthDate`, `location`, `token`) VALUES
(10, 'Sayen', 'Benja', 'Benjamin.sayen@gmail.com', '$2b$10$H1VOYAWFzghW3B/E1TaCz.xmb.LMnDCKOAvK7WWC9/MNQSNGdazLi', '0668838224', '2024-09-30', 'Grasse', 'K2B31vKHnYJyu8EZFLoQ43czhdrUJU8e'),
(17, 'Axel', 'Huguet', 'huguet2607@gmail.com', '$2b$10$q5XKyuJJATzLkaOohuNj8Oe/79yoFWKTqSLBRLDpsPG1.aJXIkOUW', '0668838224', '2019-06-16', 'Grasse', 'ztl9hUBYv0_fbSwU7Yh8hJtf4H1d0wab');

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`id`, `name`, `location`) VALUES
(2, 'Sopra Steria', 'Biot'),
(3, 'Atos', 'Valbonne'),
(5, 'Steven & associates', 'Vallauris'),
(7, 'Tech Solutions', 'Paris'),
(8, 'Innovative Systems', 'Lyon'),
(9, 'Global Networks', 'Nice'),
(10, 'GreenTech Ventures', 'Marseille'),
(11, 'Alpha Technologies', 'Toulouse'),
(12, 'FutureSoft', 'Lille'),
(13, 'Data Insights', 'Bordeaux'),
(14, 'AI Dynamics', 'Grenoble'),
(15, 'NextGen Robotics', 'Montpellier'),
(16, 'Quantum Innovations', 'Strasbourg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company` (`company`);

--
-- Index pour la table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `advertisementId` (`advertisementId`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `advertisements`
--
ALTER TABLE `advertisements`
  ADD CONSTRAINT `advertisements_ibfk_1` FOREIGN KEY (`company`) REFERENCES `companies` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
