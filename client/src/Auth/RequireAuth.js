import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { setCredentials } from '../services/auth/authSlice';

export default function RequireAuth({ children }) {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const user = localStorage.getItem('user')
    if(token &&user){
      const localUser = JSON.parse(user);
      dispatch(setCredentials({token, user:localUser}))
    }

    const isAuthenticated = useSelector((state) => state.auth.token);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Layout>{children}</Layout>;
}
