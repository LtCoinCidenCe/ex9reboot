import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'

const baseUrl = '/api/diaries'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [clock, setClock] = useState(0);
  const [ddate, setDdate] = useState('');
  const [vis, setVis] = useState('');
  const [wtr, setWtr] = useState('');
  const [comment, setComment] = useState('');

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
    console.log(formElement);
    setDdate('');
    setVis('');
    setWtr('');
    setComment('');
  }

  const weatherSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('weatherSelection');
    setWtr(event.currentTarget.value);
  }

  const visibilitySelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('visibilitySelection');
    setVis(event.currentTarget.value);
  }

  return <>
    <h1>Ilari's Flights</h1>
    <h2>New Entry</h2>
    <p style={{ color: 'red' }}>{errorMessage}</p>
    <form onSubmit={diarySubmit}>
      <table>
        <tbody>
          <tr><td>date</td><td><input type='date' name='date' value={ddate} onChange={(event) => {
            setDdate(event.target.value);
          }} /></td></tr>
          <tr>
            <td>visibility</td>
            <td>
              <input type='radio' name='visibility' id='v1' value='great' checked={vis === 'great'} onChange={visibilitySelection} /><label htmlFor='v1'>great</label>
              <input type='radio' name='visibility' id='v2' value='good' checked={vis === 'good'} onChange={visibilitySelection} /><label htmlFor='v2'>good</label>
              <input type='radio' name='visibility' id='v3' value='ok' checked={vis === 'ok'} onChange={visibilitySelection} /><label htmlFor='v3'>ok</label>
              <input type='radio' name='visibility' id='v4' value='poor' checked={vis === 'poor'} onChange={visibilitySelection} /><label htmlFor='v4'>poor</label>
            </td>
          </tr>
          <tr>
            <td>weather</td>
            <td>
              <input type='radio' name='weather' id='w1' value='sunny' checked={wtr === 'sunny'} onChange={weatherSelection} /><label htmlFor='w1'>sunny</label>
              <input type='radio' name='weather' id='w2' value='rainy' checked={wtr === 'rainy'} onChange={weatherSelection} /><label htmlFor='w2'>rainy</label>
              <input type='radio' name='weather' id='w3' value='cloudy' checked={wtr === 'cloudy'} onChange={weatherSelection} /><label htmlFor='w3'>cloudy</label>
              <input type='radio' name='weather' id='w4' value='stormy' checked={wtr === 'stormy'} onChange={weatherSelection} /><label htmlFor='w4'>stormy</label>
              <input type='radio' name='weather' id='w5' value='windy' checked={wtr === 'windy'} onChange={weatherSelection} /><label htmlFor='w5'>windy</label>
            </td>
          </tr>
          <tr><td>comment</td><td><input type='text' name='comment' value={comment} onChange={(event) => setComment(event.target.value)} /></td></tr>
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
