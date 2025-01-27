import Authentication from './pages/Authentication';
import Configuration from './pages/Configuration';
import CreateKey from './pages/CreateKey';
import KeyInfo from './pages/KeyInfo';
import Splash from './pages/Splash';
import Wallet from './pages/Wallet';

const routes = [{
    path: '/',
    component: Splash,
    private: false,
}, {
    path: '/authentication',
    component: Authentication,
    private: false,
}, {
    path: '/configuration',
    component: Configuration,
    private: true,
}, {
    path: '/keys',
    component: CreateKey,
    private: true,
}, {
    path: '/keys/:name',
    component: KeyInfo,
    private: true,
}, {
    path: '/dashboard/wallet',
    component: Wallet,
    private: true,
}];

export default routes;
