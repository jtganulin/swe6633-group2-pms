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
    <Flex direction="column" align="center" grow="1" w="100%">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text fontSize="2xl" fontWeight="bold" textAlign={'center'}>Projects</Text>
        <Text>Welcome, {user.name}</Text>
        <Text>You have {user?.projects?.length} projects.</Text>
      </div>
      <Box width={'95%'} p={4} bg="#cccccc" color="black" textAlign="center" my={4} borderRadius={'15px'}>
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
          <Flex flexDir="row" key={project?._id} bg="white" border="1px solid black" borderRadius={'10px'} width={'100%'} justifyContent="space-between" padding={10} height={'100%'} alignItems={'space-between'}>
            <Box width={'100%'} backgroundColor={'#cccccc30'} borderRadius={'5px'} display={'flex'} flexDir={'column'} alignItems={'space-between'} height={'100%'} justifyContent={'space-between'}>
              <Text fontSize="2xl" fontWeight="bold">{project?.title}</Text>
              <Link style={{ color: "blue" }} to={`/projects/${project?._id}`}>View Project Details</Link>
              <Text fontSize="xl" fontWeight="bold">Project Members</Text>
              <Link style={{ color: "blue" }} to={`/projects/${project?._id}/members`}>Manage Project Members</Link>
            </Box>
            <Box width={'600px'}>
              <Box backgroundColor={'#cccccc30'} borderRadius={'5px'} marginBottom={5} padding={5} display={'flex'} justifyContent={'center'}>
                {/* Need to make sure at least one of values in totalEffort is filled */}
                {Object.values(project?.totalEffort)?.some?.((val) => val > 0) ? (
                  <Chart project={project} />
                ) : (<h2>No Efforts Yet!</h2>)}
              </Box>
              <Button onClick={onOpen} color={'blue'}>Add Efforts</Button>
            </Box>

            <EffortModal projectId={project?._id} isOpen={isOpen} onClose={onClose} funcReq={project.funcReq} nonFuncReq={project.nonFuncReq} />
          </Flex>
        ))
      )) || (<Text>You have no projects. <Link style={{ color: 'blue' }} to="/projects/new">Create one today.</Link></Text>)}
    </SimpleGrid>
  );
}

const EffortModal = (props) => {

  const { projectId, isOpen, onClose, funcReq, nonFuncReq } = props;

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
          <EffortForm projectId={projectId} funcReq={funcReq} nonFuncReq={nonFuncReq} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={'blue'} mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const EffortForm = (props) => {
  const [formState, setFormState] = useState({
    // forProject: props?.projectId,
    reqId: '',
    effortType: '',
    timeCost: 0,
  });

  const { projectId, funcReq, nonFuncReq } = props;

  const submit = async (e) => {
    e?.preventDefault?.();
    try {
      await axios.put(`/api/project/${projectId}/effort`, formState);
      toast.success('Effort Added!');
    } catch (error) {
      console.log(JSON.stringify(error));
      toast.error('Error adding effort.');
    }
  };

  return (
    <FormControl>
      <FormLabel>For Requirement</FormLabel>
      <Select placeholder="Select Requirement" name="forReq" onChange={(e) => setFormState({ ...formState, reqId: e.target.value })}>
        {funcReq?.map?.((req) => (
          <option value={req?._id}>FR: {req?.name}</option>
        ))}
        {nonFuncReq?.map?.((req) => (
          <option value={req?._id}>NFR: {req?.name}</option>
        ))}
      </Select>
      <FormLabel>Type of Effort</FormLabel>
      <Select placeholder="Select Type of Effort" name="type" value={formState.effortType} onChange={(e) => setFormState({ ...formState, effortType: e.target.value })} required>
        <option value="reqAnalysis">Requirements Analysis</option>
        <option value="design">Design</option>
        <option value="coding">Coding</option>
        <option value="testing">Testing</option>
        <option value="projectManagement">Project Management</option>
      </Select>
      <FormLabel>{'Time Required (hours): '}</FormLabel>
      <NumberInput key="timeCostInput" min={0} required>
        <NumberInputField name="timeCost" value={formState.timeCost} onChange={(e) => setFormState({ ...formState, timeCost: e.target.value })} required />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button colorScheme={'blue'} mr={3} onClick={submit}>Save</Button>
    </FormControl>
  )
}
