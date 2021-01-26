import Auth from './components/Auth'
import Home from './components/Home'
import SearchView from 'src/components/Search/SearchView.vue'
import RoomView from 'src/components/RoomDisplay/RoomView.vue'
import Reservation from 'src/components/MockUpComps/Reservation'
import Events from 'src/components/MockUpComps/Events'
import StartupPrograms from 'src/components/MockUpComps/StartupPrograms'

// import BasicChoice from './components/BasicChoices/Choices'

export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Auth },
    { path: '/room/search', component: SearchView },
    // { path: '/reservations', component: reservation },
    { path: '/room/details/:id', component: RoomView },
    { path: '/reservations', component: Reservation },
    { path: '/events', component: Events },
    { path: '/programs', component: StartupPrograms }
]