import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Header from './components/Header';
import Summary from './pages/Summary';
// import Form from './components/Form';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
    // <Router>
    //   <div className="App">
    //     <Header />
    //     <Routes>
    //       <Route path="/plans">
    //         <Plans />
    //       </Route>
    //       <Route path="/">
    //         <Home />
    //       </Route>
    //     </Routes>
    //   </div>
    // </Router>
    // <div className="App">
    //   <Home />
    // </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
