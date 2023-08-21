
import './App.css';
import Dashboard from './components/Dashboard';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChakraProvider>
        <Dashboard/>
        </ChakraProvider>
       
      </header>
    </div>
  );
}

export default App;
