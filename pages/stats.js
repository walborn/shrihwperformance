import { Layout  } from '../components/Layout'
import { showMetricByPeriod, showSlice } from '../metric/stats'


const Stats = ({ values }) => {
  const page = 'github user loading page'
  const from = new Date(2021, 9, 22)
  const to = new Date()
  console.table(showMetricByPeriod(values, page, from, to))
  console.table(showSlice('browser', 'onLoadGithubUser', values, page, from, to))
  
  return (
    <Layout>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Layout>
  )
}

const prepareData = ({ data }) => data
  .map(item => ({ ...item, date: +new Date(item.timestamp) }))



export async function getStaticProps() {
  const res = await fetch(`https://shri.yandex/hw/stat/data?counterId=${process.env.counterId}`)
  const values = prepareData(await res.json())
  return { props: { values } }
}

export default Stats
