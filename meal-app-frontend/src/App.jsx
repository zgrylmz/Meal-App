import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Routers from "./routerConfig/Routers";
import IconMenu from "./component/IconMenu";
import AnimatedLoader from "./component/AnimatedLoader";
// import SearchForCountries from "./component/SearchForCountries";
// import Footer from "./component/Footer";


function App() {
  	const location = useLocation();
    const pathnames = ["/login","/sign"];
    const isNotLoginOrSign = pathnames.includes(location.pathname);
    // const recipesIsActiv = location.pathname === "/Recipes"
    console.log(location.pathname);

  return (
    <div>
      <Header />
      {!isNotLoginOrSign && <IconMenu/>}
      <div className={`${isNotLoginOrSign ? "":"sidebyside"} `}>
        {/* {recipesIsActiv ? <SearchForCountries/> : " "} */}
        <Routers/>
      </div>
      <AnimatedLoader/>
    </div>
  );
}



export default App;
