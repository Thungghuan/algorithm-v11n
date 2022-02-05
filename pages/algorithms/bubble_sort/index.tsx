import { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import baseStyle from '../../../styles/algorithms/base.module.css'
import style from '../../../styles/algorithms/bubbleSort.module.css'

const BubbleSort: NextPage = () => {
  const numbers = useMemo(() => [1, 9, 3, 5, 0, 4, 8, 2, 7, 6], [])
  // const steps: number[][] = []
  const [steps, setSteps] = useState<number[][]>()

  const sort = (numbers: number[]) => {
    const steps: number[][] = []

    let step: number[] = JSON.parse(JSON.stringify(numbers))
    steps.push(step)

    for (let i = 0; i < numbers.length - 1; ++i) {
      for (let j = 0; j < numbers.length - 1 - i; ++j) {
        if (numbers[j] > numbers[j + 1]) {
          ;[numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]]
        }

        step = JSON.parse(JSON.stringify(numbers))
        steps.push(step)

        step = []
      }
    }

    return steps
  }

  // const steps = sort(numbers)

  useEffect(() => setSteps(sort(numbers)), [numbers])

  return (
    <>
      <Head>
        <title>Visualization - Bubble Sort</title>
      </Head>

      <div className={baseStyle.container}>
        <h1 className={baseStyle.title}>Bubble Sort</h1>
        <div className={style.numbers}>
          numbers: {`[${numbers.join(', ')}]`}
        </div>

        <div className={style['steps-container']}>
          <p className={style['steps-title']}>Steps:</p>
          {steps?.map((step, i) => (
            <p key={i}>{step.join(', ')}</p>
          ))}
        </div>
      </div>
    </>
  )
}

export default BubbleSort
