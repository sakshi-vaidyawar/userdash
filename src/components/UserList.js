import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import DeleteMsg from './DeleteMSg'
import { useState } from 'react';

const UserList = ({ users, onEdit, onDelete, }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null)
  const handleOpenDeleteModal = (userId) => {
    setDeletingUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingUserId(null);
  };

  const handleConfirmDelete = () => {
    onDelete(deletingUserId);
    handleCloseDeleteModal();
  };
  return (
    <>
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>User ID</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.id}</Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>
              <IconButton
                icon={<EditIcon />}
                colorScheme="blue"
                onClick={() => onEdit(user.id)}
                mr={2}
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleOpenDeleteModal(user.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
     <DeleteMsg
     isOpen={isDeleteModalOpen}
     onClose={handleCloseDeleteModal}
     onConfirm={handleConfirmDelete}
   />
   </>
  );
};

export default UserList;
