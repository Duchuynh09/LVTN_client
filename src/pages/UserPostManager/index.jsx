import React from "react";
import Posts from "../Posts";
import { useStore } from "../../store";
import { Layout, List, Typography } from "antd";
import Card from "../../components/PostCard";
import { json, useNavigate } from "react-router-dom";

function UserPostManager() {
  const [state, dispatch] = useStore();
  const navigate = useNavigate();
  const id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("id="))
    .split("=")[1];
  return (
    <div className={"wrapper"}>
      <Layout>
        <Layout.Content>
          <div id="scrollableDiv" className="custom-scroll-container">
            {state.posts ? (
              <List
                dataSource={state.posts}
                renderItem={(post) => {
                  return (
                    post.user._id === JSON.parse(id) && (
                      <List.Item key={post.email}>
                        <Card
                          id={post._id}
                          edit={true}
                          Click={() => {
                            navigate(`/posts/${post._id}`);
                          }}
                          author={post.user ? post.user.name : "Duc"}
                          title={post.title}
                          date={post.createdAt}
                          img={post.img}
                        />
                      </List.Item>
                    )
                  );
                }}
              />
            ) : (
              <Typography.Title level={1}>
                Chưa có bài đăng nào
              </Typography.Title>
            )}
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default UserPostManager;
