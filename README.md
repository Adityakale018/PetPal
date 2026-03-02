# Pet Platform

A comprehensive, full-stack web application designed for pet lovers. This platform streamlines pet-related services, including pet adoptions, daycare scheduling, and medical record tracking, with integrated secure payments.

## Features

- **Pet Adoptions**: Browse available pets and manage adoption requests.
- **Daycare Services**: Schedule and manage daycare appointments for pets.
- **Medical Records**: Keep track of the pet's medical history and vet visits.
- **User Authentication**: Secure login and registration using JWT.
- **Integrated Payments**: Fast and secure payment processing with Razorpay integration.
- **Feedback System**: Collect and manage user feedback.

## Tech Stack

**Frontend**:
- React.js
- Tailwind CSS
- Framer Motion (for elegant animations)
- Axios

**Backend**:
- Node.js
- Express.js
- MySQL (using `mysql2`)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Razorpay for payment processing

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js installed
- MySQL Server installed and running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kshitijx07/pet-managment.git
   cd pet-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
   *Note: Ensure your MySQL server is running and the database matches your `.env` configuration.*

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Run Backend**
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5000` (or as configured).

**Run Frontend**
```bash
cd frontend
npm start
```
The frontend application will run on `http://localhost:3000`.

## License
This project is licensed under the ISC License.
