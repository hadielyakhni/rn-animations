import MorphRating from './src/screens/MorphRating'
import AnimatedProgressBar from './src/screens/ProgressBar/vanilla_animated'
import ReanimatedProgressBar from './src/screens/ProgressBar'
import TopTabs from './src/screens/TopTabs'
import AnalogClock from './src/screens/AnalogClock'
import DonutChart from './src/screens/DonutChart'
import BGBlurredCarousel from './src/screens/BGBlurredCarousel'
import YoloOnborading from './src/screens/YoloOnborading'
import ListScrolling from './src/screens/ListScrolling'
import ReanimatedDemo from './src/screens/ReanimatedDemo'
import GestureHandlerDemo from './src/screens/GestureHandlerDemo'
import AnimatedFlastListPicker from './src/screens/FlastListPicker/vanilla_animated'
import ReanimatedFlastListPicker from './src/screens/FlastListPicker'
import FluidCarousel from "./src/screens/FluidCarousel"

export default SCREENS = [
    { name: 'morph-rating', component: MorphRating },
    { name: 'animated-progress-bar', component: AnimatedProgressBar },
    { name: 'reanimated-progress-bar', component: ReanimatedProgressBar },
    { name: 'top-tabs', component: TopTabs },
    { name: 'analog-clock', component: AnalogClock },
    { name: 'donut-chart', component: DonutChart },
    { name: 'bg-blurred-carousel', component: BGBlurredCarousel },
    { name: 'yolo-onboarding', component: YoloOnborading },
    { name: 'list-scrolling', component: ListScrolling },
    { name: 'reanimated-demo', component: ReanimatedDemo },
    { name: 'gesture-handler-demo', component: GestureHandlerDemo },
    { name: 'flatlist-picker-animated', component: AnimatedFlastListPicker },
    { name: 'flatlist-picker-reanimated', component: ReanimatedFlastListPicker },
    { name: 'fluid-carousel', component: FluidCarousel },
]