import './App.css'
import Appbar from './Components/Appbar'
import { Container, Stack } from '@mui/material'
import AllTasks from './Components/AllTasks'
import { TaskProvider } from './Providers/TaskProvider'
import { DialogProvider } from './Providers/DialogProvider'

function App() {
  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        <DialogProvider>
          <TaskProvider>
            <Appbar />
            <AllTasks />
          </TaskProvider>
        </DialogProvider>
      </Stack>
    </Container>
  )
}

export default App
