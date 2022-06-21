import React from "react"
import {render} from 'react-dom'

import App from '@layouts/App'
import { BrowserRouter } from 'react-router-dom'

render(<BrowserRouter><App /></BrowserRouter>, document.querySelector('#app'))


// pages - 서비스 페이지
// components -
// layouts -  공통적인 레이아웃