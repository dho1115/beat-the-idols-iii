import React from 'react'

import './ItemDiv.styles.css'

const ItemDiv = ({ slide }) => {

   return (
      <div className='item-div'>
         {slide}
      </div>
   )
}

export default ItemDiv