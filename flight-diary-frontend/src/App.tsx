import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'

const baseUrl = '/api/diaries'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [clock, setClock] = useState(0);

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
    if (!response.ok) {
      const message = await response.text();
      setErrorMessage(message.substring(22));
      clearTimeout(clock);
      setClock(setTimeout(() => {
        setErrorMessage('');
      }, 5000));
      return;
    }
    const newD = await response.json()
    setDiaries(diaries.concat(newD));
    (formElement[0] as HTMLInputElement).value = '';
    (formElement[1] as HTMLInputElement).value = '';
    (formElement[2] as HTMLInputElement).value = '';
    (formElement[3] as HTMLInputElement).value = '';
  }

  return <>
    <h1>Ilari's Flights</h1>
    <h2>New Entry</h2>
    <p style={{ color: 'red' }}>{errorMessage}</p>
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
