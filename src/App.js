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
import {Link} from "@mui/joy";


function App() {
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Link href={"/"}>about</Link>
                <Link href={"/affected-areas"}>affected areas</Link>
                <Link href={"/blog"}>blog</Link>
                <Link href={"/data-search"}>data search</Link>
                <Link href={"/file-report"}>file report</Link>
                <Link href={"/"}>home</Link>
                <Link href={"/methodology"}>methodology</Link>
                <Link href={"/statistics"}>statistics</Link>
                <Link href={"/worst-offenders"}>worst offenders</Link>
            </div>
            <BrowserRouter>
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
            </BrowserRouter>
        </div>
    );
}

export default App;
