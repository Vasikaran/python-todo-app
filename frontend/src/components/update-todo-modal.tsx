import { Todo } from "@/types";
import { apiClient } from "@/utils/api";
import { Button, Form, Input, Modal, Select, Switch, notification } from "antd";

const { Option } = Select;

export const UpdateTodoModal = ({
  updateTodos,
  isModalVisible,
  setIsModalVisible,
  todo,
}: {
  updateTodos: (newTodo: Todo) => void;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  todo: Todo | null;
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleUpdateTodo = async (values: Omit<Todo, "updated_at">) => {
    try {
      if (!todo) return;
      const res = await apiClient.post(`/todos/${todo.id}`, {
        title: values.title,
        description: values.description,
        completed: values.completed || false,
        priority: values.priority,
      });
      api.success({
        message: "Todo Updated",
        description: "Your todo has been updated successfully.",
        key: "updateTodos",
        placement: "bottomRight",
      });
      updateTodos(res.data);
      setIsModalVisible(false);
    } catch (error) {
      api.error({
        message: "Error Updating Todo",
        description: "There was an error updating your todo.",
        key: "updateTodos",
        placement: "bottomRight",
      });
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Modal
      title="Update Todo"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form form={form} onFinish={handleUpdateTodo}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input defaultValue={todo?.title} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} defaultValue={todo?.description} />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select priority" defaultValue={todo?.priority}>
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Completed" name="completed" valuePropName="checked">
          <Switch defaultChecked={todo?.completed} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Todo
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Modal>
  );
};
