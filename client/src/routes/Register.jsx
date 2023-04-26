import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../providers/UserProvider';
import {
    Alert,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Text,
    Select
} from "@chakra-ui/react";

export default function Register() {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isLoading: false,
        errors: {}
    });

    useEffect(() => {
        if (user.loggedIn) {
            navigate('/projects');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/register", {
                name: formState.name,
                email: formState.email,
                password: formState.password,
                confirmPassword: formState.confirmPassword
            });

            const { data } = response;
            updateUser({
                loggedIn: true,
                name: data?.name,
                email: data?.email,
            });

        } catch (error) {
            console.log(JSON.stringify(error));
            setFormState((prevState) => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    general: error.response?.data?.error || error.message,
                },
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Text align="center" fontSize="1.5em" fontWeight="bold">Register</Text>
                <Text>If you already have an account head to <Link style={{ color: 'blue' }} to="/login">Login</Link></Text>
            </div>
            {Object.keys(formState.errors).length > 0 && (
                <Alert>{JSON.stringify(formState.errors.general || formState.errors)}</Alert>
            )}
            <FormControl isRequired isInvalid={!!formState.errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    border="1px solid black"
                    bg="white"
                    type="name"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                />
            </FormControl>
            <FormControl isRequired isInvalid={!!formState.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                    border="1px solid black"
                    bg="white"
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                />
            </FormControl>
            <FormControl isRequired isInvalid={!!formState.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                    border="1px solid black"
                    bg="white"
                    type="password"
                    name="password"
                    id="password"
                    value={formState.password}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl isRequired isInvalid={!!formState.errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                    border="1px solid black"
                    bg="white"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl isRequired isInvalid={!!formState.errors.role}>
                <FormLabel>Role</FormLabel>
                <Select name="role" id="role" value={formState.role} onChange={handleChange}>
                    <option value="project-manager">Project Manager</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="tester">Tester</option>
                    <option value="analyst">Analyst</option>
                </Select>
            </FormControl>
            {Object.keys(formState.errors).length > 0 && Object.values(formState.errors).map((error, index) => (
                <FormErrorMessage key={index}>{error}</FormErrorMessage>
            ))}
            <Button mt={4} colorScheme="teal" isLoading={formState.isLoading} type="submit">
                Sign Up
            </Button>
        </form>
    );
};
