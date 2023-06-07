import {
    Container,
    Box,
    Link,
    Stack,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    useColorModeValue,
    Heading,
    Text
} from '@chakra-ui/react'
import ThemeToggleButton from './theme-toggle-button'

const Navbar = (props) => {
    return (
        <Box
            top={0}
            position="fixed"
            as="nav"
            w="100%"
            zIndex={1}
            {...props}
        >
            <Container
                display="flex"
                p={5}
                maxW="container.lg"
                justifyContent="center"
                textAlign='center'
            >
                <div>
                    <Heading as='h4' size='md'>
                        Table Drag n Drop
                    </Heading>
                    <Text mt={2} fontSize='md'>Nikmati Filter Table dengan drag n drop dengan fitur lainnya</Text>
                </div>
                <Box>
                    {/* <ThemeToggleButton /> */}
                </Box>
            </Container>
        </Box>
    )
}

export default Navbar