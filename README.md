in backend if u want admin access 

id: admin
password:1234

├── backend/ # Django + DRF backend
└── frontend/ # React frontend for dashboard

yaml
Copy code

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/repo-name.git
cd task-4
2. Backend (Django)
bash
Copy code
cd backend
python -m venv env
env\Scripts\activate  # On Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
3. Frontend (React + Tailwind)
bash
Copy code
cd ../frontend
npm install
npm start
🧠 Technologies Used
Django + Django REST Framework

React.js

TailwindCSS

Chrome Extension API

SQLite (can be upgraded to PostgreSQL/MySQL)

