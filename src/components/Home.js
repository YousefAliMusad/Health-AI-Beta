import React, { useEffect, useState } from "react";
import backgroundImage from '../Images/back4.jpg';
import Landnig from "./Landing";
import Section2 from "./Section2";
import Section3 from "./Section3";
const Home = () => {

  return (
    <div>
        <Landnig/>
        <Section2/>
        <Section3/>
    </div>
  );
};

export default Home;
