-- NexusCRM Database Schema
-- Run this once in your Ionos MySQL admin (phpMyAdmin)

CREATE TABLE IF NOT EXISTS users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    role            ENUM('admin','sales') NOT NULL DEFAULT 'sales',
    commission_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255),
    phone       VARCHAR(50),
    company     VARCHAR(255),
    role        VARCHAR(255),
    owner_id    INT,
    status      VARCHAR(50) DEFAULT 'prospect',
    tags        JSON,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    industry    VARCHAR(255),
    size        VARCHAR(50),
    revenue     VARCHAR(100),
    website     VARCHAR(255),
    owner_id    INT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deals (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    deal_value  DECIMAL(12,2) DEFAULT 0,
    stage       VARCHAR(100) DEFAULT 'Lead',
    company     VARCHAR(255),
    contact     VARCHAR(255),
    owner_id    INT,
    prob        INT DEFAULT 50,
    close_date  DATE,
    pipeline_id INT DEFAULT 1,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    number        VARCHAR(50),
    contact       VARCHAR(255),
    company       VARCHAR(255),
    amount        DECIMAL(12,2) DEFAULT 0,
    status        VARCHAR(50) DEFAULT 'draft',
    due_date      DATE,
    recurring     TINYINT(1) DEFAULT 0,
    interval_type VARCHAR(50),
    issued        DATE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaigns (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    status      VARCHAR(50) DEFAULT 'draft',
    sent        INT DEFAULT 0,
    opened      INT DEFAULT 0,
    clicked     INT DEFAULT 0,
    subject     VARCHAR(500),
    send_date   DATE,
    segment     VARCHAR(255) DEFAULT 'All Contacts',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activities (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    activity_type VARCHAR(50),
    contact       VARCHAR(255),
    company       VARCHAR(255),
    activity_date DATE,
    activity_time VARCHAR(10),
    duration      VARCHAR(50),
    outcome       VARCHAR(500),
    notes         TEXT,
    owner_id      INT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(500) NOT NULL,
    contact    VARCHAR(255),
    due_date   DATE,
    priority   VARCHAR(20) DEFAULT 'Medium',
    status     VARCHAR(20) DEFAULT 'open',
    owner_id   INT,
    notes      TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS proposals (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    number        VARCHAR(50),
    contact       VARCHAR(255),
    company       VARCHAR(255),
    status        VARCHAR(50) DEFAULT 'draft',
    proposal_date DATE,
    expiry        DATE,
    vat           TINYINT(1) DEFAULT 0,
    notes         TEXT,
    line_items    JSON,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT,
    body       TEXT,
    note_date  DATE,
    owner_id   INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── SEED DATA ────────────────────────────────────────────────────────────────
-- Default password for all three accounts is: password
-- Change immediately after first login via Settings.
INSERT INTO users (name, email, password_hash, role, commission_rate) VALUES
('Alex Morgan',  'alex@nexuscrm.io',   '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 0.00),
('Sarah Chen',   'sarah@nexuscrm.io',  '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'sales', 7.50),
('James Wilson', 'james@nexuscrm.io',  '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'sales', 5.00),
('Ryan Hughes',  'ryan@apexglobalasset.com', '$2b$12$iqwymaIbB53q6qE9UzwK7.X6hYJCyuW1sXzihOoG6rUO4nrDyDpK2', 'admin', 0.00);
