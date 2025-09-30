import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Minimal sample data; replace with DB later if needed
const officials = [
  {
    name: 'Shri. Devendra Fadnavis',
    designation: 'Hon’ble Deputy Chief Minister',
    image: 'https://jdhepune.in/assets/img/team/Devendra_Fadnvis.jpg',
    type: 'current'
  },
  {
    name: 'Shri. Eknath Shinde',
    designation: 'Hon’ble Chief Minister',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Eknath_Shinde_2024.jpg/320px-Eknath_Shinde_2024.jpg',
    type: 'current'
  },
  {
    name: 'Shri. Ajit Pawar',
    designation: 'Hon’ble Deputy Chief Minister',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Ajit_Pawar.jpg/320px-Ajit_Pawar.jpg',
    type: 'current'
  },
  {
    name: 'Shri. Chandrakantdada Patil',
    designation: 'Hon’ble Minister\nHigher and Technical Education',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Chandrakant_Bacchu_Patil.jpg/320px-Chandrakant_Bacchu_Patil.jpg',
    type: 'current'
  },
  {
    name: "Shri. Indranil Naik",
    designation: "Hon'ble Minister of State\nHigher and Technical Education",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/No-Image-Placeholder.svg/320px-No-Image-Placeholder.svg.png',
    type: 'current'
  },
  {
    name: 'Shri. B. Venugopal Reddy, IAS',
    designation: "Hon'ble Addl. Chief Secretary\nHigher and Technical Education",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/No-Image-Placeholder.svg/320px-No-Image-Placeholder.svg.png',
    type: 'current'
  },
  {
    name: 'Dr. Shailendra Deolankar',
    designation: 'Incharge Director\nHigher Education',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/No-Image-Placeholder.svg/320px-No-Image-Placeholder.svg.png',
    type: 'current'
  },
  {
    name: 'Dr. Ashok Ubale',
    designation: 'Joint Director\nHigher Education, Pune Region',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/No-Image-Placeholder.svg/320px-No-Image-Placeholder.svg.png',
    type: 'current'
  }
]

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/officials', (req, res) => {
  res.json(officials)
})

app.listen(PORT, () => {
  console.log(`JDHE server listening on http://localhost:${PORT}`)
})
