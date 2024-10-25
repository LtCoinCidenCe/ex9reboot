import express from 'express'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!').end();
})

const PORT = 5173

app.listen(PORT, () => {
  console.log("express app listening on", PORT);
})
