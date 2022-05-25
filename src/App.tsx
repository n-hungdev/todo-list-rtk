import {
  Heading,
  IconButton,
  VStack,
  useColorMode,
  Link,
  Flex,
} from '@chakra-ui/react'
import {
  FaSun,
  FaMoon,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa'
import TaskList from './components/Task/List'
import { RootState, store } from './app/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const { tasks } = useSelector((state: RootState) => state.tasksWatch)
  const { tab } = useSelector((state: RootState) => state.tabWatch)
  const { colorMode, toggleColorMode } = useColorMode()
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('tab', tab)
  }, [tasks, tab])

  return (
    <VStack p={4} minH="100vh" pb={28}>
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        isRound={true}
        size="md"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading
        p="4"
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-l, red.300, blue.500)"
        bgClip="text"
      >
        Todo List
      </Heading>
      <TaskList />
      <Flex position="absolute" bottom={4}>
        <Link href="https://github.com" target="_blank">
          <IconButton
            aria-label="Github"
            icon={<FaGithub />}
            isRound={true}
            size="md"
            m="1"
            color={colorMode === 'light' ? 'gray.700' : 'white'}
          />
        </Link>
        <Link href="https://www.linkedin.com/en/" target="_blank">
          <IconButton
            aria-label="Linkedin"
            icon={<FaLinkedin />}
            isRound={true}
            size="md"
            m="1"
            color={colorMode === 'light' ? 'blue.700' : 'white'}
          />
        </Link>
        <Link href="https://www.instagram.com" target="_blank">
          <IconButton
            aria-label="Instagram"
            icon={<FaInstagram />}
            isRound={true}
            size="md"
            m="1"
            color={colorMode === 'light' ? 'red.500' : 'white'}
          />
        </Link>
        <Link href="https://twitter.com" target="_blank">
          <IconButton
            aria-label="Twitter"
            icon={<FaTwitter />}
            isRound={true}
            size="md"
            m="1"
            color={colorMode === 'light' ? 'blue.300' : 'white'}
          />
        </Link>
        <Link
          href="https://www.facebook.com/profile.php?id=100070761577566"
          target="_blank"
        >
          <IconButton
            aria-label="Facebook"
            icon={<FaFacebook />}
            isRound={true}
            size="md"
            m="1"
            color={colorMode === 'light' ? 'blue.500' : 'white'}
          />
        </Link>
      </Flex>
    </VStack>
  )
}

export default App
