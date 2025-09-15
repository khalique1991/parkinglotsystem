CREATE TABLE ticket (
    id BIGINT PRIMARY KEY,
    vehicle_id BIGINT,
    spot_id BIGINT,
    entry_time TIMESTAMP,
    exit_time TIMESTAMP,
    amount DECIMAL(10,2),
    status VARCHAR(20)
);
