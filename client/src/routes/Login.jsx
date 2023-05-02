import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import {
    Alert,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Text
} from "@chakra-ui/react";
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const { user, updateUser, logout } = useContext(UserContext);
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        isLoading: false,
        errors: {}
    });

    useEffect(() => {
        if (user.loggedIn) {
            navigate('/projects');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/users/login', {
            email: formState.email,
            password: formState.password
        }, {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                updateUser({
                    loggedIn: true,
                    name: response.data.name,
                    email: response.data.email,
                });
                navigate('/projects');
            }
        }).catch((error) => {
            console.log(error);
            if (error.status === 401) {
                setFormState({
                    ...formState,
                    errors: {
                        general: 'Invalid email or password'
                    }
                });
            } else if (error.status === 404) {
                setFormState({
                    ...formState,
                    errors: {
                        general: 'User not found'
                    }
                });
            }
            setFormState({
                ...formState,
                errors: {
                    general: 'An error occurred, please try again'
                }
            });
        });
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
                <Text align="center" fontSize="1.5em" fontWeight="bold">Login</Text>
                <Text>If you don't have an account head to <Link style={{ color: 'blue' }} to="/register">Register</Link></Text>
            </div>
            {Object?.keys?.(formState?.errors || {}).length > 0 && (
                <Alert>{formState.errors.general || JSON.stringify(formState.errors)}</Alert>
            )}
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
            {Object.keys?.(formState?.errors || {})?.length > 0 && Object.values(formState.errors).map((error) => (
                <FormErrorMessage key={error}>{error}</FormErrorMessage>
            ))}
            <Button mt={4} colorScheme="teal" isLoading={formState.isLoading} type="submit">
                Log In
            </Button>
        </form>
    );
};
