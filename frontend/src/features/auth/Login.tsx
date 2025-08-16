import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";
import { Box, Button, VStack, Heading, Text, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  interface LoginResponse {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post<LoginResponse>("/login", {
        user: { email, password },
      });
      if (response.data.token) {
        localStorage.setItem("jwt_token", response.data.token);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("ログインに失敗しました");
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        ログイン
      </Heading>

      <VStack as="form" onSubmit={handleSubmit} gap={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            border="1px"
            borderStyle="solid"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>パスワード</FormLabel>
          <Input
            type="password"
            value={password}
            border="1px"
            borderStyle="solid"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          width="full"
        >
          ログイン
        </Button>

        <Text>
          アカウントをお持ちでないですか？{" "}
          <Link
            to="/signup"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            新規登録
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
