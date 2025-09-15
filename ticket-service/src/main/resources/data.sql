-- Parking spots
DELETE FROM payment;
DELETE FROM ticket;
DELETE FROM vehicle;
DELETE FROM parking_spot;
DELETE FROM payment_method;

INSERT INTO parking_spot (id, spot_number, spot_type, occupied)
VALUES
  (1, 'A1', 'FOUR_WHEELER', false),
  (2, 'A2', 'FOUR_WHEELER', false),
  (3, 'B1', 'TWO_WHEELER', false),
  (4, 'B2', 'TWO_WHEELER', false);

-- Vehicles
INSERT INTO vehicle (id, license_plate, type)
VALUES
  (1, 'KA01AB1234', 'FOUR_WHEELER'),
  (2, 'KA02XY5678', 'TWO_WHEELER');

-- Tickets (fixed H2 syntax with DATEADD)
INSERT INTO ticket (id, vehicle_id, spot_id, entry_time, exit_time, amount, status)
VALUES
  (100, 1, 1, DATEADD('HOUR', -2, CURRENT_TIMESTAMP), CURRENT_TIMESTAMP, 20.00, 'CLOSED'),
  (101, 2, 3, DATEADD('MINUTE', -30, CURRENT_TIMESTAMP), NULL, NULL, 'ACTIVE');

-- Payment methods
INSERT INTO payment_method (id, method_name)
VALUES
  (1, 'CASH'),
  (2, 'CARD'),
  (3, 'UPI');

-- Payments
INSERT INTO payment (id, ticket_id, method_id, amount, payment_time, status)
VALUES (500, 100, 1, 20.00, CURRENT_TIMESTAMP, 'SUCCESS');

