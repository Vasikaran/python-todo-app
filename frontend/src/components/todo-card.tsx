import { Card, Badge, Button, Typography } from "antd";
import { Todo } from "@/types"; // Assuming your Todo type is properly imported
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface TodoCardProps {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onEdit,
  onDelete,
}) => {
  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      <Card
        hoverable
        style={{
          marginBottom: 16,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        actions={[
          <Button icon={<EditOutlined />} onClick={onEdit} />,
          <Button icon={<DeleteOutlined />} onClick={onDelete} />,
        ]}
      >
        <Text strong>{todo.title}</Text>
        <p>{todo.description}</p>

        <Badge
          count={todo.priority}
          style={{
            backgroundColor: getPriorityColor(todo.priority),
            marginTop: 8,
          }}
        />

        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "gray",
          }}
        >
          <span>{new Date(todo.created_at).toLocaleDateString()}</span>
          <span>{todo.completed ? "Completed" : "In Progress"}</span>
        </div>
      </Card>
    </>
  );
};
