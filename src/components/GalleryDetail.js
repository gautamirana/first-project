// import React from 'react';
// import { useParams } from 'react-router-dom';
// import '../styles/GalleryDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/GalleryDetail.css';
import {
  Box,
  Image,
  Heading,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const galleryDetails = {
  1: {
    title: 'Bridal Mehndi',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
  2: {
    title: 'Party Mehndi',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
  3: {
    title: 'Kids Mehndi',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
  4: {
    title: 'Traditional Art',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
};

function GalleryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = galleryDetails[id];
  const [selectedImg, setSelectedImg] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (performance && performance.getEntriesByType('navigation')[0]?.type === 'reload') {
      navigate('/', { replace: true });
    }
  }, [navigate]);


  if (!detail) return <div>Gallery not found</div>;

  const handleImageClick = (img) => {
    setSelectedImg(img);
    onOpen();
  };

  return (
    <Box className="serviceSection" position="relative">
      <Heading as="h2" className="beautiful-title">{detail.title}</Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={6}
        maxW="1000px"
        mx="auto"
        className={detail.images.length === 1 ? "imagesContainer single-image" : "imagesContainer"}
      >
        {detail.images.map((img, idx) => (
          <Box
            key={idx}
            className="imageCardGallery"
            cursor="pointer"
            onClick={() => handleImageClick(img)}
            overflow="hidden"
          >
            <Image
              src={img}
              alt={detail.title}
              className="serviceImage"
              objectFit="cover"
              w="100%"
              h={{ base: "100px", sm: "140px", md: "260px" }}
              aspectRatio="4/3"
            />
          </Box>
        ))}
      </SimpleGrid>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        blockScrollOnMount={false} // <-- allow background scroll
      >
        <ModalOverlay />
        <ModalContent bg="white" borderRadius="lg" p={2}>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center" p={4}>
            {selectedImg && (
              <Image
                src={selectedImg}
                alt="Selected"
                maxH="70vh"
                maxW="80vw"
                borderRadius="md"
                objectFit="contain"
                boxShadow="lg"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default GalleryDetail;
