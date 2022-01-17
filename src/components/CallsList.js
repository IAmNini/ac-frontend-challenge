import React, { useEffect, useState } from 'react';


export default function CallsList() {

  const [token, setToken] = useState('')
  const [calls, setCalls] = useState([])
  const [singleCallId, setSingleCallId] = useState('')
  const [singleCallDetails, setSingleCallDetails] = useState({})

  useEffect(() => {

    const logIn = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "fortuny",
        password: "fortuny"
      })
    }

    fetch('https://frontend-test-api.aircall.io/auth/login', logIn)
      .then(response => response.json())
      .then(res => setToken(res['access_token']))
      .then(console.log(token))


    const getCalls = {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
      body: JSON.stringify()
    }

    fetch('https://frontend-test-api.aircall.io/calls?offset=0&limit=10', getCalls)
      .then(response => response.json())
      .then(res => setCalls(res['nodes']))
      .then(console.log(calls))  

  }, [token])

  const handleCallClick = (event) => {
    
    setSingleCallId(event.target.id)
    console.log(singleCallId)

    const getCall = {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
      body: JSON.stringify()
    }

    fetch(`https://frontend-test-api.aircall.io/calls/:id${singleCallId}`, getCall)
      .then(response => response.json())
      .then(res => console.log(res))

  }

  const handleArchive = (event) => {
    
    setSingleCallId(event.target.id)
    console.log(singleCallId)

    const archiveCall = {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` },
      body: JSON.stringify()
    }

    fetch(`https://frontend-test-api.aircall.io/calls/:id${singleCallId}/archive`, archiveCall)
      .then(response => response.json())
      .then(res => console.log(res))

  }

  return (
    <div>
      <div>
        <h2>CALLS</h2>
        {calls && calls.map((call) => {
          return (
            <div className="calls-list">
            <div id={call.id} className="call-container" onClick={handleCallClick} >
              <div>Call type: {call.call_type}</div>
              <div>From: {call.from}</div>
              {/* add other call info here later */}
            </div>
            <div className="details">
              {/* add other details here later */}
              <button className={call.id} onClick={handleArchive}>Archive Call</button>
            </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}