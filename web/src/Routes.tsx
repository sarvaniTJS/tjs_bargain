// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import AdminNavLayout from './layouts/AdminNavLayout/AdminNavLayout'
import NavbarLayout from './layouts/NavbarLayout/NavbarLayout'
import UserNavLayout from './layouts/UserNavLayout/UserNavLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={AdminNavLayout}>
        <Route path="/bargain-details" page={BargainDetailsPage} name="bargainDetails" />
        <Route path="/user-details" page={UserDetailsPage} name="userDetails" />
      </Set>
      <Set wrap={NavbarLayout}>
        <Route path="/show-bargain/{id:Int}" page={ShowBargainPage} name="showBargain" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Private unauthenticated="home">
        <Set wrap={UserNavLayout} title="Bargains" titleTo="bargains" buttonLabel="New Bargain" buttonTo="newBargain">
          <Route path="/bargains/new" page={BargainNewBargainPage} name="newBargain" />
          <Route path="/bargains/{id:Int}/edit" page={BargainEditBargainPage} name="editBargain" />
          <Route path="/bargains/{id:Int}" page={BargainBargainPage} name="bargain" />
          <Route path="/bargains" page={BargainBargainsPage} name="bargains" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
