import MorphRating from './src/screens/MorphRating'
import ProgressBar from './src/screens/ProgressBar'
import TopTabs from './src/screens/TopTabs'
import AnalogClock from './src/screens/AnalogClock'
import DonutChart from './src/screens/DonutChart'
import BGBlurredCarousel from './src/screens/BGBlurredCarousel'
import YoloOnborading from './src/screens/YoloOnborading'
import ListScrolling from './src/screens/ListScrolling'

export default SCREENS = [
    { name: 'morph-rating', component: MorphRating },
    { name: 'progress-bar', component: ProgressBar },
    { name: 'top-tabs', component: TopTabs },
    { name: 'analog-clock', component: AnalogClock },
    { name: 'donut-chart', component: DonutChart },
    { name: 'bg-blurred-carousel', component: BGBlurredCarousel },
    { name: 'yolo-onboarding', component: YoloOnborading },
    { name: 'list-scrolling', component: ListScrolling }
]