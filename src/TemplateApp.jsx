
import { ToastContainer, Bounce } from 'react-toastify'
import { RouterApp } from "./Routes/RouterApp";
import 'react-toastify/dist/ReactToastify.css';
import WaitControlContainer from './components/Controls/WaitControl/WaitControlContainer';

export const TemplateApp = () => {
    return (
        <div>
            <WaitControlContainer />
            <RouterApp />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    )
}
