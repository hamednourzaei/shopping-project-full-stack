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
  Link,
} from "@chakra-ui/react";
import {
  BiRightArrowAlt,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillStar,
  AiFillDollarCircle,
} from "react-icons/ai";
import axios from "axios";
import Slider from "react-slick";
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

export default function Carousel() {
  const [slider, setSlider] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const handleClick = (item) => {
    setItem("singleproduct", item);
    navigate("/jewelery/singleproduct");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://next-backend-orpin.vercel.app/jewelery"
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box position="relative" height="600px" width="80%" overflow="hidden">
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

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {data.map((el, index) => (
          <Card
            key={el.id}
            cursor="pointer"
            onClick={() => handleClick(el)}
            height="460px"
            maxW="sm"
          >
            <CardBody>
              <Image
                width="250px"
                height="200px"
                src={el.image1}
                alt={el.title}
                borderRadius="lg"
              />
              <Stack spacing="4">
                <Text fontWeight="bold" noOfLines={1}>
                  {el.title}
                </Text>
                <Text fontWeight="bold" fontSize="lg">
                  ${el.price}
                </Text>
                <Box>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Icon
                        as={AiFillStar}
                        key={i}
                        color={i < el.rating ? "gold" : "gray.300"}
                      />
                    ))}
                </Box>
                <Flex justify="space-between">
                  <Text>Sold by:</Text>
                  <Text fontWeight="bold">{el.soldby}</Text>
                </Flex>
                <Flex align="center">
                  <Text>$1.00/2</Text>
                  <Icon as={AiFillDollarCircle} color="teal" mx={2} />
                  <Text>Cashback</Text>
                </Flex>
                <Text color="teal">Free shipping with $99 orders</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Slider>
    </Box>
  );
}
