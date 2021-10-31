import React from 'react'
import Link from 'next/link'

export const Layout = (props) => {
  const [ selected, setSelected ] = React.useState('/')

  return (
    <>
      <Link href="/">index</Link>
      <Link href="/stats">stats</Link>
      {props.children}
    </>
  )
}
