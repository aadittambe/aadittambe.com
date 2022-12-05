import Head from 'next/head'
import Home from '../src/components/Home.js'
import Image from 'next/image'
import Header from "../src/components/Header";

// import styles from '../styles/Home.module.scss'

// import Hero from '../.next/src/components/Hero'

const HomePage = (props) => {
  const { data } = props
  return (
    <div className={''}>
      <main className={''}>
        <Home data={data} />
      </main>
    </div>
  )
}

export default HomePage