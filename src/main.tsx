import '@/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from '@/contexts/auth.context'
import { MessageProviderWrapper } from '@/contexts/message.context'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <MessageProviderWrapper>
        <Router>
          <App />
        </Router>
      </MessageProviderWrapper>
    </AuthProviderWrapper>
  </React.StrictMode>,
)