import React from 'react'
import Header from '../../../components/Header'

const Home = ({children}) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Home