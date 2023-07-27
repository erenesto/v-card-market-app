import { useRouter } from 'next/router'

const PlayerPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <div>PlayerPage - {id}</div>
}

export default PlayerPage
