import { useProductStore } from '../store/product'
import { useColorModeValue } from '../hooks/color-mode'
// import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Dialog, Heading, HStack, IconButton, Image, Input, Portal, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { toaster } from './toaster-provider'

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const textColor = useColorModeValue('gray.600', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')
    
    const {deleteProduct, updateProduct} = useProductStore()
    
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid)
        if(!success){
            toaster.create({
                    title:"Error",
                    description: message,
                    type: "error",
                    duration: 3000,
                    closable: true,
            });
        } else {
            toaster.create({
                    title:"Success",
                    description: message,
                    type: "success",
                    duration: 3000,
                    closable: true,
            });
        }
    };

    const handleUpdateProduct = async(pid, updatedProduct) => {
        const {success, message}= await updateProduct(pid, updatedProduct)
         if(!success){
            toaster.create({
                    title:"Error",
                    description: message,
                    type: "error",
                    duration: 3000,
                    closable: true,
            });
        } else {
            toaster.create({
                    title:"Success",
                    description: "Product Updated Successfully",
                    type: "success",
                    duration: 3000,
                    closable: true,
            });
        }
    }

  return (
    <Box
    shadow={'lg'}
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
    bg={bg}
    // spaceX={10}
    // spaceY={10}
    >
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />


        <Box p={4}>
            <Heading as='h3' size='xl' mb={1}>
                {product.name}
            </Heading>
            <Text fontSize={'xs'} mb={3}>
                {product.description}
            </Text>
            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}  mb={4}>
                ${product.price}
            </Text>



            <HStack spacing={2}>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <IconButton colorPalette={'blue'}>
                                ✎
                            </IconButton>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.CloseTrigger />
                                    <Dialog.Header>
                                        <Dialog.Title>Update Product</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <VStack spaceY={3}>
                                            <Input
                                                placeholder='Product Name'
                                                name='name'
                                                value={updatedProduct.name}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                                                borderColor="gray.500"
                                            />
                                            <Input
                                                placeholder='Price'
                                                name='price'
                                                type='number'
                                                value={updatedProduct.price}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
                                                borderColor="gray.500"
                                            />
                                            <Input
                                                placeholder='Image URL'
                                                name='image'
                                                value={updatedProduct.image}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
                                                borderColor="gray.500"
                                            />
                                            <Input
                                                placeholder='Description'
                                                name='description'
                                                value={updatedProduct.description}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value})}
                                                borderColor="gray.500"
                                            />
                                            </VStack>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Button
                                        colorPalette={'blue'}
                                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                        >
                                            Update
                                        </Button>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                    </Dialog.Footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                <IconButton colorPalette={'red'} onClick={() => handleDeleteProduct(product._id)} variant={'solid'}>
                    🗑️
                </IconButton>
            </HStack>
        </Box>

        
    </Box>
  )
}

export default ProductCard