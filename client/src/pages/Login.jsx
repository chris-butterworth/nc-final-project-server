import { useEffect, useState } from "react";
import socket from "../socket";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import {
  Button,
  FormControl,
  InputLabel,
  Paper,
  Tab,
  Tabs,
  Typography,
  Box,
  Input,
} from "@mui/material";
import AvatarGallery from "../components/AvatarGallery";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [avatars, setAvatars] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUsername(userCredential.user.displayName);
        socket.emit("avatar", userCredential.user.photoURL);
        socket.emit("username", userCredential.user.displayName);
      })
      .catch((err) => {
        toast("invalid login");
      });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "60vh",
          width: "80vw",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "30vw",
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h2">
            Log In
          </Typography>
          <AvatarGallery
            avatars={avatars}
            setAvatars={setAvatars}
            currentAvatarIndex={currentAvatarIndex}
            setCurrentAvatarIndex={setCurrentAvatarIndex}
          />

          <FormControl sx={{ width: "30vw" }}>
            <InputLabel htmlFor="username">
              Set a username (play as guest)
            </InputLabel>
            <Input
              id="username"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
            />
            <Button
              sx={{ marginTop: "1em" }}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setUsername(usernameInput);
                socket.emit("username", usernameInput);
                socket.emit("avatar", avatars[currentAvatarIndex]);
                setUsernameInput("");
              }}
            >
              Submit username
            </Button>
            <Toaster />
          </FormControl>
          <Button
            sx={{ marginBottom: "2em", marginTop: "0.5em" }}
            className="login-random-username"
            onClick={() => {
              setUsernameInput(
                uniqueNamesGenerator({
                  dictionaries: [starWars],
                  length: 1,
                })
              );
            }}
          >
            Generate a random username
          </Button>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{ width: "80%", marginTop: "1em" }}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box sx={{ width: "100%" }}>
          {selectedTab === 0 && (
            <SignIn
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              signIn={signIn}
            />
          )}
          {selectedTab === 1 && (
            <SignUp
              setUsername={setUsername}
              avatars={avatars}
              currentAvatarIndex={currentAvatarIndex}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

// import { useEffect, useState } from "react";
// import socket from "../socket";
// import {
//   uniqueNamesGenerator,
//   adjectives,
//   colors,
//   animals,
//   starWars,
// } from "unique-names-generator";
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   Paper,
//   Tab,
//   Tabs,
//   Typography,
//   Box,
//   Input,
// } from "@mui/material";
// import AvatarGallery from "../components/AvatarGallery";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { SignUp } from "../components/SignUp";
// import { SignIn } from "../components/SignIn";
// import toast, { Toaster } from "react-hot-toast";

// const Login = ({ setUsername }) => {
//   const [usernameInput, setUsernameInput] = useState("");
//   const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
//   const [avatars, setAvatars] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedTab, setSelectedTab] = useState(0);

//   const signIn = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         setUsername(userCredential.user.displayName);
//         socket.emit("avatar", userCredential.user.photoURL);
//         socket.emit("username", userCredential.user.displayName);
//       })
//       .catch((err) => {
//         toast("invalid login");
//       });
//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         // height: "80vh",
//         width: "100vw",
//       }}
//     >
//       <Paper
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           minHeight: "60vh",
//           width: "80vw", // Adjust the width here
//         }}
//       >
//         <Box
//         sx={{
//         justifyContent: "center",
//         alignItems: "center",
//         width: "50vw",}}>
//         <Typography sx={{ textAlign: "center" }} variant="h2">
//           Log In
//         </Typography>
//         <AvatarGallery
//           avatars={avatars}
//           setAvatars={setAvatars}
//           currentAvatarIndex={currentAvatarIndex}
//           setCurrentAvatarIndex={setCurrentAvatarIndex}
//         />

//         <FormControl sx={{ width: "80%" }}>
//           <InputLabel htmlFor="username">
//             Set a username (play as guest)
//           </InputLabel>
//           <Input
//             id="username"
//             value={usernameInput}
//             onChange={(e) => {
//               setUsernameInput(e.target.value);
//             }}
//           />
//           <Button
//             type="submit"
//             onClick={(e) => {
//               e.preventDefault();
//               setUsername(usernameInput);
//               socket.emit("username", usernameInput);
//               socket.emit("avatar", avatars[currentAvatarIndex]);
//               setUsernameInput("");
//             }}
//           >
//             Submit username
//           </Button>
//           <Toaster />
//         </FormControl>
//         <Button
//           sx={{ marginBottom: "10px" }}
//           className="login-random-username"
//           onClick={() => {
//             setUsernameInput(
//               uniqueNamesGenerator({
//                 dictionaries: [starWars],
//                 length: 1,
//               })
//             );
//           }}
//         >
//           Generate a random username
//         </Button>
//         </Box>

//         <Tabs
//           value={selectedTab}
//           onChange={handleTabChange}
//           centered
//           sx={{ width: "80%", marginTop: "10px" }}
//         >
//           <Tab label="Sign In" />
//           <Tab label="Sign Up" />
//         </Tabs>

//         <Box sx={{ width: "100%" }}>
//           {selectedTab === 0 && (
//             <SignIn
//               email={email}
//               password={password}
//               setEmail={setEmail}
//               setPassword={setPassword}
//               signIn={signIn}
//             />
//           )}
//           {selectedTab === 1 && (
//             <SignUp
//               setUsername={setUsername}
//               avatars={avatars}
//               currentAvatarIndex={currentAvatarIndex}
//             />
//           )}
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;

// import { useEffect, useState } from "react";
// import socket from "../socket";
// import {
//   uniqueNamesGenerator,
//   adjectives,
//   colors,
//   animals,
//   starWars,
// } from "unique-names-generator";
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   Paper,
//   Tab,
//   Tabs,
//   Typography,
//   Box,
//   Input,

// } from "@mui/material";
// import AvatarGallery from "../components/AvatarGallery";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { SignUp } from "../components/SignUp";
// import { SignIn } from "../components/SignIn";
// import toast, { Toaster } from "react-hot-toast";

// const Login = ({ setUsername }) => {
//   const [usernameInput, setUsernameInput] = useState("");
//   const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
//   const [avatars, setAvatars] = useState([]);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [selectedTab, setSelectedTab] = useState(0);

//   const signIn = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         setUsername(userCredential.user.displayName);
//         socket.emit("avatar", userCredential.user.photoURL);
//         socket.emit("username", userCredential.user.displayName);
//       })
//       .catch((err) => {
//         toast("invalid login");
//       });
//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <Paper
//       sx={{
//         margin: "10vh 10vw",
//         display: "flex",
//         justifyContent: "space-around",
//         alignItems: "center",
//         flexDirection: "column",
//         minHeight: "60vh",
//         minWidth: "40vw",
//       }}
//     >
//       <Typography sx={{ textAlign: "center" }} variant="h2">
//         Log In
//       </Typography>
//       <AvatarGallery
//         avatars={avatars}
//         setAvatars={setAvatars}
//         currentAvatarIndex={currentAvatarIndex}
//         setCurrentAvatarIndex={setCurrentAvatarIndex}
//       />

//       <FormControl sx={{ width: "80%" }}>
//         <InputLabel htmlFor="username">Set a username (play as guest)</InputLabel>
//         <Input
//           id="username"
//           value={usernameInput}
//           onChange={(e) => {
//             setUsernameInput(e.target.value);
//           }}
//         />
//         <Button
//           type="submit"
//           onClick={(e) => {
//             e.preventDefault();
//             setUsername(usernameInput);
//             socket.emit("username", usernameInput);
//             socket.emit("avatar", avatars[currentAvatarIndex]);
//             setUsernameInput("");
//           }}
//         >
//           Submit username
//         </Button>
//         <Toaster />
//       </FormControl>
//       <Button
//         sx={{ marginBottom: "10px" }}
//         className="login-random-username"
//         onClick={() => {
//           setUsernameInput(uniqueNamesGenerator({ length: 1 }));
//         }}
//       >
//         Generate a random username
//       </Button>

//       <Tabs
//         value={selectedTab}
//         onChange={handleTabChange}
//         centered
//         sx={{ width: "80%", marginTop: "10px" }}
//       >
//         <Tab label="Sign In" />
//         <Tab label="Sign Up" />
//       </Tabs>

//       <Box sx={{ width: "80%" }}>
//         {selectedTab === 0 && (
//           <SignIn
//             email={email}
//             password={password}
//             setEmail={setEmail}
//             setPassword={setPassword}
//             signIn={signIn}
//           />
//         )}
//         {selectedTab === 1 && (
//           <SignUp
//             setUsername={setUsername}
//             avatars={avatars}
//             currentAvatarIndex={currentAvatarIndex}
//           />
//         )}
//       </Box>
//     </Paper>
//   );
// };
// //   return (
// //     <Paper
// //       sx={{
// //         margin: "10vh 10vw",
// //         display: "flex",
// //         justifyContent: "space-around",
// //         alignItems: "center",
// //         flexDirection: "column",
// //         minHeight: "60vh",
// //         minWidth: "40vw",
// //       }}
// //     >
// //       <Typography sx={{ textAlign: "center" }} variant="h2">
// //         Log In
// //       </Typography>
// //       <AvatarGallery
// //         avatars={avatars}
// //         setAvatars={setAvatars}
// //         currentAvatarIndex={currentAvatarIndex}
// //         setCurrentAvatarIndex={setCurrentAvatarIndex}
// //       />

// //       <FormControl sx={{ width: "80%" }}>
// //         <InputLabel htmlFor="username">
// //           Set a username (play as guest)
// //         </InputLabel>
// //         <Input
// //           id="username"
// //           value={usernameInput}
// //           onChange={(e) => {
// //             setUsernameInput(e.target.value);
// //           }}
// //         ></Input>
// //         <Button
// //           type="submit"
// //           onClick={(e) => {
// //             e.preventDefault();
// //             setUsername(usernameInput);
// //             socket.emit("username", usernameInput);
// //             socket.emit("avatar", avatars[currentAvatarIndex]);
// //             setUsernameInput("");
// //           }}
// //         >
// //           Submit username
// //         </Button>
// //         <Toaster />
// //       </FormControl>
// //       <Button
// //         sx={{ marginBottom: "10px" }}
// //         className="login-random-username"
// //         onClick={() => {
// //           setUsernameInput(
// //             uniqueNamesGenerator({
// //               // dictionaries: [adjectives, animals, colors],
// //               // length: 2,
// //               dictionaries: [starWars],
// //               length: 1,
// //             })
// //           );
// //         }}
// //       >
// //         Generate a random username
// //       </Button>

// //       <SignIn
// //       email={email}
// //       password={password}
// //       setEmail={setEmail}
// //       setPassword={setPassword}
// //       signIn={signIn}
// //     />
// //       <SignUp
// //         setUsername={setUsername}
// //         avatars={avatars}
// //         currentAvatarIndex={currentAvatarIndex}
// //       />
// //     </Paper>
// //   );
// // };

// export default Login;
