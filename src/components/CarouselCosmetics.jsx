import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, useBreakpointValue, Button, Icon } from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar, AiFillDollarCircle } from "react-icons/ai";
import axios from "axios";
import Slider from "react-slick";
import { setItem } from "../utility/localStorage";
import { useNavigate } from "react-router";
import { Text, Card, CardBody, Image, Stack, Flex, Box as ChakraBox } from "@chakra-ui/react";

// Slider settings
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
};

export default function CarouselCosmetics() {
  const [slider, setSlider] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClick = useCallback((item) => {
    setItem("singleproduct", item);
    navigate("/cosmetics/singleproduct");
  }, [navigate]);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  useEffect(() => {
    axios.get("https://next-backend-orpin.vercel.app/Cosmetics")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <Box position="relative" height="600px" width="80%" overflow="hidden">
      {/* CSS files for react-slick */}
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <AiFillCaretLeft color="black" />
      </IconButton>

      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <AiFillCaretRight color="black" />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {data.map((el) => (
          <Card key={el.id} cursor="pointer" onClick={() => handleClick(el)} height="460px" maxW="sm">
            <CardBody>
              <Image
                ml="20px"
                width="250px"
                height="200px"
                src={el.image1}
                alt={el.title}
                borderRadius="lg"
              />
              <Stack spacing="4">
                <Text noOfLines={1} fontWeight="bold" fontSize="sm">
                  {el.title}
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${el.price}
                </Text>
                <Box mb="15px">
                  {Array(5).fill("").map((_, i) => {
                    let rating = Math.ceil(Math.random() * 3);
                    return <Icon as={AiFillStar} key={i} color={i <= rating ? "gold" : "gray.300"} />;
                  })}
                </Box>

                <Text ml="30px" textAlign="center" fontSize="sm">
                  <Flex ml="60px">
                    <Text>Sold-by -</Text>
                    <Text fontWeight="bold">{el.soldby}</Text>
                  </Flex>
                </Text>

                <Box>
                  <Flex marginLeft="80px" textAlign="bottom">
                    <Text mr="5px">$1.00/2</Text>
                    <AiFillDollarCircle mr="5px" mt="2px" width="30px" height="30px" color="teal" />
                    <Text ml="5px">Cashback</Text>
                  </Flex>
                </Box>

                <Text color="teal" mb="30px">Free shipping with $99 orders</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Slider>
    </Box>
  );
}
