// Assets
import Buefy from 'buefy'
import { format as formatDate } from 'date-fns'
import PortalVue from 'portal-vue'
// Vendors
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueMq from 'vue-mq'
import Popper from 'vue-popperjs'
// others
import 'vue-popperjs/dist/vue-popper.css'
import SvgIcon from 'vue-svgicon'

// App
import App from './App.vue'
import './assets/icons'
import './assets/stylesheets/main.scss'
import BackgroundSimple from './components/Backgrounds/BackgroundSimple.vue'
import BackgroundTopoPlants from './components/Backgrounds/BackgroundTopoPlants.vue'
import ButtonMain from './components/Buttons/ButtonMain.vue'
import TextLink from './components/Buttons/TextLink.vue'
import CloseIcon from './components/CloseIcon.vue'
import DateSeparator from './components/DateSeparator.vue'
// Components
import PhoneNumber from './components/Form/PhoneNumber.vue'
import GraySeparator from './components/GraySeparator.vue'


import Separator from './components/Separator.vue'
import MultiSelector from './components/Tags/MultiSelector.vue'
import TagBlueFaded from './components/Tags/TagBlueFaded.vue'
import TagMain from './components/Tags/TagMain.vue'
import ContractedText from './components/Text/ContractedText.vue'
import IconAndText from './components/Text/IconAndText.vue'
import Tooltip from './components/Tooltip.vue'
// Layouts
import router from './router'
// Directives
import vClickOutside from './utils/directives/v-click-outside'

// Config
Vue.prototype.$formatInt = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

Vue.filter('format', function (value, format) {
  if (!value) return ''
  value = value.toString()
  return format(value, format)
})

Vue.directive('click-outside', vClickOutside)

// Plugins
Vue.use(Buefy)
Vue.use(VueI18n)
Vue.use(PortalVue)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  isStroke: true
})
Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 1024,
    lg: Infinity
  }
})

Vue.component('simple-separator', Separator)
Vue.component('button-main', ButtonMain)
Vue.component('tag-main', TagMain)
Vue.component('text-link', TextLink)
Vue.component('close-icon', CloseIcon)
Vue.component('icon-and-text', IconAndText)
Vue.component('tooltip', Tooltip)
Vue.component('gray-separator', GraySeparator)
Vue.component('background-topo-plants', BackgroundTopoPlants)
Vue.component('background-simple', BackgroundSimple)
Vue.component('date-separator', DateSeparator)
Vue.component('tag-blue-faded', TagBlueFaded)
Vue.component('multi-selector', MultiSelector)
Vue.component('contracted-text', ContractedText)
Vue.component('phone-number', PhoneNumber)

// external
Vue.component('popper', Popper)

Vue.filter('format', function (value, format) {
  if (!value) return ''
  return formatDate(new Date(value), format)
})

// Internationalization
const i18n = new VueI18n({
  // locale: 'fr.informal',
  fallbackLocale: 'fr.informal',
  messages: {
    'fr.informal': require('./translations/fr.json'),
    'en.informal': require('./translations/en.json'),
    'fr.formal': require('./translations/fr.json'),
    'en.formal': require('./translations/en.json')
  },
  silentTranslationWarn: true
})

const vm = new Vue({
  router,
  i18n,
  render: (h) => h(App)
}).$mount('#app')

export { vm, i18n }
