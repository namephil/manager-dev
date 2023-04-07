import { useRoutes } from "react-router-dom";
import Home from "../components/Home";
import App from "../App"
import Login from "../components/Login";
 
import React, { memo } from 'react'
const DefineRoutes = memo(() => {
const routes= useRoutes(
    [
        {
            path: '/',
            element:<App></App>
        },
      {
        path: '/home',
        element:<Home></Home>
      },
      {
        path: '/login',
        element:<Login></Login>
      },
    ]
  )
  return routes
})
 
export default DefineRoutes 