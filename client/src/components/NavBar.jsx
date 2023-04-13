import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import {
    Flex,
    Box,
    Spacer,
    ButtonGroup,
    Button,
    Heading
} from '@chakra-ui/react';
import axios from "axios";

const test = async () => {
    try {
        const res = await axios.get('/api/users/me', { withCredentials: true });
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

export default function NavBar(props) {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Flex minWidth='max-content' boxShadow="1px 0 7px 1px black" alignItems='center' p='1em' gap='2' bg={'#cccccc'}>
            <Box p='2'>
                <Heading size='md'>Project MGMT System</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
                {user.loggedIn ? (
                    <>
                        <Button colorScheme='teal' onClick={() => navigate("/projects/new")}>Create</Button>
                        <Button colorScheme='teal' onClick={() => test()}>TEST</Button>
                        <Button colorScheme='teal' onClick={() => navigate("/projects")}>View Projects</Button>
                        <Button colorScheme='teal' onClick={() => navigate("/account")}>Account</Button>
                        <Button colorScheme='teal' onClick={logout}>Log out</Button>
                    </>
                ) : (
                    <>
                        <Button colorScheme='teal'>Sign Up</Button>
                        <Button colorScheme='teal'>Log in</Button>
                    </>
                )}
            </ButtonGroup>
        </Flex>
    );
}
