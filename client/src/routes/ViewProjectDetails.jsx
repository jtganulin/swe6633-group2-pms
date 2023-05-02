import { Box, VStack, FormControl, FormLabel, Heading, Input, Textarea, Button, Text, IconButton, CloseIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewProjectDetails(props) {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({});

    useEffect(() => {
        async function fetchProjectDetails() {
            // Fetch project details
            if (!projectId) {
                return navigate('/projects');
            } else {
                // Fetch project details
                try {
                    const res = await axios.get(`/api/project/${projectId}`);
                    const { data } = res;
                    setFormState((prevState) => ({
                        ...prevState,
                        _id: data?._id,
                        title: data?.title,
                        desc: data?.desc,
                        members: data?.members,
                        risk: data?.risk,
                        funcReq: data?.funcReq,
                        nonFuncReq: data?.nonFuncReq,
                    }));
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
            }
        }
        fetchProjectDetails();
    }, []);

    return (
        <Box p={6}>
            <Heading as="h1" size="lg" mb={6}>
                View Project Details
            </Heading>
            <VStack spacing={6} align="stretch">
                <FormControl isDisabled>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" value={formState.title} bg="white" />
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel>Description</FormLabel>
                    <Textarea value={formState.desc} bg="white" />
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel>Risks</FormLabel>
                    {formState?.risk?.length > 0 ? (
                        formState.risk?.map?.((risk, index) => (
                        <VStack key={index} spacing={2} align="stretch">
                            <Input type="text" value={risk.name} bg="white" />
                            <Textarea value={risk.content} bg="white" />
                            <Input type="text" value={risk.status} bg="white" />
                        </VStack>
                    ))) : (
                        <Text>No risks have been added to this project yet</Text>
                    )}
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel>Functional Requirements</FormLabel>
                    {formState?.funcReq?.length > 0 ? (
                        formState.funcReq?.map?.((funcReq, index) => (
                        <VStack key={index} spacing={2} align="stretch">
                            <Input type="text" value={funcReq.name} bg="white" />
                            <Textarea value={funcReq.content} bg="white" />
                        </VStack>
                    ))) : (
                        <Text>No functional requirements have been added to this project yet</Text>
                    )}
                </FormControl>

                <FormControl isDisabled>
                    <FormLabel>Non-Functional Requirements</FormLabel>
                    {formState?.nonFuncReq?.length > 0 ? (
                        formState?.nonFuncReq?.map?.((nonFuncReq, index) => (
                        <VStack key={index} spacing={2} align="stretch">
                            <Input type="text" value={nonFuncReq.name} bg="white" />
                            <Textarea value={nonFuncReq.content} bg="white" />
                        </VStack>
                    ))) : (
                        <Text>No non-functional requirements have been added to this project yet</Text>
                    )}
                </FormControl>
                <Button onClick={() => navigate(`/projects/${projectId}/edit`)}>Edit</Button>
                <Link style={{ color: "blue" }} to={`/projects/${formState._id}/members`}>View Project Members</Link>
                <Link style={{ color: "blue" }} to="/projects">Back to Projects</Link>
            </VStack>
        </Box>
    );
}

export default ViewProjectDetails;
