import React, { useState, useEffect } from "react";
import apiClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Heading,
  VStack,
  HStack,
  Box,
  Text,
  IconButton,
  Button,
} from "@chakra-ui/react";

interface Task {
  id: number;
  title: string;
  content: string;
}

interface TasksResponse {
  status: string;
  data: Task[];
}

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get<TasksResponse>("/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("タスクの取得に失敗しました", error);
      alert("タスクの取得に失敗しました");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      fetchTasks();
      alert("タスクを削除しました");
    } catch (error) {
      console.error("タスクの削除に失敗しました", error);
      alert("タスクの削除に失敗しました");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Box w="100%">
      <Box
        as="header"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Container maxW="container.md" py={3}>
          <HStack justify="space-between" align="center">
            <HStack gap={4}>
              <Heading as="h1" size="lg">
                マイToDoリスト
              </Heading>
              <Button
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                onClick={() => navigate("/tasks/new")}
              >
                新しいタスク
              </Button>
            </HStack>
            <Button
              bg="gray.500"
              color="white"
              _hover={{ bg: "gray.600" }}
              onClick={handleLogout}
            >
              ログアウト
            </Button>
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.md" py={8}>
        

        <VStack gap={3} mt={6} align="stretch">
          {tasks.map((task) => (
            <HStack
              key={task.id}
              justify="space-between"
              bg="white"
              p={3}
              borderRadius="md"
              shadow="sm"
            >
              <Box>
                <Text fontWeight="bold">{task.title}</Text>
                <Text fontSize="sm" color="gray.500">
                  {task.content}
                </Text>
              </Box>
              <IconButton
                aria-label="delete"
                colorScheme="red"
                variant="ghost"
                onClick={() => handleDelete(task.id)}
              ></IconButton>
            </HStack>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default TodoPage;
