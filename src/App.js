import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Navbar/Header";
import useOnlineStatus from "./customHooks/useOnlineStatus";
import OfflinePage from "./miscellaneousPages/OfflinePage";

function App() {
  const onlineStatus = useOnlineStatus();
  // const isLoggedIn = useSelector((store) => store.userDetails.isLoggedIn);
  // console.log(isLoggedIn)

  //why redux data gets refreshed when going to the wrong route
  return (
    <div className="cursor-default ">
      <Header />
      {onlineStatus && <Outlet />}
      <OfflinePage onlineStatus={onlineStatus} />
      <Footer />
    </div>
  );
}

export default App;
