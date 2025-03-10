import React from 'react'

interface ErrorProps {
  statusCode?: number;
}

function _error({ statusCode = 500 }: ErrorProps) {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Error {statusCode || 500}</h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  )
}

export default _error
