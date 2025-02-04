// // src/Pages/LoginPage.js

// import React, { useState } from 'react';
// import axiosInstance from '../axiosInstance'; // Make sure this is the axios instance you use for API calls
import './LoginPage.css';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);  // To store error messages if login fails
//   const [loading, setLoading] = useState(false);  // To manage loading state during API call

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);  // Reset error before new request

//     // Make the POST request to your backend
//     axiosInstance
//       .post('/login/', { email, password })  // Adjust to your actual backend login endpoint
//       .then((response) => {
//         console.log('Login successful:', response.data);
//         // You can store user data or token in localStorage or context here if needed
//         // Redirect to another page after successful login, e.g., the dashboard
//         window.location.href = '/dashboard'; // Example redirection to dashboard
//       })
//       .catch((error) => {
//         console.error('Login error:', error);
//         setError('Invalid email or password.');  // Show error message
//       })
//       .finally(() => {
//         setLoading(false);  // Turn off loading state after API call is done
//       });
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1 className="login-title">Login</h1>
//         <form className="login-form" onSubmit={handleLogin}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="form-input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="form-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-button" disabled={loading}>
//             {loading ? 'Logging in...' : 'Log In'}
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}  {/* Display error message if any */}
//         <p className="signup-link">
//           Don't have an account? <a href="/signup">Sign up here</a>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// Nassor codes
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginLogout = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication (replace with actual logic)
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setError('');
      navigate('/farmer-dashboard'); // Navigate to the home page
    } else {
      setError('Invalid username or password');
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isAuthenticated ? (
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Welcome, Admin!</h1>
          
        </div>
      ) : (
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Admin Login</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginLogout;
