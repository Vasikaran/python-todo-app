import { Layout, Menu, Typography, Avatar, theme } from "antd";
import {
  UnorderedListOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

const { Sider } = Layout;
const { Text } = Typography;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  const { token } = theme.useToken(); // Access Ant Design theme tokens
  const darkBgColor = token.colorBgContainer;
  const darkTextColor = token.colorText;
  const darkBorderColor = token.colorBorder;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  useEffect(() => {
    setAvatar(auth.currentUser?.photoURL || null);
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value: boolean) => setCollapsed(value)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: darkBgColor,
        position: "relative",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          background: darkBgColor,
          color: darkTextColor,
          borderRight: "none",
          height: "85%",
        }}
      >
        <Menu.Item
          key="1"
          icon={<UnorderedListOutlined style={{ color: darkTextColor }} />}
          onClick={() => navigate("/todos")}
        >
          My Todos
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<SettingOutlined style={{ color: darkTextColor }} />}
          onClick={() => navigate("/settings")}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<UserOutlined style={{ color: darkTextColor }} />}
          onClick={() => navigate("/profile")}
        >
          User Profile
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<LogoutOutlined style={{ color: darkTextColor }} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu>

      <div
        style={{
          marginTop: "auto",
          textAlign: "center",
          padding: "16px 0",
          borderTop: `1px solid ${darkBorderColor}`,
          background: darkBgColor,
        }}
      >
        <Avatar
          size={collapsed ? "default" : 64}
          src={avatar}
          style={{ marginBottom: 8 }}
        />
        {!collapsed && (
          <Text
            style={{
              display: "block",
              marginTop: 8,
              color: darkTextColor,
            }}
          >
            {auth.currentUser?.displayName || auth.currentUser?.email}
          </Text>
        )}
      </div>
    </Sider>
  );
};
