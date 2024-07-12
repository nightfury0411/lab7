import { Route, Routes } from "react-router-dom";
import useToggleTheme from "./components/customhook/useChangeTheme";
import Header from "./layouts/Header";
import IndexPage from "./pages";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import SignInSide from "./pages/login";
import NewsPage from "./pages/news";
import OrchidDetailPage from "./pages/orchid-detail";
import UserPage from "./pages/user";
import OrchidPage from "./pages/orchid";
import { Button } from "bootstrap";

function App() {
  const ThemeToggleProvider = useToggleTheme();
  return (
    <>
      <ThemeToggleProvider>
        <Header />
        <Routes>
          <Route path={"/"} element={<IndexPage />} />
          <Route path={"/news"} element={<NewsPage />} />
          <Route path={"/contact"} element={<ContactPage />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/detail/:id"} element={<OrchidDetailPage />} />
          <Route path={"/login"} element={<SignInSide />} />
          <Route path={"/admin/user-management"} element={<UserPage />} />
          <Route path={"/admin/orchid-management"} element={<OrchidPage />} />
        </Routes>
      </ThemeToggleProvider>
    </>
  );
}

export default App;
