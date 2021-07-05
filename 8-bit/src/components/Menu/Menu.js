import React from 'react'
import { AnimatePresence } from 'framer-motion'
import MenuAuth from '../MenuAuth/MenuAuth'
import MenuNotAuth from '../MenuNotAuth/MenuNotAuth'

const Menu = () => {
  const token = localStorage.FBIdToken
  if (token) {
    return (
      <AnimatePresence>
        <MenuAuth />
      </AnimatePresence>
    )
  } else {
    return (
      <AnimatePresence>
        <MenuNotAuth />
      </AnimatePresence>
    )
  }
}

export default Menu
