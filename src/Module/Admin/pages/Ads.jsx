import {
  Button,
  Card,
  Col,
  DatePicker,
  Image,
  Input,
  Layout,
  Row,
  Select,
  Table,
  message,
} from "antd";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { API_URL } from "../../../../API";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 100,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
  width: "100%",
};
const { RangePicker } = DatePicker;
const Ads = () => {
  const [img, setImg] = useState(null);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [Update, setUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState("");
  const [date, setDate] = useState("");
  const [side, setSide] = useState("");
  const [noOfImpression, setNoOfImpression] = useState("");
  const [Impression, setImpression] = useState(0);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setImpression((prevImpression) => prevImpression + 1);
  }, []);
  useEffect(() => {
    console.log("h");
    axios
      .get(`${API_URL}/ads`)
      .then((users) => {
        setUserData(users.data.reverse());
        setNoOfImpression(users.data[0].noOfImpression);
        console.log(users.data[0].noOfImpression);
      })
      .catch((err) => {
        console.log("err=>>>", err);
      });
  }, []);
  const onUpload = () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append("file", img, img.name);
    console.log(formdata);

    axios.post(`${API_URL}/image`, formdata).then(async (image) => {
      console.log(image);
      await axios
        .post(`${API_URL}/ads?id=${localStorage.getItem("id")}`, {
          imgLink: image.data.image,
          link: link,
          slugName: title,
          Price: price,
          noOfImpression: Impression,
          StartAt: JSON.parse(date)[0].split("T")[0],
          EndAt: JSON.parse(date)[1].split("T")[0],
          side,
        })
        .then((data) => {
          message.success("Your Ad was successfully Uploaded");
          setImg(null);
          setLink("");
          setLoading(false);
          setDate("");
          setTitle("");
          setPrice("");
        })
        .catch(() => {
          message.error("Your Ad was not successfully Uploaded");
          setLoading(false);
        });
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_, { _id }) => <a>{_id}</a>,
    },
    {
      title: "noOfImpression",
      dataIndex: "noOfImpression",
      key: "noOfImpression",
      render: (_, { noOfImpression }) => <a>{noOfImpression}</a>,
    },
    {
      title: "imgLink",
      dataIndex: "imgLink",
      key: "link",
      render: (_, { imgLink, _id }) => {
        return (
          <Image
            width={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            src={imgLink ? imgLink : ""}
            preview={{
              visible: _id == visible,
              src: imgLink,
              onVisibleChange: (value) => {
                setVisible(visible ? "" : _id);
              },
            }}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "slugName",
      key: "slugName",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (_, { link }) => (
        <a href={link} target="_blank">
          {link}
        </a>
      ),
    },
    {
      title: "No. Of Clicks",
      dataIndex: "noAds",
      key: "noAds",
    },
    // {
    //   title: "Price",
    //   dataIndex: "Price",
    //   key: "Price",
    // },
    {
      title: "Start Date",
      dataIndex: "StartAt",
      key: "StartAt",
      render: (_, { StartAt }) => {
        let dd = Number(StartAt);
        let date = new Date(dd);
        date.toString();
        date.toLocaleDateString("en-US");
        return <p>{String(date)}</p>;
      },
    },
    {
      title: "End Date",
      dataIndex: "EndAt",
      key: "EndAt",
      render: (_, { EndAt }) => {
        let dd = Number(EndAt);
        let date = new Date(dd);
        date.toString();
        date.toLocaleDateString("en-US");
        return <p>{String(date)}</p>;
      },
    },
  ];
  return (
    <>
      <h1
        style={{
          color: "rgba(0,0,0,0.8)",
          marginBottom: 10,
          textAlign: "left",
          fontFamily: "Poppins",
        }}
      >
        Advertisement
      </h1>
      <Card style={{ width: "100%", height: "100%" }}>
        <Row>
          <Col span={12}>
            <Input
              type="file"
              name="file"
              id="file-name"
              onChange={(e) => {
                setImg(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
              style={{ display: "none" }}
              hidden={true}
            />
            <div
              onClick={() => {
                document.getElementById("file-name").click();
                setUpdate(true);
              }}
              style={{
                width: "300px",
                height: "200px",
                backgroundColor: "rgba(0,0,0,0.1",
                borderRadius: "10px",
                marginBottom: 10,
              }}
            >
              {img == null ? (
                <div
                  style={{
                    height: "100%",
                    fontSize: "25px",
                    fontWeight: "600",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  Upload Ad Image
                </div>
              ) : (
                <img
                  style={{
                    width: "300px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                  src={URL.createObjectURL(img)}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={6}>
            <Input
              placeholder="Enter Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
          <Col span={6}></Col>
          <Col span={6} style={{ marginTop: 10 }}>
            <RangePicker
              onChange={(e) => {
                setDate(JSON.stringify(e));
                let d = JSON.stringify(e);
                console.log();
              }}
            />
          </Col>
          <Col span={6} style={{ marginTop: 10 }}>
            <Select
              value={side ? side : null}
              placeholder="Side"
              defaultValue="top"
              style={{ width: "100%" }}
              onChange={(e) => setSide(e)}
              options={[
                {
                  label: "Top",
                  value: "top",
                },
                {
                  label: "Middle",
                  value: "mid",
                },
                {
                  label: "Bottom",
                  value: "bottom",
                },
              ]}
            />
          </Col>
          <Col style={{ marginTop: 10 }} span={6}>
            <Button
              style={{ width: "100%" }}
              loading={loading}
              type="primary"
              onClick={onUpload}
            >
              Upload{" "}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={userData} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Ads;
