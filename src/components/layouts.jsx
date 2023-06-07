import { Box, Container, Divider } from '@chakra-ui/react'
import Navbar from './navbar'

const Layouts = ({ children }) => {
    return (
        <Box as="main">
            <Navbar />
            <Container maxW="container.lg" p={5} pt={20} pb={20} minH='100vh'>
                {children}
            </Container>
        </Box>
    )
}

export default Layouts