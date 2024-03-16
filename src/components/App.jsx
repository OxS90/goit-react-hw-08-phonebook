import React, { useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from '../Routes/PrivateRoute';
import { RestrictedRoute } from '../Routes/RestrictedRoute';
import { refreshUser } from '../redux/authorisation/operations';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';

const HomePage = lazy(() => import('../pages/HomePage/Home'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/Register'));
const LoginPage = lazy(() => import('../pages/LoginPage/Login'));
const PhonebookPage = lazy(() => import('../pages/Phonebook/Phonebook'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const baseUrl = '';

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path={baseUrl} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path={`${baseUrl}/register`}
          element={
            <RestrictedRoute
              redirectTo={`${baseUrl}/phonebook`}
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path={`${baseUrl}/login`}
          element={
            <RestrictedRoute
              redirectTo={`${baseUrl}/phonebook`}
              component={<LoginPage />}
            />
          }
        />
        <Route
          path={`${baseUrl}/phonebook`}
          element={
            <PrivateRoute
              redirectTo={`${baseUrl}/login`}
              component={<PhonebookPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
