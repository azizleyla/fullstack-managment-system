import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SWRConfig } from 'swr'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const fetcher = (...args) => fetch(...args).then((res) => res.json())


const colors = {
  brand: {
    900: "#024fc9",
    800: "#146af5",
    700: "#2977f2",
    600: "#337df2",
    500: "#4287f5"
  }
}

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        padding: "10px 20px",
        fontSize: "16px",
      }
    }
  },
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: "#263871",
      },
      "html, body, p, h1, h2, h3, h4, h5, h6, span, a, button, input, select, textarea": {
        fontSize: "15px"
      }
    }),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ fetcher }}>
        <ToastContainer autoClose={5000}
          hideProgressBar={true} />

        <App />
      </SWRConfig>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
