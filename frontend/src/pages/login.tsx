import { Card, Layout, Typography, Space } from "antd";
import GoogleLogin from "@/components/auth/google-login";

const { Title } = Typography;
const { Content } = Layout;

export const LoginPage = () => {
  return (
    <Layout style={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content>
        <Space
          align="center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Card
            style={{
              width: 400,
              padding: "30px 20px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
            bordered={false}
          >
            <Title level={3} style={{ marginBottom: 20 }}>
              Welcome to Todo App
            </Title>
            <GoogleLogin></GoogleLogin>
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};
