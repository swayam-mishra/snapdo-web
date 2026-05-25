import { Outlet, useLocation } from "react-router";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";
import CookieBanner from "../shared/CookieBanner";
import ScrollToTop from "../shared/ScrollToTop";

const darkNavRoutes = ["/", "/features", "/about"];

export default function PublicLayout() {
  const { pathname } = useLocation();
  const dark = darkNavRoutes.includes(pathname);

  return (
    <div>
      <ScrollToTop />
      <PublicNavbar dark={dark} />
      <main>
        <Outlet />
      </main>
      <PublicFooter dark={dark} />
      <CookieBanner />
    </div>
  );
}
