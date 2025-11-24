# Fullstack Prints - Lab 05

## Overview
This is a Node.js/Express fullstack application that displays a gallery of prints. It was originally designed as a lab assignment for learning MongoDB integration, but is currently running with a file-based data storage system.

## Project Architecture

### Backend (Express Server)
- **app.js**: Main application entry point that sets up the Express server on port 5000
- **api.js**: Route handlers for the products API endpoints
- **products.js**: Business logic for products (currently file-based)
- **middleware.js**: CORS and error handling middleware
- **lib/auto-catch.js**: Wrapper for async route handlers

### Frontend
- **index.html**: Main HTML page
- **public/index.js**: Client-side JavaScript for rendering the prints gallery
- **public/nanohtml.js**: Lightweight HTML templating library

### Data
- **data/full-products.json**: Full product catalog
- **data/products.json**: Product data
- **data/product1.json & product2.json**: Sample products
- **data/order1.json & order2.json**: Sample orders

## Current Configuration

### Server Settings
- **Host**: 0.0.0.0 (required for Replit environment)
- **Port**: 5000 (required for Replit webview)
- **Deployment**: Configured for autoscale deployment

### Dependencies
- express: Web framework
- body-parser: Request body parsing middleware
- mongoose: MongoDB ODM (installed but not currently in use)
- cuid: Unique ID generation
- node-fetch: HTTP client
- nodemon: Development server with auto-reload

## Recent Changes (Nov 24, 2025)
1. Updated server to bind to 0.0.0.0:5000 for Replit compatibility
2. Installed body-parser dependency
3. Configured workflow for development server
4. Configured deployment settings for production

## Development

### Running Locally
The application runs automatically via the configured workflow:
```bash
npm start
```

This uses nodemon to watch for file changes and automatically restart the server.

### API Endpoints
- `GET /`: Serve the main HTML page
- `GET /products`: List products with optional offset, limit, and tag query parameters
- `GET /products/:id`: Get a single product by ID
- `POST /products`: Create a new product
- `PUT /products/:id`: Update a product
- `DELETE /products/:id`: Delete a product

### Future Enhancements
According to the lab instructions, this project is designed to be enhanced with:
1. MongoDB database integration (see README.md for detailed instructions)
2. Orders module for handling eCommerce functionality
3. Full CRUD operations for both products and orders

## Notes
- This is a lab assignment imported from GitHub
- The project includes instructions for MongoDB integration but currently uses file-based storage
- CORS is enabled to allow cross-origin requests
- The frontend uses the nanohtml library for efficient client-side rendering
