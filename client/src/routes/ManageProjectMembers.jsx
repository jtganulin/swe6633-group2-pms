import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Box,
    Input,
    Button,
    Stack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Table,
    Thead,
    Heading,
    Tbody,
    Tr,
    Th,
    Td,
    Select
} from "@chakra-ui/react";

// members scheme:
// {
//     id: 1,
//     name: "John Doe",
//     email: "john@example",
//     role: "Developer",
// }

export default function ManageProjectMembers() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [teamMembers, setTeamMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchTeamMembers() {
            try {
                const res = await axios.get(`/api/project/${projectId}`);
                setTeamMembers(res.data.members);
            } catch (err) {
                console.log(err);
                setError("Unable to fetch team members");
            }
        }
        fetchTeamMembers();
    }, []);

    const handleDelete = (email) => {
        setTeamMembers((prevTeamMembers) =>
            prevTeamMembers.filter((member) => member.email !== email)
        );
    };

    const handleAdd = () => {
        if (!newMember.name || !newMember.email || !newMember.role) {
            setError("All fields are required");
            return;
        }
        setTeamMembers((prevTeamMembers) => [
            ...prevTeamMembers,
            { ...newMember },
        ]);
        setNewMember({ name: "", email: "", role: "" });
        setError("");
    };

    const handleChange = (e) => {
        setNewMember((prevMember) => ({
            ...prevMember,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/project/${projectId}`, { members: teamMembers });
            toast.success("Team members updated successfully");
            navigate(`/project/${projectId}`);
        } catch (err) {
            console.log(err);
            toast.error("Unable to update team members");
        }
    };

    return (
        <Box>
            <Heading as="h1" size="md">
                Manage Project Team Members
            </Heading>
            {teamMembers.length > 0 ? (
                <Table variant="striped" colorScheme="gray" bg="white" mt="6">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {teamMembers.map((member) => (
                            <Tr key={member.email}>
                                <Td>{member.name}</Td>
                                <Td>{member.email}</Td>
                                <Td>{member.role}</Td>
                                <Td>
                                    <Button onClick={() => handleDelete(member.email)} bg="gray.200">Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
            <Heading as="h6" size="sm" my="6" mx="auto">
                No team members added yet
            </Heading>
            )}
            <Stack spacing="4" mt="20">
                <Heading as="h4" size="md">
                    Add Team Member
                </Heading>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={newMember.name}
                        onChange={handleChange}
                        bg="white"
                        placeholder="Team member name"
                    />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={newMember.email}
                        onChange={handleChange}
                        bg="white"
                        placeholder="Team member email"
                    />
                </FormControl>
                <FormControl id="role" isRequired>
                    <FormLabel>Role</FormLabel>
                    <Select name="role" id="role" value={newMember.role} onChange={handleChange} bg="white" placeholder="Select role" isRequired>
                        <option value="project-manager">Project Manager</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="tester">Tester</option>
                        <option value="analyst">Analyst</option>
                    </Select>
                </FormControl>
                <Button onClick={handleAdd}>Add Team Member</Button>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
                <Button onClick={handleSubmit} colorScheme="blue">
                    Update Team Members
                </Button>
            </Stack>
        </Box>
    );
}
