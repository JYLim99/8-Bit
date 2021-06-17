import React from "react";
import { useAuth } from "../Context/AuthContext";
import { AnimatePresence } from "framer-motion";
import MenuAuth from "../MenuAuth/MenuAuth";
import MenuNotAuth from "../MenuNotAuth/MenuNotAuth";


const Menu = () => {

  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <AnimatePresence>
        <MenuNotAuth />
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence>
        <MenuAuth />
      </AnimatePresence>
    );
  }
};

export default Menu;
