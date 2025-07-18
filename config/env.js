import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_KEY, ARCJET_ENV, QSTASH_TOKEN, QSTASH_URL, SERVER_URL, EMAIL_PASSWORD} = process.env;

//token -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODE1MGU3YTJkNWEzZjc1ODI5YTQwNTgiLCJpYXQiOjE3NDYyMTA0MjYsImV4cCI6MTc0NjI5NjgyNn0.NtphSx9bpHxCnnt4uLJUZz5n_WensWehx3E7QLCehQ8
//userId -> 68150e7a2d5a3f75829a4058