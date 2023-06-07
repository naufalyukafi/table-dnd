import { useState } from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  useColorMode,
  Button,
  Input,
  Stack,
  IconButton,
  Grid,
  GridItem,
  Heading,
  Divider,
  Flex,
  Wrap,
  WrapItem,
  Avatar,
  Select,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Layouts from './components/layouts';

const data = [
  { id: 'nomor', label: 'Nomor' },
  { id: 'nama', label: 'Nama' },
  { id: 'alamat', label: 'Alamat' },
];

const items = [
  { id: 'item1', nomor: '001', nama: 'Person 1', alamat: 'Address 1' },
  { id: 'item2', nomor: '002', nama: 'Person 2', alamat: 'Address 2' },
  { id: 'item3', nomor: '003', nama: 'Person 3', alamat: 'Address 3' },
  // ... more items
];

function App() {
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { colorMode } = useColorMode();

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const draggedHeaderId = result.draggableId;
    const updatedHeaders = [...selectedHeaders];

    // Add or remove the dragged header from the selected headers list
    if (updatedHeaders.includes(draggedHeaderId)) {
      updatedHeaders.splice(updatedHeaders.indexOf(draggedHeaderId), 1);
    } else {
      updatedHeaders.push(draggedHeaderId);
    }

    setSelectedHeaders(updatedHeaders);
    setIsFiltering(true);

    const filtered = items.map((item) => {
      const filteredItem = {};
      updatedHeaders.forEach((header) => {
        filteredItem[header] = item[header];
      });
      return filteredItem;
    });

    setFilteredItems(filtered);
  };

  const handleRemoveFilter = (header) => {
    const updatedHeaders = selectedHeaders.filter((selectedHeader) => selectedHeader !== header);
    setSelectedHeaders(updatedHeaders);

    if (updatedHeaders.length === 0) {
      setIsFiltering(false);
      setFilteredItems([]);
    } else {
      const filtered = items.map((item) => {
        const filteredItem = {};
        updatedHeaders.forEach((header) => {
          filteredItem[header] = item[header];
        });
        return filteredItem;
      });

      setFilteredItems(filtered);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setIsFiltering(false);
      setSelectedHeaders([]);
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) =>
        selectedHeaders.some((header) =>
          item[header]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredItems(filtered);
      setIsFiltering(true);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleItemsPerPageChange = (e) => {
    const perPage = parseInt(e.target.value);
    setItemsPerPage(perPage);
    setCurrentPage(1);
  };

  // Menghitung indeks item pertama dan terakhir pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layouts>
      <Box top={0} position="fixed" as="nav" w="100%" zIndex={1}>
        <Container pt={10} maxW="container.lg" mt={20}>
          <Stack direction="row" spacing={4}>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton aria-label="Search by name" icon={<SearchIcon />} onClick={handleSearch} />
          </Stack>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Box mt={5} display="flex" justifyContent="center">
              <Droppable droppableId="headers">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    display="flex"
                    flexWrap="wrap"
                    bg={colorMode === 'dark' ? 'gray.700' : 'teal.100'}
                    p={2}
                    borderRadius="md"
                    boxShadow="md"
                  >
                    {data.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            p={2}
                            m={1}
                            bg={selectedHeaders.includes(item.id) ? 'teal.500' : 'gray.600'}
                            color={selectedHeaders.includes(item.id) ? 'white' : 'inherit'}
                            borderRadius="md"
                            cursor="pointer"
                            onClick={() => handleDragEnd({ draggableId: item.id })}
                            style={{
                              boxShadow: snapshot.isDragging ? '0px 0px 8px rgba(0, 0, 0, 0.2)' : 'none',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {item.label}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
            <Divider my={6} />
            <Box px={10}>
              {isFiltering && (
                <Box display="flex" alignItems="center" mb={4}>
                  <Text fontSize="sm" fontWeight="bold" mr={2}>
                    Filter Aktif:
                  </Text>
                  <Wrap>
                    {selectedHeaders.map((header) => (
                      <WrapItem key={header}>
                        <Flex
                          bg={colorMode === 'dark' ? 'gray.700' : 'teal.200'}
                          p={2}
                          borderRadius="md"
                          alignItems="center"
                        >
                          <Text mr={2}>{header}</Text>
                          <IconButton
                            aria-label="Clear Filter"
                            icon={<CloseIcon />}
                            size="xs"
                            onClick={() => handleRemoveFilter(header)}
                          />
                        </Flex>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              )}
              <Table variant="simple">
                <Thead>
                  <Tr>
                    {selectedHeaders.map((header) => (
                      <Th key={header}>{header}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {currentItems.map((item) => (
                    <Tr key={item.id}>
                      {selectedHeaders.map((header) => (
                        <Td key={`${item.id}-${header}`}>{item[header]}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={6}>
                <GridItem colSpan={1} display="flex" alignItems="center">
                  <Heading as="h6" fontSize="md" mr={2}>
                    Items Per Page:
                  </Heading>
                  <Select value={itemsPerPage} onChange={handleItemsPerPageChange} w="auto">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </Select>
                </GridItem>
                <GridItem colSpan={1} display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="sm" fontWeight="bold">
                    Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredItems.length)} of{' '}
                    {filteredItems.length} items
                  </Text>
                </GridItem>
                <GridItem colSpan={1} display="flex" alignItems="center" justifyContent="flex-end">
                  <Button
                    rightIcon={<ChevronRightIcon />}
                    disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                    onClick={handleNextPage}
                  >
                    Next
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          </DragDropContext>
        </Container>
      </Box>
    </Layouts>
  );
}

export default App;
