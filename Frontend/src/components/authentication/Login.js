import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [show,setShow]=useState(false)
    const [user,setUser]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const history=useHistory();
    const toast = useToast();
    const [loading,setLoading]=useState(false)

    const handleClick=()=>{setShow(!show)}

     const submitHandler = async () => {
       setLoading(true);
       if (!email || !password) {
         toast({
           title: "Please Fill all the Feilds",
           status: "warning",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         setLoading(false);
         return;
       }

       try {
         const config = {
           headers: {
             "Content-type": "application/json",
           },
         };

         const { data } = await axios.post(
           "/api/user/login",
           { email, password },
           config
         );

         toast({
           title: "Login Successful",
           status: "success",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         setUser(data);
         localStorage.setItem("userInfo", JSON.stringify(data));
         setLoading(false);
         history.push("/chats");
       } catch (error) {
         toast({
           title: "Error Occured!",
           description: error.response.data.message,
           status: "error",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         setLoading(false);
       }
     };
  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        w="100%"
        colorScheme="green"
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      ̥
      <Button
        w="100%"
        colorScheme='teal'
        style={{ marginTop: "15px" }}
        onClick={()=>{setEmail("guestUser123@gmail.com");
        setPassword("123456");}}
      >
        Get Guest User Credentials
      </Button>
      ̥
    </VStack>
  );
}

export default Login