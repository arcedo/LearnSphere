-- CREATE USER AND DATABASE for learnSphere
DROP DATABASE IF EXISTS learnSphere;
CREATE DATABASE learnSphere;

/*CREATE USER 'learnSphere'@'%' IDENTIFIED BY 'y0uNever$ee4CumM4n';
GRANT ALL PRIVILEGES ON learnSphere.* TO 'learnSphere'@'%';
FLUSH PRIVILEGES;*/

USE learnSphere;
-- TEACHER Table
CREATE TABLE teacher (
	idTeacher BIGINT UNSIGNED AUTO_INCREMENT,
	dni VARCHAR(9) UNIQUE NOT NULL,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(100) NOT NULL,
	phoneNumber INT NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	userName VARCHAR(6) UNIQUE NOT NULL,
	-- ¿HASH PASSWORD?
	userPassword VARCHAR(255) NOT NULL,
	PRIMARY KEY (idTeacher)
);
-- GROUP Table 
CREATE TABLE studentGroup (
	name VARCHAR(50) NOT NULL,
	PRIMARY KEY (name)
);
-- PROJECT Table
CREATE TABLE project (
	idProject BIGINT UNSIGNED AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	description VARCHAR(500) NOT NULL,
	idTeacher BIGINT UNSIGNED NOT NULL,
	idStudentGroup VARCHAR(50) NOT NULL,
	activeProject BOOLEAN NOT NULL,
	PRIMARY KEY (idProject),
	FOREIGN KEY (idTeacher) REFERENCES teacher(idTeacher),
	FOREIGN KEY (idStudentGroup) REFERENCES studentGroup(name)
);
-- STUDENT Table
CREATE TABLE student (
	idStudent BIGINT UNSIGNED AUTO_INCREMENT,
	dni VARCHAR(9) UNIQUE NOT NULL,
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(100) NOT NULL,
	phoneNumber INT NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	userName VARCHAR(6) UNIQUE NOT NULL,
	-- ¿HASH PASSWORD?
	userPassword VARCHAR(255) NOT NULL,
	profilePicture VARCHAR(255),
	bio VARCHAR(500),
	idStudentGroup VARCHAR(50) NOT NULl,
	PRIMARY KEY (idStudent),
	FOREIGN KEY (idStudentGroup) REFERENCES studentGroup(name)
);
-- ASSIGNED PROJECTS TO studentS 
CREATE TABLE projectToStudent (
	idProjectToStudent BIGINT UNSIGNED AUTO_INCREMENT,
	idProject BIGINT UNSIGNED NOT NULL,
	idStudent BIGINT UNSIGNED NOT NULL,
	projectGrade TINYINT UNSIGNED NOT NULL,
	PRIMARY KEY (idProjectToStudent),
	FOREIGN KEY (idProject) REFERENCES project(idProject),
	FOREIGN KEY (idStudent) REFERENCES student(idStudent)
);
-- SKILL Table
CREATE TABLE skill (
	idSkill BIGINT UNSIGNED AUTO_INCREMENT,
	idProject BIGINT UNSIGNED NOT NULL,
	skillName VARCHAR(100) NOT NULL,
	globalPercentage TINYINT UNSIGNED NOT NULL,
	PRIMARY KEY (idSkill),
	FOREIGN KEY (idProject) REFERENCES project(idProject)
);

-- ACTIVITY Table
CREATE TABLE activity (
	idActivity BIGINT UNSIGNED AUTO_INCREMENT,
	idProject BIGINT UNSIGNED NOT NULL,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(500) NOT NULL,
	PRIMARY KEY (idActivity),
	FOREIGN KEY (idProject) REFERENCES project(idProject)
);

-- PERENTAGE SKILL FOR ACTIVITY
CREATE TABLE activityPercentatge (
	idActivityPercentatge BIGINT UNSIGNED AUTO_INCREMENT,
	idSkill BIGINT UNSIGNED NOT NULL,
	idActivity BIGINT UNSIGNED NOT NULL,
	activityPercentatge TINYINT UNSIGNED NOT NULL,
	PRIMARY KEY (idActivityPercentatge),
	FOREIGN KEY (idSkill) REFERENCES skill(idSkill),
	FOREIGN KEY (idActivity) REFERENCES activity(idActivity)
);

-- ACTIVITY evaluation of the SKILL to student 
CREATE TABLE activityGrade (
	idActivityGrade BIGINT UNSIGNED AUTO_INCREMENT,
	idActivity BIGINT UNSIGNED NOT NULL,
	idSkill BIGINT UNSIGNED NOT NULL,
	idStudent BIGINT UNSIGNED NOT NULL,
	grade TINYINT UNSIGNED,
	PRIMARY KEY (idActivityGrade),
	FOREIGN KEY (idActivity) REFERENCES activity(idActivity),
	FOREIGN KEY (idSkill) REFERENCES skill(idSkill),
	FOREIGN KEY (idStudent) REFERENCES student(idStudent)
);

INSERT INTO teacher (dni, firstName, lastName, phoneNumber, email, userName, userPassword) 
VALUES ('48512304J', 'Marcos', 'Velteo', 650453212, 'marcos.venteo@lsphere.net', 'marvel', 'venom123');
INSERT INTO teacher (dni, firstName, lastName, phoneNumber, email, userName, userPassword) 
VALUES ('41312303K', 'Alex', 'Marín', 623126785, 'alex.marin@lsphere.net', 'alemar', 'pikachu69');
INSERT INTO studentGroup (name) VALUES ('DAW2');
INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword, profilePicture, bio, idStudentGroup)
VALUES ('24362738H', 'Marcel', 'Esplugas', 625720265, 'maresp@lsphere.net', 'maresp', 'P@ssword',  'src/assets/profilePictures/maresp.png', 'Powered by Marcel', 'DAW2');
INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword, profilePicture, bio, idStudentGroup)
VALUES ('12345678F', 'Jordi', 'Torrella', 677067346, 'jortor@lsphere.net', 'jortor', 'P@ssword', 'src/assets/profilePictures/jortor.png', 'Follar follar follar', 'DAW2');