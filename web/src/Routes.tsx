// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Bargains" titleTo="bargains" buttonLabel="New Bargain" buttonTo="newBargain">
        <Route path="/bargains/new" page={BargainNewBargainPage} name="newBargain" />
        <Route path="/bargains/{id:Int}/edit" page={BargainEditBargainPage} name="editBargain" />
        <Route path="/bargains/{id:Int}" page={BargainBargainPage} name="bargain" />
        <Route path="/bargains" page={BargainBargainsPage} name="bargains" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
