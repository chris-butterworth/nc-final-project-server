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
        <InputLabel htmlFor="username">Sign Up Here</InputLabel>
        <Input
         
        ></Input>
        </FormControl>
        <FormControl sx={{ width: "80%" }}>
        <InputLabel htmlFor="username"> </InputLabel>
        <Input
          
        ></Input>
        </FormControl>
        <FormControl sx={{ width: "80%" }}>
         <InputLabel htmlFor="username"> </InputLabel>
        <Input
          
        ></Input>

        
        <Button
          onClick={(e) => {
            e.preventDefault();
           
          }}
        >
          Submit username
        </Button>
      </FormControl>
    </Paper>)
}

export default SignUp