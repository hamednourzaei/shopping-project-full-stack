import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Button,
  Icon,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Flex,
} from "@chakra-ui/react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillStar,
  AiFillDollarCircle,
} from "react-icons/ai";
import Slider from "react-slick";
import axios from "axios";
import { setItem } from "../utility/localStorage";
import { useNavigate } from "react-router";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
};

export default function CarouselHealth() {
  const [slider, setSlider] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const handleClick = (item) => {
    setItem("singleproduct", item);
    navigate("/health/singleproduct");
  };

  useEffect(() => {
    axios
      .get("https://next-backend-orpin.vercel.app/health")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <Box position="relative" height="600px" width="80%" overflow="hidden">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

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

      <Slider {...settings} ref={setSlider}>
        {data.map((el, index) => (
          <Card
            cursor="pointer"
            onClick={() => handleClick(el)}
            height="420px"
            maxW="sm"
            key={index}
          >
            <CardBody>
              <Image
                ml="20px"
                id="hov"
                width="250px"
                height="200px"
                src={el.image1}
                alt={el.title}
                borderRadius="lg"
              />
              <Stack spacing="4">
                <Text noOfLines={1} fontWeight="bold" size="xs">
                  {el.title}
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${el.price}
                </Text>
                <Box mb="15px">
                  {Array(5)
                    .fill("")
                    .map((_, i) => {
                      let rating = el.rating || 3;
                      return (
                        <Icon
                          as={AiFillStar}
                          key={i}
                          color={i < rating ? "gold" : "gray.300"}
                        />
                      );
                    })}
                </Box>

                <Text ml="auto" textAlign="center" fontSize="lg">
                  <Flex ml="auto">
                    sold-by - <Text fontWeight="bold">{el.soldby}</Text>
                  </Flex>
                </Text>

                <Box>
                  <Flex ml="auto" textAlign="bottom">
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
