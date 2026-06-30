# Alke Wallet — Consultas SQL y Resultados

A través del presente se mostrarán las consultas SQL y Resultados para el proyecto.
Hemos decidido ir con el motor de base de datos MariaDB y para mostrar los resultados
estaremos conectando a la base de datos a través de Dbeaver.
Para mayores detalles consulte archivo 'alkewallet.sql' y sus comentarios.

## 1. Creación de la base de datos

```sql
CREATE DATABASE IF NOT EXISTS alkewallet
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alkewallet;
```

![](https://github.com/user-attachments/assets/32b55839-41fd-4df7-a4e5-f761aa9805c4)

*Mostrar Base de Datos*
  
## 2. Definición de tablas (DDL)

```sql
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

```
![](https://github.com/user-attachments/assets/484328f8-fbd0-4813-acc6-3d743277d558)

*Mostrar Tablas*


![](https://github.com/user-attachments/assets/eb2770bb-92ce-467a-8987-31313fe27c21)


*Describe Usuario*


## 3. Datos de prueba (INSERT)

```sql
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
```
![](https://github.com/user-attachments/assets/f430b327-c58f-4132-b979-d28e056faf9f)

*Tabla Moneda*



![](https://github.com/user-attachments/assets/38d39035-7904-4b42-88f6-7654c0b87de3)

*Tabla Usuario*



![](https://github.com/user-attachments/assets/1a722221-9623-47ac-a0e4-5bf31156c07c)

*Tabla Transaccion*



## 4. Consultas obligatorias

### 4.1 Nombre de la moneda elegida por un usuario


```sql
SELECT m.currency_name, m.currency_code
FROM usuario u
JOIN moneda m ON u.currency_id = m.currency_id
WHERE u.user_id = 1;
```

![](https://github.com/user-attachments/assets/7f6b562b-135d-4120-a4b1-93bd08910799)

*Moneda preferida por usuario 1*


![](https://github.com/user-attachments/assets/b053a07b-dd30-42bd-b29c-fe099e14c68e)

*Moneda preferida por usuario 5*



### 4.2 Todas las transacciones registradas

```sql
SELECT * FROM transaccion t;
```

![](https://github.com/user-attachments/assets/1a722221-9623-47ac-a0e4-5bf31156c07c)

*Mostrar todas las transsacciones*

### 4.3 Transacciones de un usuario específico (ordenadas por fecha de transacción)

```sql
SELECT t.transaction_id, t.transaction_date, t.importe, t.currency_tx_id, t.sender_user_id, t.receiver_user_id
FROM transaccion t
WHERE t.sender_user_id = 2 OR t.receiver_user_id = 2
ORDER BY t.transaction_date DESC;
```
![](https://github.com/user-attachments/assets/cb4fe2b9-abef-4f38-8f48-f8dd2e1aee78)

*Transacciones Usuario 1*


![](https://github.com/user-attachments/assets/63343649-01c9-47d7-991e-4420c0f3b634)


*Transacciones Usuario 2*

### 4.4 Modificar el correo de un usuario (UPDATE)

```sql
UPDATE usuario
SET email = 'elsapo@alke.cl'
WHERE user_id = 1;
```

![](https://github.com/user-attachments/assets/aa86e799-f6e2-4c96-946e-0644265412c9)

*Update email*


### 4.5 Eliminar una transacción (DELETE)

```sql
DELETE FROM transaccion
WHERE transaction_id = 1;
```

![](https://github.com/user-attachments/assets/fd1b9780-2c8b-4f41-9cb7-dc84996a18f3)

*Delete trasaccion*

## 5. Tareas Plus - Vista top-5 de usuarios por saldo

```sql
CREATE VIEW top5_saldo AS
SELECT user_id, nombre, saldo
FROM usuario
ORDER BY saldo DESC
LIMIT 5;
```
```sql
SELECT * FROM top5_saldo;
```

![](https://github.com/user-attachments/assets/ee32205d-37eb-4f62-ac22-4a6237a701e9)

*View top 5 saldo*



