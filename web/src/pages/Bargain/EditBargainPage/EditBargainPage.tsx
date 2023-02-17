import EditBargainCell from 'src/components/Bargain/EditBargainCell'

type BargainPageProps = {
  id: number
}

const EditBargainPage = ({ id }: BargainPageProps) => {
  return <EditBargainCell id={id} />
}

export default EditBargainPage
