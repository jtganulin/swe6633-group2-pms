import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { UserContext } from "../providers/UserProvider";

export default function Projects(props) {
    const { user } = useContext(UserContext);

    return (
        <Flex direction="column" align="center" grow="1">
            <div>
                <Text fontSize="2xl" fontWeight="bold">Projects</Text>
                <Text>Welcome, {user.name}</Text>
            </div>
            <Box w="100%" p={4} bg="#cccccc" color="black" textAlign="center" my={4}>
                {1 > 0 ? (
                    <>
                        <Text>You have {user.projects.length} projects.</Text>
                        <ProjectsContainer user={user} />
                    </>
                ) : (
                    <Text>You have no projects. <Link style={{ color: 'blue' }} to="/create">Create one today.</Link></Text>
                )}
            </Box>
        </Flex>
    );
};

const ProjectsContainer = ({ user }) => {
    let testProjects = [
        {
            _id: 1,
            name: "Project 1",
            description: "This is a test project",
        },
        {
            _id: 2,
            name: "Project 2",
            description: "This is a test project",
        },
    ];
    return (
        <Flex grow="1">
            <SimpleGrid minChildWidth="200px" spacing="1.25em">
                {testProjects.map((project, index) => (
                    <Box key={project._id} height="300px" bg="white" border="1px solid black">
                        <Text fontSize="xl" fontWeight="bold">{project.name}</Text>
                        <Link style={{ color: "blue" }} to={`/projects/${project._id}`}>View Project Details</Link>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    );
}
