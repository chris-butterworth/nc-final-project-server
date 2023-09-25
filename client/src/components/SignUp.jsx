import React, {useState} from 'react'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth } from '../../firebase'
import {
    Button,
    FormControl,
    InputLabel,
    Typography,
    Input,
    Box,
    Paper,
  } from "@mui/material";
const SignUp = ({setUsername}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[newUsername, setNewUsername] = useState('')
    
    const signUp = (e) => {
        e.preventDefault()
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                updateProfile(auth.currentUser, { // <-- Update Method here

                    displayName: newUsername,
                    

                  }).then(()=>{
                    setUsername(auth.currentUser.displayName)
                  }).catch((error) => {
                    console.log(error)
                  })
             }).catch((err) => {
                console.log(err)
             })


    }
    return (
        <Paper
        sx={{
          margin: "10vh 10vw",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "60vh",
          minWidth: "40vw",
        }}
      >
        <FormControl sx={{ width: "80%" }}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
         type="text"
         value={newUsername}
         onChange={(e) =>{
            setNewUsername(e.target.value)
         }}
        ></Input>
        </FormControl>
        <FormControl sx={{ width: "80%" }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) =>{
            setEmail(e.target.value)
          }}
        ></Input>
        </FormControl>
        <FormControl sx={{ width: "80%" }}>
         <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          type="password"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        ></Input>

        
        <Button
          onClick={signUp}
        >
          Submit username
        </Button>
      </FormControl>
    </Paper>)
}

export default SignUp