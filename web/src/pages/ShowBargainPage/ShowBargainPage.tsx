import { MetaTags } from '@redwoodjs/web'

import ShowBargainCell from 'src/components/ShowBargainCell'

const ShowBargainPage = ({ id }) => {
  return (
    <>
      <MetaTags title="ShowBargain" description="ShowBargain page" />

      <ShowBargainCell id={id} />
    </>
  )
}

export default ShowBargainPage
