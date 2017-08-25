import React from 'react'
import LoaderIcon from 'react-icons/lib/fa/refresh'

import style from './loader.scss'

const Loader = ({size = 56, mini}) => (
  <div className={style['wrap-loader']}
       style={mini ? {lineHeight: '80px', marginTop: '-15px'} : {}}>
    <LoaderIcon className={style['icon']} color='#507299' size={mini ? 24 : size} />
  </div>
);

export default Loader