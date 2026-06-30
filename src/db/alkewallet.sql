/* ================================================================================================
										Alke-wallet DB
   ================================================================================================ */

-- Creación de base de datos en mariadb

CREATE DATABASE IF NOT EXISTS alkewallet
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alkewallet;

-- Reset de Tablas existentes

DROP TABLE IF EXISTS transaccion;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS moneda;
DROP TABLE IF EXISTS top5_saldo;

-- Definición de tablas

CREATE TABLE moneda (
 currency_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
 currency_name VARCHAR(40) NOT NULL UNIQUE, 
 currency_code CHAR(3) NOT NULL
);

CREATE TABLE usuario (
  user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL,
  email VARCHAR(32) NOT NULL UNIQUE,
  password VARCHAR(32) NOT NULL,
  saldo DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at DATETIME DEFAULT NOW() NOT NULL,
  currency_id INT,
  FOREIGN KEY (currency_id) REFERENCES moneda(currency_id)
);

CREATE TABLE transaccion (
 transaction_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
 sender_user_id INT NOT NULL,
 receiver_user_id INT NOT NULL,
 importe DECIMAL(12,2) NOT NULL,
 transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
 currency_tx_id INT NOT NULL,
 FOREIGN KEY (sender_user_id) REFERENCES usuario(user_id),
 FOREIGN KEY (receiver_user_id) REFERENCES usuario(user_id),
 FOREIGN KEY (currency_tx_id) REFERENCES moneda(currency_id)
 );

-- Para las tabla usuario y transaccion consideré usar CHAR(36) PRIMARY KEY DEFAULT (UUID())
-- en lugar de INT AUTO_INCREMENT, pues en la parte frontend hasta ahora las id de las transacciones
-- son UUID generadas automáticamente similar a lo que he visto en aplicaciones de banking que utilizo.
-- Pero desistí de usarla, pues me generaba atributos malformados (probablemente mi culpa) y además averiguando
-- estos UUID usarían más espacio y generarían los index de manera más lenta. Ese sacrificio por asegurar 
-- singularidad global y minimizar aún más duplicación escapa del scope de este proyecto y no vale la pena.

-- Inserciones de datos de prueba

INSERT INTO moneda (currency_id, currency_name, currency_code) VALUES
  (1, 'Peso Chileno', 'CLP'),
  (2, 'American Dolar', 'USD'),
  (3, 'Euro', 'EUR'),
  (4, 'Bosnia and Herzegovina Convertible Mark', 'BAM'),
  (5, 'British Pound', 'GBP'),
  (6, 'Indian Rupee', 'INR')
  ;
 
INSERT INTO usuario (user_id, nombre, email, password, saldo, currency_id) VALUES
  (1, 'Sapito Livingstone', 'elsapo@alke.cl', 'sapito1920', 1250000.00, 1),
  (2, 'Juan Carlos Bodoque', 'bodoque@alke.cl', 'quesemeteviejacon', 20000.00, 1),
  (3, 'Felipe C.', 'felipito@alke.cl', 'vuelaalto', 320000.00, 2),
  (4, 'Godofredo Besos', 'notJeff@alke.cl', 'GIMMEMONEY', 989935000.00, 2),
  (5, 'Asmir Begović', 'asmir@alke.cl', 'YuG0sL4vi4', 120000000.00, 4),
  (6, 'Adonaldo Trompo', 'defnottrump@alke.cl', 'IMTREMENDOUS', 999999999.99, 2),
  (7, 'Marcos S. Lagaber', 'thesuck@alke.cl', 'imareptilian', 666666666.66, 2),
  (8, 'Miley Sairus', 'NotMilei@alke.cl', 'bibalalibertacar4j0', 600000000.00, 2),
  (9, 'Elmo Luzco', 'random9@alke.cl', 'whowantstobeatrillionaire', 1000000000.00, 2);

INSERT INTO transaccion (sender_user_id, receiver_user_id, importe, currency_tx_id, transaction_date) VALUES
  (1, 2, 50000.00, 1, STR_TO_DATE('04.09.2012/11:15:39','%d.%m.%Y/%H:%i:%s')),
  (5, 2, 50000.00, 1, STR_TO_DATE('26.08.2011/10:30:11','%d.%m.%Y/%H:%i:%s')),
  (5, 2, 600000.00, 1, STR_TO_DATE('31.10.2012/12:00:00','%d.%m.%Y/%H:%i:%s')),
  (5, 2, 600000.00, 1, STR_TO_DATE('30.11.2012/12:00:00','%d.%m.%Y/%H:%i:%s')),  
  (5, 2, 600000.00, 1, STR_TO_DATE('31.12.2012/12:00:00','%d.%m.%Y/%H:%i:%s')),  
  (5, 2, 600000.00, 1, STR_TO_DATE('31.01.2013/12:00:00','%d.%m.%Y/%H:%i:%s')),  
  (6, 8, 40000000.00, 2, STR_TO_DATE('09.10.2025/13:30:00','%d.%m.%Y/%H:%i:%s')),
  (4, 6, 30000000.00, 2, STR_TO_DATE('20.01.2025/18:00:00','%d.%m.%Y/%H:%i:%s')),
  (7, 6, 30000000.00, 2, STR_TO_DATE('20.01.2025/18:00:00','%d.%m.%Y/%H:%i:%s')),
  (6, 9, 1.00, 6, STR_TO_DATE('04.06.2026/14:45:05','%d.%m.%Y/%H:%i:%s')),
  (9, 6, 0.01, 5, STR_TO_DATE('04.06.2026/14:45:52','%d.%m.%Y/%H:%i:%s')),
  (6, 9, 1.00, 1, STR_TO_DATE('04.06.2026/14:45:05','%d.%m.%Y/%H:%i:%s')),
  (9, 6, 0.58, 4, STR_TO_DATE('04.06.2026/14:45:52','%d.%m.%Y/%H:%i:%s'));

/* ================================================================================================
									  CONSULTAS OBLITAGORIAS
   ================================================================================================ */

-- Consultar moneda preferida de usuario

SELECT m.currency_name, m.currency_code
FROM usuario u
JOIN moneda m ON u.currency_id = m.currency_id
WHERE u.user_id = 1;

-- Consultar por transacciones realizadas

SELECT * FROM transaccion t;

-- Consultar por transacciones realizadas por usuario específico (ordenadas por fecha de transacción de manera descendente)

SELECT t.transaction_id, t.transaction_date, t.importe, t.currency_tx_id, t.sender_user_id, t.receiver_user_id
FROM transaccion t
WHERE t.sender_user_id = 2 OR t.receiver_user_id = 2
ORDER BY t.transaction_date DESC;

-- Modificar correo de usuario

UPDATE usuario
SET email = 'elsapo@alke.cl'
WHERE user_id = 1;

-- Borrar fila completa de datos de una transacción

DELETE FROM transaccion
WHERE transaction_id = 1;

-- Al crear esta query pensé en quizás poner una restricción ON DELETE CASCADE a la tabla usuario.
-- Pero inmediatamente me di cuenta que eso podría afectar a otros usuarios.

-- Tarea Plus - Vista top 5 de usuarios según saldo

CREATE VIEW top5_saldo AS
SELECT user_id, nombre, saldo
FROM usuario
ORDER BY saldo DESC
LIMIT 5;

SELECT * FROM top5_saldo;