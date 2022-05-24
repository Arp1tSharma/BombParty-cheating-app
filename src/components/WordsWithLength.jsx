import React from 'react'

export const WordsWithLength = ({length, data}) => {
  const copyText = (word) =>{
    navigator.clipboard.writeText(word);
  }
  return (
    <div className='result'>
        <h3>Words with length {length}</h3>
        <div className='words'>
        {data.map(word=> 
        <>
        <button>
        <span 
        onClick={() =>copyText(word)}>
        {word}
        </span>
        </button>
        </>)
        }
        </div>
    </div>
  )
}
