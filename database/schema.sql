-- =====================================================
-- PetPal Database Setup Script
-- Run this entire file in MySQL Workbench or CLI
-- =====================================================

-- 1. Create and select the database
CREATE DATABASE IF NOT EXISTS petpal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE petpal_db;

-- =====================================================
-- INDEPENDENT TABLES FIRST (no foreign keys)
-- =====================================================

-- CATEGORIES (must come before pets)
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('adopter', 'donor', 'daycare_owner', 'admin') NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- VETERINARIANS (must come before pet_medical_records)
CREATE TABLE IF NOT EXISTS veterinarians (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- DAYCARE CENTERS
CREATE TABLE IF NOT EXISTS daycare_centers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  contact VARCHAR(100),
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- =====================================================
-- DEPENDENT TABLES (reference users/categories above)
-- =====================================================

-- PETS
CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT,
  breed VARCHAR(100),
  category_id INT,
  owner_id INT,
  status ENUM('available', 'adopted', 'inactive') DEFAULT 'available',
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- PET MEDICAL RECORDS
CREATE TABLE IF NOT EXISTS pet_medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  record_date DATE,
  description TEXT,
  veterinarian_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- ADOPTION REQUESTS
CREATE TABLE IF NOT EXISTS adoption_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  adopter_id INT NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (adopter_id) REFERENCES users(id)
);

-- ADOPTIONS
CREATE TABLE IF NOT EXISTS adoptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  adopter_id INT NOT NULL,
  adoption_date DATE,
  status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (adopter_id) REFERENCES users(id)
);

-- DAYCARE BOOKINGS (care_schedules)
CREATE TABLE IF NOT EXISTS care_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  user_id INT,
  daycare_id INT,
  schedule_date DATE,
  activity VARCHAR(100),
  notes TEXT,
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (daycare_id) REFERENCES daycare_centers(id)
);

-- FEEDBACK
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  pet_id INT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  amount DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'INR',
  order_id VARCHAR(100),
  payment_id VARCHAR(100),
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  purpose VARCHAR(100),
  ref_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =====================================================
-- SEED DATA (sample data to get started)
-- =====================================================

-- Default categories
INSERT IGNORE INTO categories (id, name) VALUES
  (1, 'Dog'),
  (2, 'Cat'),
  (3, 'Rabbit'),
  (4, 'Bird'),
  (5, 'Fish'),
  (6, 'Small Animal');

-- Sample veterinarian
INSERT IGNORE INTO veterinarians (id, name, contact) VALUES
  (1, 'Dr. Priya Sharma', 'dr.priya@petpal.com'),
  (2, 'Dr. Rajan Mehta', 'dr.rajan@petpal.com');

-- Sample pets (no owner, publicly visible)
INSERT IGNORE INTO pets (id, name, age, breed, category_id, description, status) VALUES
  (1, 'Buddy',  2, 'Golden Retriever', 1, 'Friendly and playful golden retriever who loves cuddles.', 'available'),
  (2, 'Whiskers', 1, 'Persian Cat',    2, 'Calm and affectionate Persian cat, great indoors.', 'available'),
  (3, 'Thumper', 3, 'Holland Lop',    3, 'Super gentle rabbit, perfect for families with kids.', 'available'),
  (4, 'Mango',  1, 'Labrador',        1, 'Energetic lab puppy who loves outdoor play.', 'available'),
  (5, 'Luna',   4, 'Siamese Cat',     2, 'Elegant Siamese with beautiful blue eyes.', 'available'),
  (6, 'Rio',    2, 'African Grey',    4, 'Intelligent parrot that can mimic words.', 'available');

SELECT 'Database setup complete! All tables created and seed data inserted.' AS Status;
