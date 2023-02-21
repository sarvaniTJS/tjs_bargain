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

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/show-bargain/{id:Int}" page={ShowBargainPage} name="showBargain" />
      <Route path="/" page={HomePage} name="home" />
      <Private unauthenticated="home">
        <Set wrap={ScaffoldLayout} title="Bargains" titleTo="bargains" buttonLabel="New Bargain" buttonTo="newBargain">
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
