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
	title VARCHAR(50) UNIQUE NOT NULL,
	description VARCHAR(500) NOT NULL,
	idTeacher BIGINT UNSIGNED NOT NULL,
	idStudentGroup VARCHAR(50) NOT NULL,
	activeProject BOOLEAN DEFAULT FALSE,
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
	userName VARCHAR(25) UNIQUE NOT NULL,
	-- ¿HASH PASSWORD?
	userPassword VARCHAR(255) NOT NULL,
	profilePicture VARCHAR(255),
	bio VARCHAR(500),
	idStudentGroup VARCHAR(50) NOT NULL,
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
	image VARCHAR(255),
	PRIMARY KEY (idSkill),
	FOREIGN KEY (idProject) REFERENCES project(idProject)
);

-- ACTIVITY Table
CREATE TABLE activity (
	idActivity BIGINT UNSIGNED AUTO_INCREMENT,
	idProject BIGINT UNSIGNED NOT NULL,
	name VARCHAR(100) NOT NULL,
	activeActivity BOOLEAN DEFAULT FALSE,
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
	grade DECIMAL(4,2) UNSIGNED,
	PRIMARY KEY (idActivityGrade),
	FOREIGN KEY (idActivity) REFERENCES activity(idActivity),
	FOREIGN KEY (idSkill) REFERENCES skill(idSkill),
	FOREIGN KEY (idStudent) REFERENCES student(idStudent)
);

-- password: venom123
INSERT INTO teacher (dni, firstName, lastName, phoneNumber, email, userName, userPassword) 
VALUES ('48512304J', 'Marcos', 'Velteo', 650453212, 'marcos.venteo@lsphere.net', 'marvel', '$2y$10$2Hyeu6QTY.uto9chO99p.OnsqLxHfOQ3UNec4/WO04oDzaPTxLKw2');
-- password: pikachu69
INSERT INTO teacher (dni, firstName, lastName, phoneNumber, email, userName, userPassword) 
VALUES ('41312303K', 'Alex', 'Marín', 623126785, 'alex.marin@lsphere.net', 'alemar', '$2y$10$7o6Cj0he.HNmYvZmyM1w4em5a4i25zOFnxWfRm23m8MDu4RG.IacK');
INSERT INTO studentGroup (name) VALUES ('DAW2');
INSERT INTO studentGroup (name) VALUES ('ASIX');
-- password: P@ssword
INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword, profilePicture, bio, idStudentGroup)
VALUES ('24362738H', 'Marcel', 'Esplugas', 625720265, 'maresp@lsphere.net', 'maresp', '$2y$10$14y1rQajzNb/7Pjqxn5HduxNHkRDqNwe8IYJh4uO/XiAg..I18eNy',  'src/assets/profilePictures/maresp.png', 'Powered by Marcel', 'DAW2');
INSERT INTO student (dni, firstName, lastName, phoneNumber, email, userName, userPassword, profilePicture, bio, idStudentGroup)
VALUES ('12345678F', 'Jordi', 'Torrella', 677067346, 'jortor@lsphere.net', 'jortor', '$2y$10$14y1rQajzNb/7Pjqxn5HduxNHkRDqNwe8IYJh4uO/XiAg..I18eNy', 'src/assets/profilePictures/jortor.png', 'Follar follar follar', 'DAW2');
INSERT INTO project  (title, description, idTeacher, idStudentGroup, activeProject)
VALUES ('M06', 'Learn to use JavaScript employing good practices and creating projects that can be applied in the real world.', 1,'DAW2',1);
INSERT INTO project  (title, description, idTeacher, idStudentGroup, activeProject)
VALUES ('M09', 'Learn how to use design tools to prototype your applications and then develop them.', 2,'DAW2',0);
INSERT INTO skill (skillName, idProject, image) 
VALUES ('JavaScript', 1, '/src/assets/skillIcons/JavaScript.png');
INSERT INTO skill (skillName, idProject, image)
VALUES ('HTML', 1, '/src/assets/skillIcons/HTML.png');
INSERT INTO skill (skillName, idProject, image)
VALUES ('CSS', 1, '/src/assets/skillIcons/CSS.png');
INSERT INTO skill (skillName, idProject, image)
VALUES ('Class Work', 1, '/src/assets/skillIcons/Class Work.png');
INSERT INTO skill (skillName, idProject, image)
VALUES ('Design', 2, '/src/assets/skillIcons/Design.png');
INSERT INTO skill (skillName, idProject, image)
VALUES ('HTML', 2, '/src/assets/skillIcons/HTML.png');
INSERT INTO skill (skillName, idProject, image)
VALUES ('CSS', 2, '/src/assets/skillIcons/CSS.png');
INSERT INTO skill (skillName, idProject, image)
VALUES ('Class Work', 2, '/src/assets/skillIcons/Class Work.png');
INSERT INTO activity (name, description, idProject)
VALUES ('Local Storage', 'Create a christmas themed web using local storage to save persistent data.', 1);
INSERT INTO activity (name, description, idProject)
VALUES ('Objects JSON', 'Create a simple page using Objects with Arrays.', 1);
INSERT INTO activity (name, description, idProject)
VALUES ('API', 'Create a page using an API.', 1);
INSERT INTO activity (name, description, idProject)
VALUES ('Design', 'Create a design for a web page.', 2);
INSERT INTO activity (name, description, idProject)
VALUES ('HTML', 'Create a simple page using HTML and CSS.', 2);
INSERT INTO activity (name, description, idProject)
VALUES ('Portfolio', 'Create a design and develop the desing using HTML, CSS or a framework to achive this.', 2);