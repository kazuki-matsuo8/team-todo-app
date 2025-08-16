import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import {
  Container,
  Heading,
  Button,
  HStack,
  VStack,
  Input,
  Textarea,
} from "@chakra-ui/react";

const NewTaskPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await apiClient.post("/tasks", {
        task: { title, content },
      });
      navigate("/"); // 作成後に一覧へ
    } catch (error) {
      console.error("タスクの作成に失敗しました", error);
      alert("タスクの作成に失敗しました");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <HStack justify="space-between" mb={6}>
        <Heading as="h1" size="lg">
          新しいタスクを作成
        </Heading>
        <Button
          bg="gray.500"
          color="white"
          _hover={{ bg: "gray.600" }}
          onClick={() => navigate(-1)}
        >
          戻る
        </Button>
      </HStack>

      <VStack as="form" onSubmit={handleCreateTask} align="stretch" gap={4}>
        <Input
          placeholder="タスクのタイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="タスクの内容（任意）"
          value={content}
          rows={10}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          type="submit"
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
        >
          追加
        </Button>
      </VStack>
    </Container>
  );
};

export default NewTaskPage;
