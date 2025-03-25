import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
/*
import Leads from './pages/Leads'; // Import the Leads page
import './App.css';
import LeadComp from "./components/LeadComp";
import Services from "./pages/Services";
//import Friends from "./pages/Friends";
import MyAccount from "./pages/MyAccount";
*/
function App() {
  const { user, signOut } = useAuthenticator();

  return (/*
    <Router>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/leads"> Leads </Link>
        <Link to="/services"> Services </Link>
        <Link to="/friends"> Friends </Link>
        <Link to="/account"> Account </Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <main>
            <h1>{user?.signInDetails?.loginId}</h1>
            <Link to ="/leads"><button>Leads</button></Link>
            
            <LeadComp />
            <button onClick={signOut}>Sign out</button>
          </main>
        } />
        <Route path="/leads" element={<Leads />} />
        <Route path="/services" element={<Services />} />
        <Route path="/account" element={<MyAccount />} />
      </Routes>
    </Router>
  */);
}

export default App;
//<Route path="/friends" element={<Friends />} />

