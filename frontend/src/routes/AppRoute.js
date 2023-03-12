import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import Notifications from '../pages/notifications/Notifications';
import Video from '../pages/video/Video';


const AppRoute = () => {


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="/video/:videoId" element={<Video />} />
                <Route path="/notifications" element={<Notifications />} />

            </Route>


        )
    );



    return (
        <RouterProvider router={router} />
    )
}
export default AppRoute