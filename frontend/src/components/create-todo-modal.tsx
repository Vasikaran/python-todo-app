import { Todo } from "@/types";
import { apiClient } from "@/utils/api";
import { Button, Form, Input, Modal, Select, Switch, notification } from "antd";

const { Option } = Select;

export const CreateTodoModal = ({
  updateTodos,
  isModalVisible,
  setIsModalVisible,
}: {
  updateTodos: (newTodo: Todo) => void;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleCreateTodo = async (
    values: Omit<Todo, "created_at" | "updated_at">
  ) => {
    try {
      const res = await apiClient.post("/todos", {
        title: values.title,
        description: values.description,
        completed: values.completed || false,
        priority: values.priority,
      });
      updateTodos(res.data);
      api.success({
        message: "Todo Created",
        description: "Your todo has been created successfully.",
        key: "updateTodos",
        placement: "bottomRight",
      });
      setIsModalVisible(false);
    } catch (error) {
      api.error({
        message: "Error Creating Todo",
        description: "There was an error creating your todo.",
        key: "updateTodos",
        placement: "bottomRight",
      });
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Modal
      title="Create New Todo"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form form={form} onFinish={handleCreateTodo}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select priority">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Completed" name="completed" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Todo
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};
