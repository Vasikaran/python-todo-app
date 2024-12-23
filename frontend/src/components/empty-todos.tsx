import { Card, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

export const EmptyTodos = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        border: "1px dashed #ddd",
        borderRadius: "8px",
      }}
    >
      <div>
        <Title level={4}>No Todos Yet</Title>
        <Paragraph>
          Looks like you haven't created any todos yet. Start by adding one!
        </Paragraph>
        <Button type="primary" onClick={onAdd}>
          Add Todo
        </Button>
      </div>
    </Card>
  );
};
