import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

const { Header, Content } = Layout;
const { Title } = Typography;

export const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Layout style={{ display: "flex", flexDirection: "column" }}>
          <Header
            style={{
              padding: "16px 16px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Taskly
            </Title>
          </Header>
          <Content
            style={{
              margin: "16px",
              padding: "16px",
              borderRadius: 8,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
