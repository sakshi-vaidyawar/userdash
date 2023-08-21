import React, { useState } from 'react';
import { Container, Box, Heading, Divider,Input } from '@chakra-ui/react';
import UserList from './UserList';
import UserForm from './UserForm';

const initialUsers = [
  
];

const Dashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const filteredUsers = users.filter((user) => {
    const searchTextLowerCase = searchText.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTextLowerCase) ||
      user.email.toLowerCase().includes(searchTextLowerCase) ||
      user.role.toLowerCase().includes(searchTextLowerCase)
    );
  });
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleFormSubmit = (user) => {
    if (editingUserId !== null) {
      
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editingUserId ? { ...user, id: u.id } : u))
      );
    } else {
     
      setUsers((prevUsers) => [...prevUsers, { ...user, id: prevUsers.length + 1 }]);
    }
    setEditingUserId(null);
  };

  const editingUser = editingUserId
    ? users.find((user) => user.id === editingUserId)
    : null;

  return (
    <Container py={[4,8]} maxWidth="xl">
      <Box mb={8}>
        <Heading mb={4} color="teal.500">User Management Dashboard</Heading>
        <Divider />
      </Box>
      <Box mb={8}>
        <Heading size="md" mb={4} color="teal.500">
          {editingUser ? 'Edit User' : 'Create User'}
        </Heading>
        <UserForm onSubmit={handleFormSubmit} user={editingUser} />
      </Box>
      <Box mb={4}>
        <Input
          placeholder="Search by name, email, or role"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>
      <Box mb={8}>
        <Heading size="md" mb={4} color="teal.500">
          User List
        </Heading>
        <UserList
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </Box>
      
      
    </Container>
  );
};

export default Dashboard;
