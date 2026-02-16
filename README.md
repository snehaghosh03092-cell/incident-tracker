A full-stack Incident Management System built with:

Frontend: React (Vite)

Backend: Flask (Python)

Database: MySQL

ORM: SQLAlchemy

Schema Validation: Marshmallow

The system supports incident creation, listing, filtering, sorting, and full editing.

Backend Setup


1.Navigate to backend folder
  cd backend
  
2.Create virtual environment
  python -m venv venv
  source venv/bin/activate   # Mac/Linux
  venv\Scripts\activate      # Windows
  
3.Install dependencies
  pip install -r requirements.txt
  
4.Configure environment variables
  DATABASE_URL=mysql://username:password@localhost/incident_db
  
5.Run the server
  python run.py
  Backend runs on:
    http://localhost:5000

Frontend Setup

1.Navigate to frontend folder
  cd frontend
  
2.Install dependencies
  npm install
  
3.Run development server
  npm run dev
  Frontend runs on:
    http://localhost:5173

API Overview

    Base URL:
        /api/incidents
        
    GET /api/incidents
    
        Fetch paginated incidents with filters.
        
        Query Parameters:
            page
            per_page
            search
            severity
            status
            sort_by
            sort_order
        
        GET /api/incidents/:id
        
            Fetch single incident by ID.
            
        POST /api/incidents
        
            Create new incident.
            Request Body:
                {
                "title": "Database outage",
                "summary": "Primary DB not responding",
                "service": "Payments",
                "owner": "John Doe",
                "severity": "SEV1",
                "status": "OPEN"
                }
                
        PATCH /api/incidents/:id
        
            Update an existing incident.
            supports partial updates

Design Decisions & Tradeoffs

    1. Frontend Architecture
        Used functional components with hooks.
        Centralized API layer (incidentsApi.js).
        Used React Router for routing.
        Used controlled components for forms.
        TradeOff:
            No global state manager (Redux/Zustand) since app size is small.
            Local state is sufficient for this assignment.
    
    2. Backend Architecture
        Flask + SQLAlchemy for simplicity and clarity.
        Marshmallow for request validation.
        RESTful endpoint design.
        Tradeoff:
            Used simple ENUM/VARCHAR for severity/status instead of separate lookup tables.
            No authentication layer (out of scope for assignment).
            
    3. Database Design
        UUID as primary key.
        Timestamp fields for created_at and updated_at.
        Simple schema to prioritize clarity over abstraction.
        Tradeoff:
            No indexing strategy beyond primary key (can be improved for scale).
            No soft delete.

Improvements With More Time
If given more time, I would:


    Backend Improvements
        Add authentication & role-based access.
        Add request logging & structured logging.
        Add database indexing for filtering fields.
        Implement soft deletes.
        Add automated tests (pytest).

    Frontend Improvements
        Add loading spinners instead of text.
        Add toast notification system.
        Add confirmation modal before delete.
        Add unsaved changes warning.
        Add optimistic UI updates.
        Add better form validation & error messages.
        Add responsive mobile layout improvements.

    DevOps Improvements
        Add Docker support.




    
