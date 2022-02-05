import { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import baseStyle from '../../../styles/algorithms/base.module.css'
import style from '../../../styles/algorithms/bubbleSort.module.css'

const BubbleSort: NextPage = () => {
  const numbers = useMemo(() => [1, 9, 3, 5, 0, 4, 8, 2, 7, 6], [])
  const [steps, setSteps] = useState<number[][]>()
  const [index, setIndex] = useState<number>(0)

  const sort = (numbers: number[]) => {
    numbers = JSON.parse(JSON.stringify(numbers))

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

        <div className={style['visual-wrapper']}>
          <div className={style['number-wrapper']}>
            {steps?.[index].map((number, i) => (
              <div key={i} className={style['number-block']}>
                {number}
              </div>
            ))}
          </div>
        </div>

        <div className={style['steps-container']}>
          <p className={style['steps-title']}>Steps:</p>
          {steps?.map((step, i) => (
            <p key={i}>
              {i + 1}. {step.join(', ')}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}

export default BubbleSort
