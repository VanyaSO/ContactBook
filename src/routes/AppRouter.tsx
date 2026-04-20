import {createBrowserRouter, RouterProvider} from 'react-router';
import {ContactsLayout} from '@components/Layouts/ContactsLayout';
import {ContactEmptyPage} from '@pages/ContactEmptyPage';
import {ContactDetailsPage} from '@pages/ContactDetailsPage';
import {ContactEditorPage} from '@pages/ContactEditorPage/ContactEditorPage';
import {NotFoundPage} from '@pages/NotFoundPage';
import {routes} from '@routes/routerConfig';

const router = createBrowserRouter([
    {
        element: <ContactsLayout/>,
        children: [
            {
                index: true,
                element: <ContactEmptyPage/>
            },
            {
                path: routes.contactDetails,
                element: <ContactDetailsPage/>
            },
            {
                path: routes.contactCreate,
                element: <ContactEditorPage/>
            },
            {
                path: routes.contactEdit,
                element: <ContactEditorPage/>
            },
            {
                path: routes.contactEdit,
                element: <ContactEditorPage/>
            },
            {
                path: '*',
                element: <NotFoundPage/>
            },
        ],
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;