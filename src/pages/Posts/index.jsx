import React, { useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Layout, Typography, List, Skeleton } from "antd";
import Card from "../../components/PostCard";
import style from "./Posts.scss";
import { useStore, action } from "../../store";
import classnames from "classnames/bind";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { Content, Sider } = Layout;

const cx = classnames.bind(style);
function Posts() {
  const [state, dispatch] = useStore();
  const navigate = useNavigate();
  // Modify your getPots function to load more posts

  const recipeAuthor = "Duc";
  return (
    <div className={cx("wrapper")}>
      <Layout>
        <Content>
          <div id="scrollableDiv" className="custom-scroll-container">
            {state.posts ? (
              <List
                dataSource={state.posts}
                renderItem={(post) => {
                  return (
                    <List.Item key={post.email}>
                      <Card
                        edit={false}
                        Click={() => {
                          navigate(`/posts/${post._id}`);
                        }}
                        author={post.user ? post.user.name : recipeAuthor}
                        title={post.title}
                        date={post.createdAt}
                        img={post.img}
                      />
                    </List.Item>
                  );
                }}
              />
            ) : (
              <Typography.Title level={1}>
                Chưa có bài đăng nào
              </Typography.Title>
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Posts;
