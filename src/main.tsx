import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {AppRouter} from '@routes/AppRouter.tsx';
import './styles/common.css';
import {store} from '@store/index.ts';
import {SnackbarProvider} from "notistack";

createRoot(document.getElementById('root')!).render(
    <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
    >
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </SnackbarProvider>
);