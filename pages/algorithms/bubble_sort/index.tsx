import next, { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import baseStyle from '../../../styles/algorithms/base.module.css'
import style from '../../../styles/algorithms/bubbleSort.module.css'

type BubbleSortStep = {
  type: 'MOVE' | 'SWAP' | 'START' | 'END'
  index: number
  next: number
}

const BubbleSort: NextPage = () => {
  // const numbers = useMemo(() => [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [])
  const numbers = useMemo(() => [1, 9, 3, 5, 0, 4, 8, 2, 7, 6], [])

  const [sortNumbers, setSortNumbers] = useState(() =>
    JSON.parse(JSON.stringify(numbers))
  )
  const [steps, setSteps] = useState<BubbleSortStep[]>()
  const [index, setIndex] = useState<number>(0)

  const nextStep = () => {
    if (steps && steps[index + 1].type === 'SWAP') {
      const current = steps[index + 1].index
      const next = steps[index + 1].next
      const numbers = JSON.parse(JSON.stringify(sortNumbers))

      steps[index + 1].next = current
      steps[index + 1].index = next
      ;[numbers[current], numbers[next]] = [numbers[next], numbers[current]]

      setSortNumbers(numbers)
    }
    setIndex(index + 1)
  }

  const reset = () => {
    setIndex(0)

    steps
      ?.filter((steps) => steps.type === 'SWAP')
      .forEach((step) => {
        ;[step.next, step.index] = [step.index, step.next]
      })
  }

  const sort = (numbers: number[]) => {
    numbers = JSON.parse(JSON.stringify(numbers))

    const steps: BubbleSortStep[] = []

    let step: BubbleSortStep = {
      type: 'START',
      index: -1,
      next: -1
    }
    steps.push(step)

    for (let i = 0; i < numbers.length - 1; ++i) {
      for (let j = 0; j < numbers.length - 1 - i; ++j) {
        step = {
          type: 'MOVE',
          index: j,
          next: j + 1
        }
        steps.push(step)

        if (numbers[j] > numbers[j + 1]) {
          ;[numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]]
          step = {
            type: 'SWAP',
            index: j,
            next: j + 1
          }
          steps.push(step)
        }
      }
    }

    steps.push({
      type: 'END',
      index: -1,
      next: -1
    })

    return steps
  }

  useEffect(() => setSteps(sort(numbers)), [numbers])

  const numberBlock = (number: number, i: number) => {
    const classList = [style['number-block']]

    if (i === steps?.[index].index) {
      classList.push(style['number-index'])
    } else if (i === steps?.[index].next) {
      classList.push(style['number-next'])
    }

    return (
      <div key={i} className={classList.join(' ')}>
        {number}
      </div>
    )
  }

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
            {sortNumbers.map(numberBlock)}
          </div>
        </div>

        <button
          onClick={nextStep}
          disabled={steps && steps[index].type === 'END'}
        >
          Next Step
        </button>

        <button onClick={reset}>Reset</button>
      </div>
    </>
  )
}

export default BubbleSort
