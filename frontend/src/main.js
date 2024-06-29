import { render } from 'preact'
import { App } from './app.js'
import './index.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";                                
import "primeflex/primeflex.css";

render(<App />, document.getElementById('app'))
