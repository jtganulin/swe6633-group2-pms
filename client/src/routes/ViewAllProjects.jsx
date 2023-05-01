import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text, SimpleGrid, VStack, HStack, Button, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, Select } from "@chakra-ui/react";
import { UserContext } from "../providers/UserProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import Chart from "../components/Chart";

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
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Text fontSize="2xl" fontWeight="bold" textAlign={'center'}>Projects</Text>
                <Text>Welcome, {user.name}</Text>
                <Text>You have {user?.projects?.length} projects.</Text>
            </div>
            <Box width={'85%'} p={4} bg="#cccccc" color="black" textAlign="center" my={4} borderRadius={'15px'}>
                {user?.projects?.length > 0 ? (
                    <>
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

    const { isOpen, onOpen, onClose } = useDisclosure();

    const projects = props.projects || [];
    
    return (
      <SimpleGrid columns={2} gap={10} width={'100%'}>
      {(projects?.length > 0 && (
          projects?.map?.((project) => (
              <HStack key={project?._id} bg="white" border="1px solid black" borderRadius={'10px'} width={'100%'} justifyContent="space-between" padding={10}>
                  <Box width={'100%'} backgroundColor={'#cccccc30'} borderRadius={'5px'} display={'flex'} flexDir={'column'} alignItems={'space-between'} height={'100%'} justifyContent={'space-between'}> 
                      <Text fontSize="2xl" fontWeight="bold">{project?.title}</Text>
                      <Link style={{ color: "blue" }} to={`/projects/${project?._id}`}>View Project Details</Link>
                      <Text fontSize="xl" fontWeight="bold">Project Members</Text>
                      <Link style={{ color: "blue" }} to={`/projects/${project?._id}/members`}>Manage Project Members</Link>
                  </Box>
                  <Box width={'700px'}>
                    <Box backgroundColor={'#cccccc30'} borderRadius={'5px'} marginBottom={5} padding={5} display={'flex'} justifyContent={'center'}>
                      {project?.funcReq?.effort?.length > 0 ? (                      <Chart project={project} />
                        ) : (<h2>No Efforts Yet!</h2>)}
                    </Box>
                    <Button onClick={onOpen} color={'blue'}>Add Efforts</Button>
                  </Box>
                  
                <EffortModal isOpen={isOpen} onClose={onClose} funcReq={project.funcReq} nonFuncReq={project.nonFuncReq} />
              </HStack>
          ))
      )) || (<Text>You have no projects. <Link style={{ color: 'blue' }} to="/projects/new">Create one today.</Link></Text>)}
      </SimpleGrid>
    );
}

const EffortModal = (props) => {

  const { isOpen, onClose, funcReq, nonFuncReq } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Effort</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EffortForm funcReq={funcReq} nonFuncReq={nonFuncReq} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme={'blue'} mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const EffortForm = (props) => {

  const { funcReq, nonFuncReq } = props;

  return (
    <FormControl>
      <FormLabel>For Requirement</FormLabel>
      <Select>
        {funcReq.map((req) => (
          <option key={req._id}>{req.name}</option>
        ))}
      </Select>
      <FormLabel>Type of Effort</FormLabel>
      <Select>
        <option>reqAnalysis</option>
        <option>design</option>
        <option>coding</option>
        <option>testing</option>
        <option>projectManagement</option>
      </Select>
      <FormLabel>{'Time Required (hours): '}</FormLabel>
      <NumberInput max={50} min={0}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}
