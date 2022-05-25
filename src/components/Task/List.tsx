import BtnUpdate from './BtnUpdate'
import { BtnDelete, BtnDeleteAll } from './BtnDelete'
import {
  HStack,
  Box,
  Stack,
  VStack,
  Flex,
  Text,
  StackDivider,
  Button,
  Checkbox,
  Image,
} from '@chakra-ui/react/'
import img from '../../images/empty.svg'
import { ITab } from '../../interfaces/Tab'
import { IState, ITask, ITasks } from '../../interfaces/Task'
import FormAdd from './FormAdd'
import { useSelector, useDispatch } from 'react-redux'
import { updateTab } from '../../slices/TabSlice'
import { toggleComplete } from '../../slices/TaskSlice'

function TaskList() {
  const dispatch = useDispatch()
  const tab = useSelector((state: ITab) => state.tabWatch.tab)
  const tasks = useSelector((state: IState) => state.tasksWatch.tasks)

  function filterTasks(): ITasks {
    return tasks
      .filter((task) => {
        switch (tab) {
          case 'completed':
            return task.complete
          case 'active':
            return !task.complete
          default:
            return task
        }
      })
      .sort((task) => (task.complete ? 1 : -1))
  }
  // console.log(filterTasks())
  const myTask = (task: ITask) => {
    const op: string = task.complete ? '0.4' : '1'
    const as: any = task.complete ? 'del' : ''

    return (
      <HStack key={task.id} opacity={op}>
        <Checkbox
          colorScheme="green"
          defaultChecked={task.complete}
          onChange={() => dispatch(toggleComplete(task))}
        />
        <Text w="100%" p="8px" as={as} borderRadius="lg">
          {task.description}
        </Text>
        <BtnDelete task={task} />
        <BtnUpdate task={task} />
      </HStack>
    )
  }

  if (!filterTasks().length) {
    return (
      <>
        <FormAdd />
        <Stack spacing={2} direction="row" align="center">
          <Button
            colorScheme="purple"
            size="xs"
            onClick={() => dispatch(updateTab('completed'))}
            isActive={tab === 'completed'}
            variant="outline"
          >
            Completed
          </Button>
          <Button
            colorScheme="green"
            size="xs"
            onClick={() => dispatch(updateTab('active'))}
            isActive={tab === 'active'}
            variant="outline"
          >
            Active
          </Button>
          <Button
            colorScheme="blue"
            size="xs"
            onClick={() => dispatch(updateTab('all'))}
            isActive={tab === 'all'}
            variant="outline"
          >
            All
          </Button>
        </Stack>
        <Box maxW="80%">
          <Image mt="20px" w="98%" maxW="350" src={img} />
        </Box>
      </>
    )
  }
  return (
    <>
      <FormAdd />
      <Stack spacing={4} direction="row" align="center">
        <Button
          colorScheme="purple"
          size="xs"
          onClick={() => dispatch(updateTab('completed'))}
          isActive={tab === 'completed'}
          variant="outline"
        >
          Completed
        </Button>
        <Button
          colorScheme="green"
          size="xs"
          onClick={() => dispatch(updateTab('active'))}
          isActive={tab === 'active'}
          variant="outline"
        >
          Actives
        </Button>
        <Button
          colorScheme="blue"
          size="xs"
          onClick={() => dispatch(updateTab('all'))}
          isActive={tab === 'all'}
          variant="outline"
        >
          All
        </Button>
      </Stack>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: '95vw', sm: '90vw', md: '70vw', lg: '50vw', xl: '35vw' }}
        alignItems="stretch"
      >
        {filterTasks().map(myTask)}
      </VStack>

      <Flex>
        <BtnDeleteAll />
      </Flex>
    </>
  )
}

export default TaskList
