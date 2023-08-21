import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';


const UserForm = ({ onSubmit, user = null }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user ? user.role : '');
  const [errors, setErrors] = useState({});
  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name) {
      validationErrors.name = 'Name is required';
    }

    if (!email) {
        validationErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format';
    }
     

    if (!user && password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const newUser = { name, email, password, role };
    onSubmit(newUser);
    
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel color="teal.500">Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="teal.500">Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="teal.500">Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!user} // Required for creating new user, optional for editing
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="teal.500">Role</FormLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="Administrator">Administrator</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </Select>
      </FormControl>
      <Button type="submit" colorScheme="teal">
        {user ? 'Update User' : 'Create User'}
      </Button>
    </Box>
  );
};

export default UserForm;
