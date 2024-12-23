import React from "react";
import { Modal, Button, Typography, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { apiClient } from "@/utils/api";
import { Todo } from "@/types";

const { Text } = Typography;

interface DeleteTodoModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  todoTitle: string;
  todo: Todo | null;
}

export const DeleteTodoAlert: React.FC<DeleteTodoModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  todoTitle,
  todo,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const handleDeleteTodo = async () => {
    if (!todo) return;
    try {
      await apiClient.delete(`/todos/${todo.id}`);
      api.success({
        message: "Todo Deleted",
        description: "Your todo has been deleted successfully.",
        key: "updateTodos",
        placement: "bottomRight",
      });

      onConfirm();
    } catch (error) {
      api.error({
        message: "Error Deleting Todo",
        description: "There was an error deleting your todo.",
        key: "updateTodos",
        placement: "bottomRight",
      });
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Modal
      title="Delete Todo"
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" danger onClick={handleDeleteTodo}>
          Delete
        </Button>,
      ]}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <ExclamationCircleOutlined
          style={{ fontSize: 24, color: "#ff4d4f", marginRight: 16 }}
        />
        <Text>
          Are you sure you want to delete the todo: <strong>{todoTitle}</strong>
          ?
        </Text>
      </div>
      {contextHolder}
    </Modal>
  );
};
