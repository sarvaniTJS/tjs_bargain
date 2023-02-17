import BargainCell from 'src/components/Bargain/BargainCell'

type BargainPageProps = {
  id: number
}

const BargainPage = ({ id }: BargainPageProps) => {
  return <BargainCell id={id} />
}

export default BargainPage
