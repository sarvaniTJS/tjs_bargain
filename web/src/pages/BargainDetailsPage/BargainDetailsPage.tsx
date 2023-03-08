import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import BargainsTableCell from 'src/components/BargainsTableCell/BargainsTableCell'

const BargainDetailsPage = () => {
  return (
    <>
      <MetaTags title="BargainDetails" description="BargainDetails page" />

      <BargainsTableCell />
    </>
  )
}

export default BargainDetailsPage
