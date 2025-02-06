import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
    const [show,setShow]=useState(false)
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();

    const handleClick=()=>{setShow(!show)}

    const submitHandler=()=>{}
  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
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
      >
        Login
      </Button>
      ̥
      <Button
        w="100%"
        colorScheme='teal'
        style={{ marginTop: "15px" }}
        onClick={()=>{setEmail("sampleuser@gmail.com");
        setPassword("123456");}}
      >
        Get Guest User Credentials
      </Button>
      ̥
    </VStack>
  );
}

export default Login