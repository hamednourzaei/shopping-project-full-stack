import React, { useState, useEffect } from "react";
import { Box, IconButton, useBreakpointValue, Button, Icon, Text, Card, CardBody, Image, Stack, Flex } from "@chakra-ui/react";
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar, AiFillDollarCircle } from "react-icons/ai";
import axios from "axios";
import Slider from "react-slick";
import { setItem } from "../utility/localStorage";
import { useNavigate } from "react-router";

// Settings for the slider (improving responsiveness for different screen sizes)
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function CarouselElectronics() {
  const [slider, setSlider] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  const handleClick = (item) => {
    setItem("singleproduct", item);
    navigate("/electronics/singleproduct");
  };

  // Responsive values for the icon buttons
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://next-backend-orpin.vercel.app/Electronics")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <Box position={"relative"} height={"600px"} width={"90%"} overflow={"hidden"}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <Button backgroundColor={"blue.300"}>
          <AiFillCaretLeft color="black" />
        </Button>
      </IconButton>

      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <Button backgroundColor={"blue.300"}>
          <AiFillCaretRight color="black" />
        </Button>
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {data.map((el, index) => (
          <Card key={index} cursor="pointer" onClick={() => handleClick(el)} height="440px" maxW="sm">
            <CardBody>
              <Image
                width="100%"
                height="200px"
                objectFit="cover"
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
                  {Array(5)
                    .fill("")
                    .map((_, i) => {
                      let rating = Math.ceil(Math.random() * 3);
                      return (
                        <Icon
                          as={AiFillStar}
                          key={i}
                          color={i <= rating ? "gold" : "gray.300"}
                        />
                      );
                    })}
                </Box>

                <Text ml="30px" textAlign="center" fontSize="sm">
                  <Flex ml="20px">
                    <Text>Sold by - </Text>
                    <Text fontWeight="bold">{el.soldby}</Text>
                  </Flex>
                </Text>
                <Box>
                  <Flex marginLeft="30px" textAlign="bottom">
                    <Text mr="5px">$1.00/2</Text>
                    <AiFillDollarCircle
                      mr="5px"
                      mt="2px"
                      width="30px"
                      height="30px"
                      color="teal"
                    />
                    <Text ml="5px">Cashback</Text>
                  </Flex>
                </Box>
                <Text color="teal" mb="30px">
                  Free shipping with $99 orders
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Slider>
    </Box>
  );
}
