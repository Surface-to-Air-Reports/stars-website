import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './components/public/home';
import About from './components/public/about';
import AffectedAreas from './components/public/affected-areas';
// import Blog from './components/public/blog';
import TermsOfUse from './components/public/terms-of-use';
import DataSearch from './components/public/data-search';
import FileReport from './components/public/file-report';
import Methodology from './components/public/methodology';
import Statistics from './components/public/statistics';
import Rankings from './components/public/rankings';
import Header from "./components/reusable/header";
import Footer from "./components/reusable/footer";
import Notfound from "./components/public/notfound";
import PrivacyPolicy from './components/public/privacy-policy';

import {Box, CssBaseline, CssVarsProvider} from "@mui/joy";

import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemeSelector: 'media',
});


function App() {
    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between'}}>
                    <Box>
                        <Header />
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/affected-areas" element={<AffectedAreas/>}/>
                                {/* <Route path="/blog" element={<Blog/>}/>  */}
                                <Route path="/data-search" element={<DataSearch/>}/>
                                <Route path="/data-search/:tab/:typ/:fil" element={<DataSearch/>}/>
                                <Route path="/file-report" element={<FileReport/>}/>
                                <Route path="/methodology" element={<Methodology/>}/>
                                <Route path="/statistics" element={<Statistics/>}/>
                                <Route path="/rankings" element={<Rankings/>}/>
                                <Route path="/terms-of-use" element={<TermsOfUse/>} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy/>} />

                            <Route path="*" element={<Notfound/>}/>
                        </Routes>
                    </Box>
                    <Footer/>
                </Box>
            </BrowserRouter>
        </CssVarsProvider>
    );
}

export default App;
