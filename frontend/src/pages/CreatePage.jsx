import { useProductStore } from '../store/product';
import { useColorModeValue } from '../hooks/color-mode';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { toaster } from '../components/toaster-provider';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const{createProduct} = useProductStore()

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct)
    if(!success){
      toaster.create({
        title:"Error",
        description: message,
        type: "error",
        closable: true,
      })
    } else {
      toaster.create({
        title:"Success",
        description: message,
        type: "success",
        closable: true,
      })
    }
    setNewProduct({name: "", price: "", image: "", description: ""});
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={4}>
        <Heading as={"h1"} size={"5xl"} textAlign={"center"} margin={12} fontWeight={"bold"}>
          Create New Product
        </Heading>

        <Box 
        w={"80%"} 
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"lg"}
        shadow={"md"}

        >
          <VStack spaceY={3}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
              borderColor="gray.500"
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
              borderColor="gray.500"
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
              borderColor="gray.500"
            />
            <Input
              placeholder='Description'
              name='description'
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value})}
              borderColor="gray.500"
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Add Product
            </Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
};

export default CreatePage