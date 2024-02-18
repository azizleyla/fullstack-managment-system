import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import './App.css';
import Layout from './layouts';
import GeneralSkeleton from './components/common/GeneralSkeleton';

const DepartmentList = lazy(() => import('./components/department/DepartmentList'))
const EmployeeList = lazy(() => import('./components/employee/EmployeList'));
const CreateEmployee = lazy(() => import('./components/employee/CreateEmploye'));

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Navigate to="/admin" replace='true' />} />
        <Route path="admin" element={<Layout />}>
          <Route path="department" element={<Suspense fallback={<GeneralSkeleton />}><DepartmentList /></Suspense>} />
          <Route path="employee-list" element={<Suspense fallback={<GeneralSkeleton />}><EmployeeList /></Suspense>} />
          <Route path="create-employee" element={<Suspense fallback={<GeneralSkeleton />}><CreateEmployee /></Suspense>} />
        </Route>
      </Route >

    )
  )

  return (

    <RouterProvider router={router} />

  );
}

export default App;
