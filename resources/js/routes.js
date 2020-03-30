import Home from './components/Home';
import Settings from './components/Settings';
import Whoops from './components/Whoops';

export default{
	mode: 'history',
	linkActiveClass: 'font-bold',

	routes:[
		{
			path: '*',
			component: Whoops
		},
		{
			path: '/',
			component: Home
		},
        {
            path: '/settings',
            component: Settings
        },
	]
}
