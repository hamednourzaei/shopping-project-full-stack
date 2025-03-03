import React from "react";
import { Flex, Grid, Box, Text, Button, Icon, Image } from "@chakra-ui/react";
import { AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setItem } from '../utility/localStorage';
import { useDispatch, useSelector } from "react-redux";
import { Get_Cosmetics_item, sortCOSMETICS } from "../store/Cosmetics/Cosmetics.action";
import Loading from "./Loading";

const Cosmetics = () => {
  const [filter, setFilter] = useState("Mens");
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Cosmetics } = useSelector((store) => store.CosmeticsManger);

  const handleClick = (item) => {
    setItem("singleproduct", item);
    navigate("/Cosmetics/singleproduct");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "reset") {
      setReset((previous) => !previous);
      return;
    }
    dispatch(sortCOSMETICS(value));
  };

  useEffect(() => {
    dispatch(Get_Cosmetics_item());
  }, [reset]);

  let data = Cosmetics.filter((item) => item.category === filter);

  if (Cosmetics.length === 0) return <Loading />;

  return (
    <div style={{ marginTop: "120px" }}>
      <Flex>
        <Box id='maindiv' border={"1px solid"} width={"20%"}>
          <Text marginTop={2} color={"teal"} fontSize={35} fontWeight={"bold"}>Cosmetics</Text>
          <Box marginLeft={"40px"} textAlign={"left"} marginTop={"15px"}>
            <Flex alignItems={"center"} gap={"15px"}> 
              <Image marginTop={"8px"} borderRadius={"50%"} height={"25px"} width={"25px"} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaXelByMSTcBlhsGChcrAWlXVXNXxI53LxzirHbHwGJQ&s' />
              <Text className='menu' onClick={() => setFilter("Mens")} fontWeight={"bold"}>Mens</Text>
            </Flex>
            <Flex alignItems={"center"} gap={"15px"}> 
              <Image marginTop={"8px"} borderRadius={"50%"} height={"25px"} width={"25px"} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZH_L731sgBrBunH8f5lp6pLAhvehf2DuZJGjFeI&s' />
              <Text className='menu' onClick={() => setFilter("Womens")} fontWeight={"bold"}>Womens</Text>
            </Flex>
            <Flex alignItems={"center"} gap={"15px"}> 
              <Image marginTop={"8px"} borderRadius={"50%"} height={"25px"} width={"25px"} src='https://img.icons8.com/color/2x/children.png' />
              <Text className='menu' onClick={() => setFilter("KIDS")} fontWeight={"bold"}>Kids</Text>
            </Flex>
          </Box>
          <Box id="filter">
            <select onChange={(e) => handleChange(e)}>
              <option value="reset">sort-by-price</option>
              <option value="high">Low to high</option>
              <option value="low">High to low</option>
            </select>
          </Box>
        </Box>

        <Grid mt={"30px"} marginLeft={"240px"} paddingLeft={"15px"} width={"80%"} templateColumns='repeat(2, 1fr)' gap={6}>
          {data.map((el) => (
            <Box key={el.id} textAlign={"left"}>
              <img src={el.image1} alt="" />
              <Text noOfLines={[1]} fontSize={17}>{el.title}</Text>
              <Flex gap={2}>
                <Image width={17} src="https://img.shop.com/Image/resources/images/onecart-icon.svg" />
                <Text fontSize={13}>Sold by {el.soldby}</Text>
              </Flex>
              <Text>{el.category}</Text>
              <Text fontWeight={"bold"}>$ {el.price}</Text>
              <Box mb="15px">
                {Array(5).fill("").map((_, i) => (
                  <Icon
                    as={AiFillStar}
                    key={i}
                    color={i <= Math.ceil(Math.random() * 3) ? "gold" : "gray.300"}
                  />
                ))}
              </Box>
              <Text color={"teal"} fontSize={14}>Free shipping with $50.00 orders</Text>
              <Button backgroundColor={"blue.300"} onClick={() => handleClick(el)} borderRadius={25} width={85} marginLeft={"70%"}>View</Button>
            </Box>
          ))}
        </Grid>
      </Flex>
    </div>
  );
};

export default Cosmetics;
