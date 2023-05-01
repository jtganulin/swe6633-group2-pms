import { Box, VStack, FormControl, FormLabel, Heading, Input, Textarea, Button, IconButton, Select } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProject(props) {
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
                    console.log(data)
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
                    toast.error("Error getting project details.");
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

    const handleRiskInputChange = (index, e) => {
        const newRisks = [...formState.risk];
        newRisks[index][e.target.name.split("-")[2]] = e.target.value;
        setFormState({
            ...formState,
            risk: newRisks,
        });
    };

    const handleInputChange = (e, index, type) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const newState = { ...formState };

        if (type === "risk") {
            newState.risk[index][fieldName] = fieldValue;
        } else if (type === "funcReq") {
            newState.funcReq[index][fieldName] = fieldValue;
        } else if (type === "nonFuncReq") {
            newState.nonFuncReq[index][fieldName] = fieldValue;
        } else {
            newState[fieldName] = fieldValue;
        }

        setFormState(newState);
    };

    const handleAddRisk = () => {
        const newState = { ...formState };
        newState.risk.push({ name: "", content: "", status: "" });
        setFormState(newState);
    };

    const handleDeleteRisk = (index) => {
        const newState = { ...formState };
        newState.risk.splice(index, 1);
        setFormState(newState);
    };

    const handleAddFuncReq = () => {
        const newState = { ...formState };
        newState.funcReq.push({ type: "functional", name: "", content: "" });
        setFormState(newState);
    };

    const handleDeleteFuncReq = (index) => {
        const newState = { ...formState };
        newState.funcReq.splice(index, 1);
        setFormState(newState);
    };

    const handleAddNonFuncReq = () => {
        const newState = { ...formState };
        newState.nonFuncReq.push({ type: "nonFunctional", name: "", content: "" });
        setFormState(newState);
    };

    const handleDeleteNonFuncReq = (index) => {
        const newState = { ...formState };
        newState.nonFuncReq.splice(index, 1);
        setFormState(newState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);
        await axios.put(`/api/project/${projectId}`, formState).then((res) => {
            console.log(res);
            if (res.status === 200) {
                toast.success("Project updated successfully");
                navigate(`/project/${projectId}`);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Error updating project, please check your inputs.");
            setFormState((prevState) => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    ...err.response.data?.errors
                },
            }));
        });
    };

    const handleDeleteProject = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this project?") === true) {
            console.log("Project deleted");
            await axios.delete(`/api/project/${projectId}`).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toast.success("Project deleted successfully");
                    navigate(`/projects`);
                }
            }).catch((err) => {
                console.log(err);
                setFormState((prevState) => ({
                    ...prevState,
                    errors: {
                        ...prevState.errors,
                        general: err.response?.data?.error || err.message,
                    },
                }));
            });
        }
    };

    return (
        <Box p={6}>
            <Heading as="h1" size="lg" pb={6}>
                Edit Project
            </Heading>
            <form onSubmit={handleSubmit}>
                {formState?.errors && (
                    <FormControl>
                        <FormLabel color="red.500" bg="white">{JSON.stringify(formState?.errors)}</FormLabel>
                    </FormControl>
                )}

                <VStack spacing={6} align="stretch">
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input type="text" name="title" value={formState?.title} onChange={handleInputChange} bg="white" placeholder="Project title" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea name="desc" value={formState?.desc} onChange={handleInputChange} bg="white" placeholder="Project description" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Risks</FormLabel>
                        {formState.risk?.map?.((risk, index) => (
                            <VStack key={index} spacing={4} pt={index > 0 && 4}>
                                <Input type="text" name={`risk-${index}-name`} value={risk?.name} placeholder="Risk name" onChange={(e) => handleRiskInputChange(index, e)} bg="white" />
                                <Textarea name={`risk-${index}-content`} value={risk?.content} placeholder="Risk content" onChange={(e) => handleRiskInputChange(index, e)} bg="white" />
                                <Select name={`risk-${index}-status`} value={risk?.status} placeholder="Risk status" onChange={(e) => handleRiskInputChange(index, e)} bg="white">
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </Select>
                                {index > 0 && (
                                    <IconButton aria-label="Delete risk" icon={<CloseIcon />} onClick={() => handleDeleteRisk(index)} size="sm" />
                                )}
                            </VStack>
                        ))}
                        <Button size="sm" mt={2} onClick={handleAddRisk}>
                            Add Risk
                        </Button>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Functional Requirements</FormLabel>
                        {formState.funcReq?.map?.((funcReq, index) => (
                            <VStack key={index} spacing={2} align="stretch">
                                <Input type="text" name="name" value={funcReq?.name} onChange={(e) => handleInputChange(e, index, "funcReq")} bg="white" placeholder="Functional requirement name" />
                                <Textarea name="content" value={funcReq?.content} onChange={(e) => handleInputChange(e, index, "funcReq")} bg="white" placeholder="Functional requirement content" />
                                <IconButton icon={<CloseIcon />} aria-label="Delete" size="xs" onClick={() => handleDeleteFuncReq(index)} />
                            </VStack>
                        ))}
                        <Button size="sm" mx="auto" mt={2} onClick={handleAddFuncReq}>
                            Add Functional Requirement
                        </Button>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Non-Functional Requirements</FormLabel>
                        {formState.nonFuncReq?.map?.((nonFuncReq, index) => (
                            <VStack key={index} spacing={2} align="stretch">
                                <Input type="text" name="name" value={nonFuncReq?.name} onChange={(e) => handleInputChange(e, index, "nonFuncReq")} bg="white" placeholder="Non-Functional requirement name" />
                                <Textarea name="content" value={nonFuncReq?.content} onChange={(e) => handleInputChange(e, index, "nonFuncReq")} bg="white" placeholder="Non-Functional requirement content" />
                                <IconButton icon={<CloseIcon />} aria-label="Delete" size="xs" onClick={() => handleDeleteNonFuncReq(index)} />
                            </VStack>
                        ))}
                        <Button size="sm" mt={2} onClick={handleAddNonFuncReq}>
                            Add Non-Functional Requirement
                        </Button>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" mt={4}>
                        Save Changes
                    </Button>
                    <Button onClick={(e) => handleDeleteProject(e)}>Delete Project</Button>
                </VStack>
            </form>
        </Box>
    );
}
