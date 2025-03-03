import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_Cloth_item, Get_cloth_item, REMOVE_Cloth_item, UPDATE_Cloth_item } from '../../store/Cloth/Cloth.action';

const Clothes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const { cloth } = useSelector((store) => store.ClothManger);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("Mens");
  const [Creds, setCreds] = useState({});

  useEffect(() => {
    dispatch(Get_cloth_item());
  }, [dispatch]);

  useEffect(() => {
    const filteredMen = cloth.filter((item) => item.category === filter);
    console.log(filteredMen); 
  }, [filter, cloth]);

  const handleFilterChange = (data) => {
    setFilter(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({
      ...Creds,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(Creds);
      dispatch(ADD_Cloth_item(Creds));
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(REMOVE_Cloth_item(id));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      console.log(Creds, id);
      dispatch(UPDATE_Cloth_item(id, Creds));
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  return (
    <>
      <select onChange={(e) => handleFilterChange(e.target.value)} style={{ border: "1px solid black" }}>
        <option value="Mens">Men</option>
        <option value="Womens">Women</option>
        <option value="KIDS">Kids</option>
      </select>
      <Button onClick={onOpen}>Add Product</Button>

      <Stack>
        {cloth
          .filter((item) => item.category === filter)
          .map((user) => (
            <Flex key={user.id}>
              <Text w={"30%"} p="0">
                {user.title}
              </Text>
              <Input
                w={"30%"}
                name="price"
                onChange={handleChange}
                placeholder={user.price}
              />
              <Flex p="0">
                <Button colorScheme="teal" onClick={() => handleUpdate(user.id)} border="1px solid black" mr="2">
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDelete(user.id)} border="1px solid black">
                  <DeleteIcon />
                </Button>
              </Flex>
            </Flex>
          ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <Stack>
                <input
                  type="text"
                  name="category"
                  style={{ border: "1px solid black" }}
                  placeholder="Category (Men, Women, etc.)"
                  onChange={handleChange}
                />
              </Stack>
              <Stack>
                <input
                  type="text"
                  name="title"
                  style={{ border: "1px solid black" }}
                  placeholder="Title"
                  onChange={handleChange}
                />
              </Stack>
              <Stack>
                <select name="code" onChange={handleChange} style={{ border: "1px solid black" }}>
                  <option>select code</option>
                  <option value="MNK59Y">MNK59Y</option>
                </select>
              </Stack>
              <Stack>
                <input
                  type="text"
                  name="image1"
                  style={{ border: "1px solid black" }}
                  onChange={handleChange}
                  placeholder="Image 1"
                />
                <input
                  type="text"
                  name="image2"
                  style={{ border: "1px solid black" }}
                  onChange={handleChange}
                  placeholder="Image 2"
                />
                <input
                  type="text"
                  name="image3"
                  style={{ border: "1px solid black" }}
                  onChange={handleChange}
                  placeholder="Image 3"
                />
                <input
                  type="text"
                  name="image4"
                  style={{ border: "1px solid black" }}
                  onChange={handleChange}
                  placeholder="Image 4"
                />
              </Stack>
              <Stack>
                <input
                  type="text"
                  name="price"
                  style={{ border: "1px solid black" }}
                  onChange={handleChange}
                  placeholder="Price: e.g., $90.00"
                />
              </Stack>
              <Stack>
                <select name="soldby" onChange={handleChange} style={{ border: "1px solid black" }}>
                  <option>select sold by</option>
                  <option value="Cutter & Buck">Cutter & Buck</option>
                </select>
              </Stack>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Clothes;
