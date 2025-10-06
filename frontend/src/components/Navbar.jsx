import {Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { Icon } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import React from 'react'
// import { PlusSquareIcon } from '@chakra-ui/icons'
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode} from './ui/color-mode';
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"95%"} px={4} pt={2}>
        <Flex
        h={16}
        alignContent={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}
        >
            <Text
             fontSize={"40px"}
             fontWeight={"bold"}
             textTransform={"uppercase"}
             textAlign={"center"}
             bgGradient="to-r" 
             gradientFrom="cyan.400" 
             gradientTo="blue.500"
             bgClip={"text"}
             >
                    <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spaceX={5} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        {/* <PlusSquareIcon fontSize={20} /> */}
                        <CiSquarePlus fontSize={20} />
                    </Button>
                </Link>

                <Button onClick={toggleColorMode}>
                    {/* {colorMode === "light" ? "🌚" : "🌞"} */}
                    {colorMode === "light" ? <IoMoon /> : <LuSun />}
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar