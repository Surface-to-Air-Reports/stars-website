import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './components/public/home';
import About from './components/public/about';
import AffectedAreas from './components/public/affected-areas';
import Blog from './components/public/blog';
import DataSearch from './components/public/data-search';
import FileReport from './components/public/file-report';
import Methodology from './components/public/methodology';
import Statistics from './components/public/statistics';
import WorstOffenders from './components/public/worst-offenders';
import Header from "./components/reusable/header";
import Footer from "./components/reusable/footer";


function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={About}/>
                    <Route path="/affected-areas" element={AffectedAreas}/>
                    <Route path="/blog" element={Blog}/>
                    <Route path="/data-search" element={DataSearch}/>
                    <Route path="/file-report" element={FileReport}/>
                    <Route path="/methodology" element={Methodology}/>
                    <Route path="/statistics" element={Statistics}/>
                    <Route path="/worst-offenders" element={WorstOffenders}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
