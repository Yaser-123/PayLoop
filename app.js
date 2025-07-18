import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'PayLoop API is running smoothly',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: process.uptime()
    });
});

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PayLoop API - Smart Subscription Management</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .hero {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
        }
        
        .hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .hero p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        
        .status {
            display: inline-flex;
            align-items: center;
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            backdrop-filter: blur(10px);
            margin-bottom: 2rem;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: #48bb78;
            border-radius: 50%;
            margin-right: 0.5rem;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .api-docs {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .api-header {
            background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
            color: white;
            padding: 2rem;
        }
        
        .api-header h2 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .api-section {
            padding: 2rem;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .api-section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
        }
        
        .section-icon {
            margin-right: 0.5rem;
            font-size: 1.5rem;
        }
        
        .endpoint {
            display: flex;
            align-items: center;
            padding: 1rem;
            margin: 0.5rem 0;
            background: #f7fafc;
            border-radius: 8px;
            border-left: 4px solid;
            transition: all 0.2s ease;
        }
        
        .endpoint:hover {
            transform: translateX(4px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .method {
            font-weight: 700;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.875rem;
            margin-right: 1rem;
            min-width: 60px;
            text-align: center;
        }
        
        .method.post {
            background: #48bb78;
            color: white;
        }
        
        .method.get {
            background: #4299e1;
            color: white;
        }
        
        .method.put {
            background: #ed8936;
            color: white;
        }
        
        .method.delete {
            background: #f56565;
            color: white;
        }
        
        .endpoint.post { border-left-color: #48bb78; }
        .endpoint.get { border-left-color: #4299e1; }
        .endpoint.put { border-left-color: #ed8936; }
        .endpoint.delete { border-left-color: #f56565; }
        
        .endpoint-path {
            font-family: 'Monaco', 'Menlo', monospace;
            font-weight: 600;
            color: #2d3748;
            margin-right: auto;
        }
        
        .endpoint-desc {
            color: #718096;
            font-size: 0.875rem;
        }
        
        .base-url {
            background: #2d3748;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Monaco', 'Menlo', monospace;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .footer {
            text-align: center;
            color: white;
            margin-top: 3rem;
            opacity: 0.8;
        }
        
        .footer a {
            color: white;
            text-decoration: none;
            font-weight: 500;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .container {
                padding: 1rem;
            }
            
            .endpoint {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .method {
                margin-bottom: 0.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>🔄 PayLoop API</h1>
            <p>Smart Subscription Management & Automated Reminder System</p>
            <div class="status">
                <div class="status-dot"></div>
                <span>API Status: Online</span>
            </div>
        </div>
        
        <div class="api-docs">
            <div class="api-header">
                <h2>API Documentation</h2>
                <p>RESTful API for managing subscriptions with automated workflows</p>
            </div>
            
            <div class="base-url">
                <strong>Base URL:</strong> https://payloop-r4mr.onrender.com
            </div>
            
            <div class="api-section">
                <div class="section-title">
                    <span class="section-icon">🔐</span>
                    Authentication
                </div>
                <div class="endpoint post">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/v1/auth/sign-up</span>
                    <span class="endpoint-desc">Register new user account</span>
                </div>
                <div class="endpoint post">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/v1/auth/sign-in</span>
                    <span class="endpoint-desc">User login & token generation</span>
                </div>
                <div class="endpoint post">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/v1/auth/sign-out</span>
                    <span class="endpoint-desc">User logout</span>
                </div>
            </div>
            
            <div class="api-section">
                <div class="section-title">
                    <span class="section-icon">📋</span>
                    Subscription Management
                </div>
                <div class="endpoint get">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/v1/subscriptions</span>
                    <span class="endpoint-desc">Get all subscriptions</span>
                </div>
                <div class="endpoint get">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/v1/subscriptions/:id</span>
                    <span class="endpoint-desc">Get subscription details</span>
                </div>
                <div class="endpoint post">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/v1/subscriptions</span>
                    <span class="endpoint-desc">Create new subscription</span>
                </div>
                <div class="endpoint get">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/v1/subscriptions/user/:id</span>
                    <span class="endpoint-desc">Get user subscriptions</span>
                </div>
                <div class="endpoint put">
                    <span class="method put">PUT</span>
                    <span class="endpoint-path">/api/v1/subscriptions/:id</span>
                    <span class="endpoint-desc">Update subscription</span>
                </div>
                <div class="endpoint put">
                    <span class="method put">PUT</span>
                    <span class="endpoint-path">/api/v1/subscriptions/:id/cancel</span>
                    <span class="endpoint-desc">Cancel subscription</span>
                </div>
                <div class="endpoint delete">
                    <span class="method delete">DELETE</span>
                    <span class="endpoint-path">/api/v1/subscriptions/:id</span>
                    <span class="endpoint-desc">Delete subscription</span>
                </div>
                <div class="endpoint get">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/v1/subscriptions/upcoming-renewals</span>
                    <span class="endpoint-desc">Get upcoming renewals</span>
                </div>
            </div>
            
            <div class="api-section">
                <div class="section-title">
                    <span class="section-icon">👥</span>
                    User Management
                </div>
                <div class="endpoint get">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/v1/users</span>
                    <span class="endpoint-desc">Get all users</span>
                </div>
                <div class="endpoint get">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/api/v1/users/:id</span>
                    <span class="endpoint-desc">Get user by ID</span>
                </div>
                <div class="endpoint post">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/v1/users</span>
                    <span class="endpoint-desc">Create new user</span>
                </div>
                <div class="endpoint put">
                    <span class="method put">PUT</span>
                    <span class="endpoint-path">/api/v1/users/:id</span>
                    <span class="endpoint-desc">Update user</span>
                </div>
                <div class="endpoint delete">
                    <span class="method delete">DELETE</span>
                    <span class="endpoint-path">/api/v1/users/:id</span>
                    <span class="endpoint-desc">Delete user</span>
                </div>
            </div>
            
            <div class="api-section">
                <div class="section-title">
                    <span class="section-icon">🔄</span>
                    Workflow System
                </div>
                <div class="endpoint post">
                    <span class="method post">POST</span>
                    <span class="endpoint-path">/api/v1/workflows/subscription/reminder</span>
                    <span class="endpoint-desc">Automated reminder workflows</span>
                </div>
            </div>
            
            <div class="api-section">
                <div class="section-title">
                    <span class="section-icon">🏥</span>
                    System Health
                </div>
                <div class="endpoint get">
                    <span class="method get">GET</span>
                    <span class="endpoint-path">/health</span>
                    <span class="endpoint-desc">API health check</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Built with ❤️ by <a href="https://mohdyaser.vercel.app/" target="_blank">Mohamed Yaser</a></p>
            <p>📧 <a href="mailto:1ammar.yaser@gmail.com">1ammar.yaser@gmail.com</a> | 
               🐙 <a href="https://github.com/Yaser-123/PayLoop" target="_blank">GitHub</a> | 
               💼 <a href="https://www.linkedin.com/in/mohamedyaser08/" target="_blank">LinkedIn</a></p>
        </div>
    </div>
</body>
</html>
    `);
})

app.listen(PORT,async () => {
    console.log(`Subscription tracking app API is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;
