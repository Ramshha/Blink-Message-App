import React from 'react'
import '../Home.css'

const DestroyMethod = ({ handleMethodChange }) => {
  return (
    <>
        <div>
          <label htmlFor="destruction-method">Destruction Method:</label>
          <select id="destruction-method" onChange={(e) => handleMethodChange(e.target.value)}>
            <option value="burn">Burn</option>
            <option value="shred">Shred</option>
            <option value="disappear">Disappear</option>
          </select>
      </div>
    </>
  )
}

export default DestroyMethod