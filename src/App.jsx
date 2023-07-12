import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/core/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Users/Login';
import UsersList from './pages/Users/UsersList';
import Navbar from './components/common/Navbar';
import UserShow from './pages/Users/UserShow';
import UserCreate from './pages/Users/UserCreate';
import UserUpdate from './pages/Users/UserUpdate';
import MeasurementCreate from './pages/Measurements/MeasurementCreate';
import MeasurementsList from './pages/Measurements/MeasurementsList';
import MeasurementShow from './pages/Measurements/MeasurementShow';
import MeasurementUpdate from './pages/Measurements/MeasurementUpdate';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/create"
            element={
              <ProtectedRoute>
                <UserCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute>
                <UserUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UserShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/measurements"
            element={
              <ProtectedRoute>
                <MeasurementsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/measurements/create"
            element={
              <ProtectedRoute>
                <MeasurementCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/measurements/edit/:id"
            element={
              <ProtectedRoute>
                <MeasurementUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/measurements/:id"
            element={
              <ProtectedRoute>
                <MeasurementShow />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}
export default App;

