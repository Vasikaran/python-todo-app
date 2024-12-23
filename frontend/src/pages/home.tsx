import { Layout, Typography, Row, Col, Spin, Button } from "antd";
import { useState, useEffect } from "react";
import { Todo } from "@/types";
import { TodoCard } from "@/components/todo-card";
import { apiClient } from "@/utils/api";
import { CreateTodoModal } from "@/components/create-todo-modal";
import { UpdateTodoModal } from "@/components/update-todo-modal";
import { DeleteTodoAlert } from "@/components/delete-todo-alert";
import { EmptyTodos } from "@/components/empty-todos";

const { Title } = Typography;

export const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await apiClient.get("/todos");
        setTodos(res.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsEditModalVisible(true);
  };

  const handleDelete = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDeleteModalVisible(true);
  };

  return (
    <Layout style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>My Todos</Title>
        {todos.length > 0 && (
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            style={{ marginBottom: 20 }}
          >
            + Create New Todo
          </Button>
        )}
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {todos.map((todo) => (
              <Col span={8} key={todo.id}>
                <TodoCard
                  todo={todo}
                  onEdit={() => handleEdit(todo)}
                  onDelete={() => handleDelete(todo)}
                />
              </Col>
            ))}
          </Row>
          {todos.length === 0 && (
            <EmptyTodos onAdd={() => setIsModalVisible(true)} />
          )}

          <CreateTodoModal
            updateTodos={(newTodo) => setTodos([...todos, newTodo])}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />

          <UpdateTodoModal
            updateTodos={(newTodo) =>
              setTodos(
                todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
              )
            }
            isModalVisible={isEditModalVisible}
            setIsModalVisible={() => {
              const newTodos = todos.filter(
                (todo) => todo.id !== selectedTodo?.id
              );
              setTodos([...newTodos]);
              setSelectedTodo(null);
              setIsEditModalVisible(false);
            }}
            todo={selectedTodo}
          />

          <DeleteTodoAlert
            isVisible={isDeleteModalVisible}
            onCancel={() => {
              setSelectedTodo(null);
              setIsDeleteModalVisible(false);
            }}
            onConfirm={async () => {
              try {
                const remainingTodos = todos.filter(
                  (todo) => todo.id !== selectedTodo?.id
                );
                setTodos(remainingTodos);
                setSelectedTodo(null);
                setIsDeleteModalVisible(false);
              } catch (error) {
                console.error("Error deleting todo:", error);
              }
            }}
            todoTitle={selectedTodo?.title || ""}
            todo={selectedTodo}
          />
        </>
      )}
    </Layout>
  );
};
