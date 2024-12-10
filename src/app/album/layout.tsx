import React from 'react'
import Page from '../album/page';
import ErrorBoundary from '../ErrorBoundary';
import Error from '../Error';

const layout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout