import { Outlet } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <>
      <div className="app">
        <UserProvider>
        <Navbar />
        <Message/>
        <Container>
          <Outlet />
        </Container>
        <Footer />
        </UserProvider>
      </div>
    </>
  );
}

export default App;
