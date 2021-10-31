import React from 'react'
import { getFID } from 'web-vitals'
import { Formik, Field, Form } from 'formik'
import '../metric/index.js'

import { Layout } from '../components/Layout'

const Index = () => {
  const [ user, setUser ] = React.useState()
  React.useEffect(() => {
    console.log(34)
    getFID(({ value }) => {
      console.log(234, value)
      
      return window
      .dispatchEvent(new CustomEvent('fid', { detail: { value } }))
    })
  }, [])
  const handleSubmit = async ({ login }) => {
    const start = performance.now()
    const res = await fetch(`https://api.github.com/users/${login}`)
    setUser(await res.json())
    
    const duration = performance.now() - start

    window
      .dispatchEvent(new CustomEvent('onLoadGithubUser', { detail: { duration } }))
  }
  return (
    <Layout>
      <Formik
        initialValues={{ login: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="login">Github user name</label>
          <Field id="login" name="login" placeholder="walborn" />
          <button type="submit">
            Submit
          </button>
        </Form>
      </Formik>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </Layout>
  )
}

export default Index
