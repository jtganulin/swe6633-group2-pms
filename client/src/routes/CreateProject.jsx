import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Box,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Select,
    IconButton,
    Flex,
    Text
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// TODO: Simplify some of the handleChange functions
export default function Projects(props) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        title: "",
        desc: "",
        risk: [
            {
                name: "",
                content: "",
                status: "",
            },
        ],
        funcReq: [
            {
                type: "functional",
                name: "",
                content: "",
            },
        ],
        nonFuncReq: [
            {
                type: "nonFunctional",
                name: "",
                content: "",
            },
        ],
        errors: {}
    });

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleRiskInputChange = (index, e) => {
        const newRisks = [...formState.risk];
        newRisks[index][e.target.name.split("-")[2]] = e.target.value;
        setFormState({
            ...formState,
            risk: newRisks,
        });
    };

    const handleFuncReqInputChange = (index, e) => {
        const newFuncReqs = [...formState.funcReq];
        newFuncReqs[index][e.target.name.split("-")[2]] = e.target.value;
        setFormState({
            ...formState,
            funcReq: newFuncReqs,
        });
    };

    const handleNonFuncReqInputChange = (index, e) => {
        const newNonFuncReqs = [...formState.nonFuncReq];
        newNonFuncReqs[index][e.target.name.split("-")[2]] = e.target.value;
        setFormState({
            ...formState,
            nonFuncReq: newNonFuncReqs,
        });
    };

    const handleAddRisk = () => {
        setFormState({
            ...formState,
            risk: [
                ...formState.risk,
                {
                    name: "",
                    content: "",
                    status: "",
                },
            ],
        });
    };

    const handleAddFuncReq = () => {
        setFormState({
            ...formState,
            funcReq: [
                ...formState.funcReq,
                {
                    type: "functional",
                    name: "",
                    content: "",
                },
            ],
        });
    };

    const handleAddNonFuncReq = () => {
        setFormState({
            ...formState,
            nonFuncReq: [
                ...formState.nonFuncReq,
                {
                    type: "nonFunctional",
                    name: "",
                    content: "",
                },
            ],
        });
    };

    const handleDeleteRisk = (index) => {
        const newRisks = [...formState.risk];
        newRisks.splice(index, 1);
        setFormState({
            ...formState,
            risk: newRisks,
        });
    };

    const handleDeleteFuncReq = (index) => {
        const newFuncReqs = [...formState.funcReq];
        newFuncReqs.splice(index, 1);
        setFormState({
            ...formState,
            funcReq: newFuncReqs,
        });
    };

    const handleDeleteNonFuncReq = (index) => {
        const newNonFuncReqs = [...formState.nonFuncReq];
        newNonFuncReqs.splice(index, 1);
        setFormState({
            ...formState,
            nonFuncReq: newNonFuncReqs,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Filter out risks and requirements that are completely empty
        const formData = {
            title: formState.title,
            desc: formState.desc,
            risk: formState.risk.filter((risk) => risk.name !== "" && risk.content !== "" && risk.status !== ""),
            funcReq: formState.funcReq.filter((req) => req.name !== "" && req.content !== ""),
            nonFuncReq: formState.nonFuncReq.filter((req) => req.name !== "" && req.content !== ""),
        };
        await axios.post("/api/project/", formData, {withCredentials: true}).then((res) => {
            if (res.status === 201) {
                toast.success("Project created successfully!");
                navigate("/projects");
            } else {
                setFormState({
                    ...formState,
                    errors: res.data,
                });
                toast.error(res.data);   
            }
        }).catch((err) => {
            console.log(err);
            setFormState({
                ...formState,
                errors: err.message || err,
            });
            toast.error(err.message);
        });
    };

    return (
        <Flex direction="column" align="center" grow="1">
            <div>
                <Text fontSize="2xl" fontWeight="bold">Create New Project</Text>
            </div>
            <Box w="lg" mx="auto" p={6} my={4} border="1px solid black" borderRadius={8}>
                {/* Output any form errors */}
                {Object.keys(formState?.errors || {})?.length > 0 && (
                    <Box>
                        {JSON.stringify(formState.errors)}
                    </Box>
                )}
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input type="text" name="title" value={formState.title} onChange={handleInputChange} placeholder="Project title" bg="white" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea name="desc" value={formState.desc} onChange={handleInputChange} placeholder="Project description" bg="white" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Risks</FormLabel>
                            {formState.risk.map((risk, index) => (
                                <VStack key={index} spacing={4} pt={index > 0 && 4}>
                                    <Input type="text" name={`risk-${index}-name`} value={risk.name} placeholder="Risk name" onChange={(e) => handleRiskInputChange(index, e)} bg="white" />
                                    <Textarea name={`risk-${index}-content`} value={risk.content} placeholder="Risk content" onChange={(e) => handleRiskInputChange(index, e)} bg="white" />
                                    <Select name={`risk-${index}-status`} value={risk.status} placeholder="Risk status" onChange={(e) => handleRiskInputChange(index, e)} bg="white">
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </Select>
                                    {index > 0 && (
                                        <IconButton aria-label="Delete risk" icon={<CloseIcon />} onClick={() => handleDeleteRisk(index)} size="sm" alignSelf="flex-end" />
                                    )}
                                </VStack>
                            ))}
                            <Button mt={4} onClick={handleAddRisk}>
                                Add Risk
                            </Button>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Functional Requirements</FormLabel>
                            {formState.funcReq.map((funcReq, index) => (
                                <VStack key={index} spacing={4} pt={index > 0 && 4}>
                                    <Input type="text" name={`funcReq-${index}-name`} value={funcReq.name} placeholder="Functional requirement name" onChange={(e) => handleFuncReqInputChange(index, e)} bg="white" />
                                    <Textarea name={`funcReq-${index}-content`} value={funcReq.content} placeholder="Functional requirement content" onChange={(e) => handleFuncReqInputChange(index, e)} bg="white" />
                                    {index > 0 && (
                                        <IconButton aria-label="Delete functional requirement" icon={<CloseIcon />} onClick={() => handleDeleteFuncReq(index)} size="sm" alignSelf="flex-end" />
                                    )}
                                </VStack>
                            ))}
                            <Button mt={4} onClick={handleAddFuncReq}>
                                Add Functional Requirement
                            </Button>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Non-Functional Requirements</FormLabel>
                            {formState.nonFuncReq.map((nonFuncReq, index) => (
                                <VStack key={index} spacing={4} pt={index > 0 && 4}>
                                    <Input type="text" name={`nonFuncReq-${index}-name`} value={nonFuncReq.name} placeholder="Non-functional requirement name" onChange={(e) => handleNonFuncReqInputChange(index, e)} bg="white" />
                                    <Textarea name={`nonFuncReq-${index}-content`} value={nonFuncReq.content} placeholder="Non-functional requirement content " onChange={(e) => handleNonFuncReqInputChange(index, e)} bg="white" />
                                    {index > 0 && (
                                        <IconButton aria-label="Delete non-functional requirement" icon={<CloseIcon />} onClick={() => handleDeleteNonFuncReq(index)} size="sm" alignSelf="flex-end" />
                                    )}
                                </VStack>
                            ))}
                            <Button mt={4} onClick={handleAddNonFuncReq}>
                                Add Non-Functional Requirement
                            </Button>
                        </FormControl>
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};
