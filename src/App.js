
import { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase'

function App() {
  const ref = firebase.firestore().collection("logs")
  const [logs, setLogs] = useState([])
  const [name, setName] = useState("")
  const [work, setDescription] = useState('')
  const getData = ()=>{
    ref.onSnapshot((querySnapshot)=>{
      var items = []
      querySnapshot.forEach((doc)=>{
        var item = doc.data()
        item.id = doc.id
        items.push(item)
      })
      items.sort(function(x, y){
        return y.start - x.start;
      })
      let temp = []
      var i=0;
      items.forEach((item)=>{
        if (i++<20)
          temp.push(item)
      })
      items = temp
      setLogs(items)
    })
  }
  useEffect(getData,[])
  useEffect(()=>{
    console.log(logs)
  }, [logs])
  useEffect(()=>{
    console.log(name)
  },[name])

  const handleInitialSubmission = ()=>{
    console.log("submit")
    let content = {}
    content.name = name
    content.start = new Date()
    ref.add(content)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        var form = document.getElementById("formInitialSubmission");
        form.reset();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  const handleFinalSubmission = (id,start)=>{
    if(work===''){
      alert("Please add work description.")
      return;
    }
    console.log("submit")
    let content = {}
    start = new Date(start.seconds * 1000)
    console.log(start)
    content.end = new Date()
    content.duration = (content.end-start)/3600000
    content.work = work
    console.log(content)
    ref.doc(id).update(content)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        Hello employee(s), please log your work hours below.
      </header>
      <section className="App-outer-body">
        <section className="App-inner-body">
          <br/><br/><br/><br/><br/>
          <form className="item" id="formInitialSubmission">
            <div class="form-outline mb-4">
              <input onChange={e=>setName(e.target.value)} type="text" id="form4Example1" class="form-control input-box" />
              <label class="form-label" for="form4Example1">Name</label>
            </div>
            <button type="button" onClick={handleInitialSubmission} class="btn btn-primary btn-block mb-4">Start</button>
          </form>
          {logs.map((log, i)=>{
            console.log(log)
            return(<form className="item" key={i}>
              <div class="form-outline mb-4">
                <input disabled type="text" id="formName" class="form-control input-box" />
                <label class="form-label" for="formName">{log.name}</label>
              </div>
              <div class="form-outline mb-4">
                <label class="form-label spacing">Started: {new Date(log.start.seconds*1000).toTimeString()}</label>
              </div>
              {log.work!==''&&log.end&&log.work?
                <div class="form-outline mb-4">
                <label class="form-label spacing">Ended: {new Date(log.end.seconds*1000).toTimeString()}</label>
              </div>:null}
              {log.duration!=0&&log.duration?<div class="form-outline mb-4">
                <label class="form-label spacing" >Duration: {parseFloat(log.duration).toFixed(2)} hrs</label>
              </div>:null}
              {log.work===''||!log.work?<div><div class="form-outline mb-4">
                <textarea onChange={e=>setDescription(e.target.value)} class="form-control input-box" id="form4Example3" rows="4"></textarea>
                <label class="form-label" for="form4Example3">Work Description</label>
              </div>
              <button onClick={()=>handleFinalSubmission(log.id, log.start)} type="button" class="btn btn-primary btn-block mb-4">End</button>
              </div>:<div><div class="form-outline mb-4">
                  <label class="form-label spacing">{log.work}</label>
                </div>
              </div>}
            </form>)
          })}
        </section>
        
      </section>
    </div>
  );
}

export default App;
