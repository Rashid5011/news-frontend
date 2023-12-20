import React from "react";
import {
  FolderAddFilled,
  SettingFilled,
  UserOutlined,
  ReconciliationFilled,
} from "@ant-design/icons";
import { Badge, Menu, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { OnEdit } from "../../Context";
import { BiUserPin } from "react-icons/bi";
import { FaRegWindowRestore } from "react-icons/fa";
import { LiaAdSolid } from "react-icons/lia";
import { AiOutlineComment } from "react-icons/ai";
import { CgPoll } from "react-icons/cg";
import {
  MdOutlineArticle,
  MdUploadFile,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { RiLogoutCircleLine, RiAdminFill, RiLiveLine } from "react-icons/ri";
import { API_URL } from "../../../API";

const SideBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [acsses, setAcsses] = useState([]);
  const [role, setRole] = useState("");
  const { setOnEdit } = useContext(OnEdit);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(`${API_URL}/user?id=${localStorage.getItem("id")}`)
      .then((user) => {
        console.log(user.data, "d");
        setRole(user.data[0].role);
        if (user.data[0].role == "admin") {
          setIsAdmin(true);
          setAcsses(user.data[0]?.acsses);
        }
      });
  }, [location]);
  console.log(acsses?.some((e) => e == 1));
  return (
    <>
      <Menu
        defaultSelectedKeys={["one"]}
        mode="inline"
        theme="dark"
        style={{ overflowY: "auto" }}
      >
        <Menu.Item key="one" icon={<MdOutlineArticle size={25} />}>
          <Link
            style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
            to="/dashboard"
          >
            Articles
          </Link>
        </Menu.Item>
        {isAdmin ? (
          <Menu.Item key="two" icon={<BiUserPin size={25} />}>
            <Link
              style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
              to="users"
            >
              Users
            </Link>
          </Menu.Item>
        ) : (
          <></>
        )}
        {acsses && acsses?.length > 0 ? (
          acsses?.some((e) => e == 1) && (
            <Menu.Item key="six" icon={<FaRegWindowRestore size={20} />}>
              <Link
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
                to="topstories"
              >
                Top Stories
              </Link>
            </Menu.Item>
          )
        ) : (
          <Menu.Item key="six" icon={<FaRegWindowRestore size={20} />}>
            <Link
              style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
              to="topstories"
            >
              Top Stories
            </Link>
          </Menu.Item>
        )}
        {acsses && acsses?.length > 0 ? (
          acsses?.some((e) => e == 2) && (
            <Menu.Item key="seven" icon={<FaRegNewspaper size={20} />}>
              <Link
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
                to="breakingnews"
              >
                Breaking News
              </Link>
            </Menu.Item>
          )
        ) : (
          <Menu.Item key="seven" icon={<FaRegNewspaper size={20} />}>
            <Link
              style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
              to="breakingnews"
            >
              Breaking News
            </Link>
          </Menu.Item>
        )}
        {acsses && acsses?.length > 0 ? (
          acsses?.some((e) => e == 3) && (
            <Menu.Item
              onClick={() => {
                setOnEdit(false);
              }}
              key="three"
              icon={<MdUploadFile size={25} />}
            >
              <Link
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
                to="upload"
              >
                Upload
              </Link>
            </Menu.Item>
          )
        ) : (
          <Menu.Item
            onClick={() => {
              setOnEdit(false);
            }}
            key="three"
            icon={<MdUploadFile size={25} />}
          >
            <Link
              style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
              to="upload"
            >
              Upload
            </Link>
          </Menu.Item>
        )}
        {isAdmin ? (
          <>
            {acsses && acsses?.length > 0 ? (
              acsses?.some((e) => e == 4) && (
                <Menu.Item
                  key="five"
                  icon={<MdOutlineCreateNewFolder size={25} />}
                >
                  <Link
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "Poppins",
                    }}
                    to="creatuser"
                  >
                    Create User
                  </Link>
                </Menu.Item>
              )
            ) : (
              <Menu.Item
                key="five"
                icon={<MdOutlineCreateNewFolder size={25} />}
              >
                <Link
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                  to="creatuser"
                >
                  Create User
                </Link>
              </Menu.Item>
            )}
            <Menu.Item key="oo" icon={<MdOutlineCreateNewFolder size={25} />}>
              <Link
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
                to="content"
              >
                Tags&Category
              </Link>
            </Menu.Item>
            {acsses && acsses?.length > 0 ? (
              acsses?.some((e) => e == 5) && (
                <Menu.Item key="cc" icon={<LiaAdSolid size={25} />}>
                  <Link
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "Poppins",
                    }}
                    to="ads"
                  >
                    Advertisement
                  </Link>
                </Menu.Item>
              )
            ) : (
              <Menu.Item key="cc" icon={<LiaAdSolid size={25} />}>
                <Link
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                  to="ads"
                >
                  Advertisement
                </Link>
              </Menu.Item>
            )}
            <Menu.Item key="ddc" icon={<AiOutlineComment size={25} />}>
              <Link
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
                to="comment"
              >
                Comments{" "}
                <Space size={[8, 16]}>
                  <Badge count={4} />
                </Space>
              </Link>
            </Menu.Item>
            {acsses && acsses?.length > 0 ? (
              acsses?.some((e) => e == 6) && (
                <Menu.Item key="live" icon={<RiLiveLine size={25} />}>
                  <Link
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "Poppins",
                    }}
                    to="live"
                  >
                    Live
                  </Link>
                </Menu.Item>
              )
            ) : (
              <Menu.Item key="live" icon={<RiLiveLine size={25} />}>
                <Link
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                  to="live"
                >
                  Live
                </Link>
              </Menu.Item>
            )}
            {acsses && acsses?.length > 0 ? (
              acsses?.some((e) => e == 7) && (
                <Menu.Item key="poll" icon={<CgPoll size={25} />}>
                  <Link
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "Poppins",
                    }}
                    to="poll"
                  >
                    Poll
                  </Link>
                </Menu.Item>
              )
            ) : (
              <Menu.Item key="poll" icon={<CgPoll size={25} />}>
                <Link
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                  to="poll"
                >
                  Poll
                </Link>
              </Menu.Item>
            )}
          </>
        ) : (
          <></>
        )}
        {/* <Menu.Item key="elevn" icon={<FaRegNewspaper size={20} />}>
          <Link
            style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
            to="report"
          >
            Report & Other
          </Link>
        </Menu.Item> */}
        <Menu.Item
          style={{
            position: "absolute",
            bottom: 40,
          }}
          onClick={() => {
            localStorage.clear();
          }}
          key="four"
          icon={<RiLogoutCircleLine size={25} />}
        >
          <Link
            style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
            to="/"
          >
            LogOut
          </Link>
        </Menu.Item>
        <Menu.Item
          style={{
            position: "absolute",
            bottom: 0,
          }}
          key="ten"
          icon={<RiAdminFill size={22} />}
        >
          <div
            style={{
              textTransform: "uppercase",
              fontSize: 14,
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          >
            {role}
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SideBar;
