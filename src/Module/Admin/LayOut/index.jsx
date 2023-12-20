import React from "react";
import { Layout, Space } from "antd";
import SideBar from "../../../Components/AdminComponets/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminTable from "../pages/Table";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CreateUser from "../pages/CreateUser";
import TopStories from "../pages/TopStories";
import BreakingNews from "../pages/BreakingNews";
import Report from "../Report";
import TagsAndCategory from "../pages/TagsAndCategory";
import Ads from "../pages/Ads";
import Comments from "../pages/Comments";
import Live from "../pages/Live";
import Poll from "../pages/Poll";
import { API_URL } from "../../../../API";
const { Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  height: "100%",
  minHeight: "100vh",
  color: "#fff",
  padding: "20px",
};
const siderStyle = {
  minHeight: "100vh",
  height: "100%",
  position: "fixed",
  zIndex: 1,
  overflowY: "auto",
};
const siderStyle2 = {
  minHeight: "100vh",
  height: "100%",
};
const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(`${API_URL}/user?id=${localStorage.getItem("id")}`)
      .then((user) => {
        console.log(user.data);
        if (user.data[0].role == "admin") {
          setIsAdmin(true);
        }
      });
  }, [location]);
  return (
    <Layout>
      <Sider style={siderStyle}>
        <SideBar />
      </Sider>
      <Sider style={siderStyle2}></Sider>
      <Content style={contentStyle}>
        <Routes>
          <Route index element={<Dashboard isAdmin={isAdmin} />} />
          <Route
            path="users"
            element={isAdmin ? <AdminTable /> : <>not Found</>}
          />
          <Route path="upload" element={<Upload />} />
          <Route path="topstories" element={<TopStories />} />
          <Route path="breakingnews" element={<BreakingNews />} />
          <Route path="report" element={<Report isAdmin={isAdmin} />} />
          <Route path="content" element={<TagsAndCategory />} />
          <Route path="live" element={<Live />} />
          <Route path="ads" element={<Ads />} />
          <Route path="comment" element={<Comments isAdmin={isAdmin} />} />
          <Route path="poll" element={<Poll isAdmin={isAdmin} />} />
          <Route
            path="creatuser"
            element={isAdmin ? <CreateUser /> : <>not Found</>}
          />
        </Routes>
      </Content>
    </Layout>
  );
};
export default AdminLayout;
