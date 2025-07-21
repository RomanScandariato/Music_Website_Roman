import {Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Songs from './pages/Songs';
import Socials from './pages/SocialMedia';
import Contact from './pages/Contact';
// import ProtectRoute from './components/ProtectRoute';


import Landing from './pages/Landing';



function App() {

  return (
    <>

      <Header />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App