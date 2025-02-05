# DevFlow: CMS

Web content management system that allows for hassle-free way to publish and manage content.

## API Endpoints

### User Management
- **Register User**: `POST /user/register/`
- **Login User**: `POST /user/login/`
- **User Profile**: `GET /user/profile/`
- **Change Password**: `POST /user/change-password/`
- **Send Password Reset Email**: `POST /user/reset-password-email/`
- **Reset Password**: `POST /user/reset-password/<uid>/<token>/`
- **Logout**: `POST /user/logout/`

### Article Management
- **List Articles**: `GET /articles/`
- **Create Article**: `POST /articles/create/`
- **Article Details**: `GET /articles/<int:id>/`
- **Update Article**: `PUT /articles/<int:id>/update/`
- **Delete Article**: `DELETE /articles/<int:id>/delete/`

## Setup Instructions

### For Backend
1. cd into \backend directory
2. Install dependencies through command `pip install -r requirements.txt`
3. Apply migrations `python manage.py migrate`
4. Run the server `python manage.py runserver`

### For Frontend
1. cd into \frontend directory
2. Install required dependencies through command `npm install`
3. Run `npm run dev`

Now both backend and frontend for CMS should be live at localhost:8000 (backend) and localhost:3000 (frontend).