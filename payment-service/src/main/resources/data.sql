-- Payment Methods
INSERT INTO payment_method (id, method_name) VALUES (1, 'CASH');
INSERT INTO payment_method (id, method_name) VALUES (2, 'CARD');
INSERT INTO payment_method (id, method_name) VALUES (3, 'UPI');

-- Tickets (make sure these IDs exist in ticket table)
INSERT INTO ticket (id, vehicle_id, spot_id, entry_time, exit_time, amount, status)
VALUES (100, 1, 1, CURRENT_TIMESTAMP - INTERVAL '2 HOUR', CURRENT_TIMESTAMP, 20.00, 'CLOSED');

-- Payments
INSERT INTO payment (id, ticket_id, method_id, amount, payment_time, status)
VALUES (500, 100, 1, 20.00, CURRENT_TIMESTAMP, 'SUCCESS');
