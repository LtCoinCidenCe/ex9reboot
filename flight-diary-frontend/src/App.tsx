import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'

const baseUrl = '/api/diaries'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    fetch(baseUrl, { method: 'GET' })
      .then(response => response.json())
      .then(body => setDiaries(body as DiaryEntry[]))
  }, [])

  const diarySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const formData = new FormData(formElement)
    const obj = Object.fromEntries(formData)

    console.log(obj)
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    const newD = await response.json()
    setDiaries(diaries.concat(newD))
  }

  return <>
    <h1>Ilari's Flights</h1>
    <h2>New Entry</h2>
    <form onSubmit={diarySubmit}>
      <table>
        <tbody>
          <tr><td>date</td><td><input type='text' name='date' /></td></tr>
          <tr><td>visibility</td><td><input type='text' name='visibility' /></td></tr>
          <tr><td>weather</td><td><input type='text' name='weather' /></td></tr>
          <tr><td>comment</td><td><input type='text' name='comment' /></td></tr>
        </tbody>
      </table>
      <input type='submit' value="add" />
    </form>
    <h2>Diary Entries</h2>
    {diaries.map(ee => (
      <div key={ee.id}>
        <h3>{ee.date}</h3>
        <div>visibility: {ee.visibility}</div>
        <div>weather: {ee.weather}</div>
        <div>comment: {ee.comment}</div>
      </div>
    ))}
  </>
}

export default App
