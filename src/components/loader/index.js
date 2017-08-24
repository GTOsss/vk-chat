import React from 'react'
import LoaderIcon from 'react-icons/lib/fa/refresh'

import style from './loader.scss'

const Loader = ({size = 56, styleHTML = {}}) => (
  <div className={style['wrap-loader']}
       style={styleHTML}>
    <LoaderIcon className={style['icon']} color='#507299' size={size} />
  </div>
);

export default Loader