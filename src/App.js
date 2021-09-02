import React,{ useState, useEffect } from "react";
import FlipMove from 'react-flip-move';
import { addDoc, collection, query, orderBy, serverTimestamp, getDocs } from "firebase/firestore";
import db from "./firebase";
import { FormControl, InputLabel, Input, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@material-ui/core";
import TelegramIcon from '@material-ui/icons/Telegram';
import './style.css';
import Message from "./Message";
import LOGO from "./logo.png"


function App() {
  // Use State For Store Messagess
  const [messages,setMessages] =useState([]);
  // Use State Initialization for Message Input
  const [input,setInput] = useState('');
  // Use State for user name input
  const [name,setname] = useState('');
  // user name setname
  const [username,setUsername] = useState('');
  // For loadding
  const [isloading,setIsloading] = useState(true);
  // For Poupu
  const [open, setOpen] = React.useState(true);

  // For input user Name
  // Get Messsage To database
  const handleClose = () => {
    setUsername(name);
    setOpen(false);
  };

  useEffect(() => {
     //  write query for todo list display timestamp help
      const q = query(collection(db,"messagess"), orderBy('timestamp','desc'));
    // Featch Data Here..
    getDocs(q).then(snapshort=>{
      setMessages(snapshort.docs.map((doc)=>({id:doc.id,text:doc.data().text,username:doc.data().username})));
    })
    setIsloading(false);

  },[messages]);

  // // User Input Set Here
  // useEffect(()=>{
  //     setname(prompt('Please Enter Your Name'));
  // },[]);

  // Send Message To Database
  const sendMessage=()=>{
      addDoc(collection(db,"messagess"), {
        username:username,
        text:input,
        timestamp:serverTimestamp(),
      });
      setInput('');
  }

  return (
    <div className="container">
      {/* Dialog Box Here for user name parpose */}
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter User Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={name}
              label="Enter Your Name..."
              type="text"
              fullWidth
              onChange={ev=>setname(ev.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={!name} onClick={handleClose} color="primary">
                Submit 
            </Button>
          </DialogActions>
      </Dialog>
        <img src={LOGO} alt=""/>
        <h2>Hey, {!username ? 'Unknown User' : username} <br/> Welcome To Facebook Messenger</h2>
        <div className="messages-display">
          <div className="messages-container">
            <FlipMove>
              {messages.map(message=>(
                <Message isloading={isloading} key={message.id} username={username} message={message} />
              ))}
            </FlipMove>
          </div>
          <form>
            <FormControl style={{width:'100%'}}>
                <InputLabel >Write Your Message....</InputLabel>
                <Input type="text" value={input} onChange={event=>setInput(event.target.value)} />
                </FormControl>
            <Button disabled={!input} variant="contained" color="primary" onClick={sendMessage} ><TelegramIcon/></Button>
          </form>
        </div>
    </div>
  );
}

export default App;
