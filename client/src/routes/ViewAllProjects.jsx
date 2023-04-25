import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { UserContext } from "../providers/UserProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ViewAllProjects(props) {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.loggedIn) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get("/api/projects");
                const { data } = response;
                updateUser({ projects: data });
            } catch (error) {
                console.log(JSON.stringify(error));
                toast.error("Error getting projects.");
            }
        };
        getProjects();
    }, []);


    return (
        <Flex direction="column" align="center" grow="1">
            <div>
                <Text fontSize="2xl" fontWeight="bold">Projects</Text>
                <Text>Welcome, {user.name}</Text>
            </div>
            <Box w="100%" p={4} bg="#cccccc" color="black" textAlign="center" my={4}>
                {user?.projects?.length > 0 ? (
                    <>
                        <Text>You have {user?.projects?.length} projects.</Text>
                        <ProjectsContainer projects={user?.projects} />
                    </>
                ) : (
                    <Text>You have no projects. <Link style={{ color: 'blue' }} to="/projects/new">Create one today.</Link></Text>
                )}
            </Box>
        </Flex>
    );
};

const ProjectsContainer = (props) => {
    const projects = props.projects || [];
    return (
        <Flex grow="1">
            <SimpleGrid minChildWidth="200px" spacing="1.25em">
            {(projects?.length > 0 && (
                projects?.map?.((project, index) => (
                    <VStack key={project?._id} height="300px" bg="white" border="1px solid black">
                        <Text fontSize="xl" fontWeight="bold">{project?.title}</Text>
                        <Link style={{ color: "blue" }} to={`/projects/${project?._id}`}>View Project Details</Link>
                        <Box height="100px" bg="white" border="1px solid black">
                            <Text fontSize="xl" fontWeight="bold">Project Members</Text>
                            <Link style={{ color: "blue" }} to={`/projects/${project?._id}/members`}>Manage Project Members</Link>
                        </Box>
                    </VStack>
                ))
            )) || (<Text>You have no projects. <Link style={{ color: 'blue' }} to="/projects/new">Create one today.</Link></Text>)}
            </SimpleGrid>
        </Flex>
    );
}
