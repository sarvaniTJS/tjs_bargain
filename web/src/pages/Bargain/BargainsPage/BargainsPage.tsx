import { useAuth } from 'src/auth'
import BargainsCell from 'src/components/Bargain/BargainsCell'

const BargainsPage = () => {
  const { userMetadata } = useAuth()

  return <BargainsCell externalId={userMetadata.sub} />
}

export default BargainsPage
