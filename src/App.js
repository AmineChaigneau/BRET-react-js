import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Bret from './features/bret/bret';
import Home from './features/home/home';

function App() {

  const theme = {
    colors: {
      background: {
        main: '#FFFFFF'
      },
      primary: {
        main: '#2EA44F',
        light: '#a3d4b1',
        text: 'black'
      }
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <FullScreen> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bret" element={<Bret />} />
        </Routes>
        {/* </FullScreen> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
