import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import { IBtnDelete } from '../../interfaces/Task'
import { deleteTask, deleteAllTasks } from '../../slices/TaskSlice'
import { useDispatch } from 'react-redux'

function BtnDeleteAll() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  return (
    <>
      <Button
        border="2px"
        borderColor="red.500"
        colorScheme="gray"
        px="8"
        h="45"
        mt="6"
        onClick={onOpen}
      >
        Delete Task
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Confirm delete all tasks?</ModalHeader>
          <ModalFooter>
            <Button mr={3} onClick={onClose} border="2px" borderColor="blue">
              Cancel
            </Button>
            <Button
              border="2px"
              borderColor="red.500"
              onClick={() => dispatch(deleteAllTasks())}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function BtnDelete({ task }: IBtnDelete) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  return (
    <>
      <IconButton
        aria-label="Delete Task"
        icon={<FiTrash2 />}
        isRound={true}
        onClick={onOpen}
        color="red.500"
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Do you really want to delete the task?</ModalHeader>
          <ModalBody>
            <Text>{task.description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              border="2px"
              borderColor="blue.500"
            >
              Cancel
            </Button>
            <Button
              border="2px"
              borderColor="red.500"
              onClick={() => dispatch(deleteTask(task))}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { BtnDelete, BtnDeleteAll }
