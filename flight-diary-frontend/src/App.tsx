import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'

const baseUrl = '/api/diaries'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const doit = async () => {
      const body = await fetch(baseUrl, { method: 'GET' })
        .then(response => response.json())
      setDiaries(body as DiaryEntry[]);
    }
    doit();
  }, [])

  return <>
    <h1>Ilari's flights</h1>
    <h2>Diary Entries</h2>
    {diaries.map(ee => (
      <div>
        <h3>{ee.date}</h3>
        <div>visibility: {ee.visibility}</div>
        <div>weather: {ee.weather}</div>
        <div>comment: {ee.comment}</div>
      </div>
    ))}
  </>
}

export default App
