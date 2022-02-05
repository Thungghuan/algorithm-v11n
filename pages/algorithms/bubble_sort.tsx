import { NextPage } from "next"
import Head from "next/head"
import baseStyle from '../../styles/algorithms/base.module.css'

const BubbleSort: NextPage = () => {
  return <>
    <Head>
      <title>Visualization - Bubble Sort</title>
    </Head>
    <h1 className={baseStyle.title}>Bubble Sort</h1>
  </>
}

export default BubbleSort