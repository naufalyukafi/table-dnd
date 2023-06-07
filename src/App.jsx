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
} from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { SearchIcon } from '@chakra-ui/icons';

import Layouts from './components/layouts';

const data = [];

// Generate 20 dummy data
for (let i = 1; i <= 20; i++) {
  const newItem = {
    id: `${i}`,
    nomor: `00${i}`,
    nama: `Person ${i}`,
    alamat: `Address ${i}`,
  };
  data.push(newItem);
}

function App() {
  const [items, setItems] = useState(data);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const { colorMode } = useColorMode();

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const draggedItem = items[result.source.index];
    const remainingItems = items.filter((item, index) => index !== result.source.index);
    const updatedItems = [draggedItem, ...remainingItems];

    setItems(updatedItems);
    setIsFiltering(true);
    setFilteredItems(updatedItems);
  };

  const handleRemoveFilter = () => {
    setIsFiltering(false);
    setFilteredItems([]);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredItems([]);
      setIsFiltering(false);
    } else {
      const filtered = items.filter((item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
      setIsFiltering(true);
      setSearchQuery('');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedItems = isFiltering
    ? filteredItems
    : items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            <IconButton aria-label="Search" icon={<SearchIcon />} onClick={handleSearch} />
          </Stack>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="table">
              {(provided) => (
                <Table mt={5} ref={provided.innerRef} {...provided.droppableProps} variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Nomor</Th>
                      <Th>Nama</Th>
                      <Th>Alamat</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isFiltering && (
                      <Tr>
                        <Td colSpan={3}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            p={2}
                            bg={colorMode === 'dark' ? 'gray.800' : 'yellow.100'}
                          >
                            <Box>
                              <Text>Filter Aktif</Text>
                              <Text>
                                <strong>{filteredItems[0]?.nama}</strong> adalah item yang difilter.
                              </Text>
                            </Box>
                            <Button onClick={handleRemoveFilter}>Clear Filter</Button>
                          </Box>
                        </Td>
                      </Tr>
                    )}
                    {paginatedItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <Tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            display={isFiltering && index !== 0 ? 'none' : 'table-row'}
                          >
                            <Td>{item.nomor}</Td>
                            <Td>{item.nama}</Td>
                            <Td>{item.alamat}</Td>
                          </Tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Tbody>
                </Table>
              )}
            </Droppable>
          </DragDropContext>
          <Box mt={4} display="flex" justifyContent="right">
            <Grid templateColumns="repeat(5, 1fr)" gap={1}>
              {Array.from({ length: pageCount }, (_, index) => (
                <GridItem key={index + 1} colSpan={1}>
                  <Button
                    colorScheme={currentPage === index + 1 ? 'blue' : undefined}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layouts>
  );
}

export default App;
