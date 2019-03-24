-- Do not forget to create timescaledb extension
-- CREATE EXTENSION timescaledb;

-- We start by creating a regular SQL table
CREATE TABLE IF NOT EXISTS rates (
  time        TIMESTAMPTZ       NOT NULL,
  currency    VARCHAR           NOT NULL,
  rate        NUMERIC          NOT NULL
);

CREATE INDEX idx_rates_currency
ON rates(currency);

-- Then we convert it into a hypertable that is partitioned by time
SELECT create_hypertable('rates', 'time');
