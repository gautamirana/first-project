import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import GalleryDetail from "./components/GalleryDetail";
import Videos from "./components/Video";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  // Only show Gallery (and GalleryDetail) without header/footer
  if (
    location.pathname.startsWith("/gallery") ||
    location.pathname.startsWith("/videos")
  ) {
    return (
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<GalleryDetail />} />
        <Route path="/videos" element={<Videos />} /> {/* <-- Add this line */}
      </Routes>
    );
  }
  // All other routes with header/footer
  return (
    <MainLayout>
      <Routes>
        {/* Add your other routes here */}
        {/* Example: <Route path="/" element={<Home />} /> */}
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
