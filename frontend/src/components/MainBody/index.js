import React, { useState } from "react";
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import MainSection from '../MainSection';
import InfoSection from "../InfoSection/index.js";
import {
    homeObjOne,
    homeObjTwo,
    homeObjThree,
  } from '../InfoSection/Data.js';
  import Footer from '../Footer';

const MainBody = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <MainSection />
        <InfoSection {...homeObjOne} />
        <InfoSection {...homeObjTwo} />
        <InfoSection {...homeObjThree} />
        <Footer />
      </>
    );
  };
  
  export default MainBody;