import {Routes, Route} from 'react-router-dom';
// import ProtectRoute from './components/ProtectRoute';


import Landing from './pages/Landing';



function App() {

  return (
    <>

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
    </>
  )
}

export default App