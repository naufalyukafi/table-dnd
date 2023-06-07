import { Box, Container, Divider, useColorMode } from '@chakra-ui/react'
import Navbar from './navbar'
import { useEffect } from 'react';

const Layouts = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        const storedColorMode = localStorage.getItem('colorMode');
        if (storedColorMode) {
            toggleColorMode(storedColorMode);
        }
    }, [toggleColorMode]);

    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', 'dark');
    }, [colorMode]);

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