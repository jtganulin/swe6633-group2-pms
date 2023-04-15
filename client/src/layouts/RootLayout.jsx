import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

import {
    Center,
    Flex,
    Box,
    Text,
    Link,
    Button,
    Stack,
} from '@chakra-ui/react';

export default function RootLayout({ children }) {
    return (
        <Flex direction="column" minH="100vh" bg='#586d91' position={'relative'}>
            <NavBar />
            <Flex flexGrow='1' justify="center" m='15' p='8' bg='#f0eae7'>
                {/* <Box flexDirection="column" flexGrow="1" p={8} bg={'#f0eae7'} maxW={95}> */}
                    <Outlet />
                {/* </Box> */}
            </Flex>
        </Flex>
    );
}
