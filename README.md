Role Based Access Control Application built with ExpressJs ,view the deployment https://role-based.onrender.com/
## Prerequisites

- Node.js (v14.17.0 or higher)
- npm (v6.14.13 or higher)
## Getting Started
- Clone the respository and install the dependencies
- https://github.com/learnertanya/Role-Based-API.git
- Add .env file to root directory with URI of any Mongo Instance,
  Ex: MONGODB_URI ="Mongodb-URI"
- Run the backend server "npm start"
## API Endpoints

### User Authentication

- **POST `/api/auth/user/signup`**: Sign up a new user.
  - Request: Create a new user account.
  - Response: User account created successfully.

- **POST `/api/auth/user/login`**: User login.
  - Request: Log in with user credentials.
  - Response: User logged in successfully.

### Admin Authentication

- **POST `/api/auth/admin/signup`**: Sign up a new admin.
  - Request: Create a new admin account.
  - Response: Admin account created successfully.

- **POST `/api/auth/admin/login`**: Admin login.
  - Request: Log in with admin credentials.
  - Response: Admin logged in successfully.
### User HomePage
- **POST `/api/user/update`**: For Name and Profileimage updation.
- **POST `/api/user/delete`**: For deleting User account.
- **POST `/api/user/logout`**: Logging out.
### Admin HomePage
- **GET `/api/admin/users`** : Get all users info.
- **POST `/api/admin/modifyUser`**: For Name and Profileimage updation of a user.
- **POST `/api/admin/deleteUser`**: For deleting User account of a user.
- **POST `/api/admin/logout`**: Logging out.

  ## Preview
  - Homepage
![image](https://github.com/learnertanya/Role-Based-API/assets/94377598/041267c0-8f43-4202-8d85-d46d3b923b3a)
  - Signup and login Page for User
![image](https://github.com/learnertanya/Role-Based-API/assets/94377598/1b9688e0-2eba-44cc-b939-f0b9e0efb43c)
![image](https://github.com/learnertanya/Role-Based-API/assets/94377598/90816fe2-eba7-475b-af02-b61773aee473)
- Homepage for User
![image](https://github.com/learnertanya/Role-Based-API/assets/94377598/0a15648c-ee95-4924-8c82-7ebe1d86b702)
- Signup and login page for Admin
  ![image](https://github.com/learnertanya/Role-Based-API/assets/94377598/2b882e52-2f58-4a0f-bc38-f51a938493f2)
  ![image](https://github.com/learnertanya/Role-Based-API/assets/94377598/d82a4b02-36ce-42af-92c0-e4d0cda19b19)
- Homepage for Admin
![image](https://github.com/learnertanya/Role-Based-API/assets/94377598/d9e35a6e-0f62-4c50-82f5-4c826947d2c0)


## Thankyou :)



  

   


