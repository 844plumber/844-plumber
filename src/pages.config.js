import Home from './pages/Home';
import About from './pages/About';
import Availability from './pages/Availability';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "Availability": Availability,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};