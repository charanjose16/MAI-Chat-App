import React, { useEffect } from 'react'
import {Container,Box,Text,Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useHistory } from "react-router-dom";

const HomePage = () => {
const history=useHistory();

useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);       

  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d="flex"
        justifyContent="Center"
        textAlign="center"
        p={3}
        bg={"white"}
        w={"100%"}
        m="40px 0px 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
        shadow="dark-lg"
      >
        <Text fontSize="3xl" fontFamily="Work sans" fontWeight="400">
          MAI CHAT APP
        </Text>
      </Box>
      <Box width="100%" p={4} borderRadius="lg" bg="white" borderWidth="1px" shadow='dark-lg'>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb='1em'>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage