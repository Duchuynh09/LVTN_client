import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import postsApi from "../../api/postsApi";
import { useStore, action } from "../../store";
import MyEditor from "../../components/PostCreate/MyEditor";
import { Divider, Layout, List, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
function Post() {
  const [state, dispatch] = useStore();
  const { post, posts } = state;
  const param = useParams();
  const { id } = param;
  const [editorData, setEditorData] = useState(""); // Thêm state để lưu dữ liệu của CKEdito
  const [showSider, setShowSider] = useState(true);
  const [eventTop, setEventTop] = useState();
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) setShowSider(true);
    else setShowSider(false);
  });
  // Modify your getPots function to load more posts
  const sortPosts = useCallback(async () => {
    try {
      const sortedPosts = posts.sort((acc, next) => {
        const accLength = acc.event.dsDaDangKy.length;
        const nextLength = next.event.dsDaDangKy.length;
        return nextLength - accLength;
      });
      const firstTenPosts = sortedPosts.slice(0, 5);
      setEventTop(firstTenPosts);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getOne = useCallback(
    async (id) => {
      const post = await postsApi.getById(id);
      dispatch(action.fetchPost(post));
    },
    [dispatch]
  );
  useEffect(() => {
    sortPosts();
    getOne(id);
  }, [sortPosts, getOne, id]);

  return (
    <div className={"wrapper"}>
      <Layout>
        <Content>
          <Typography.Title
            level={4}
            className="d-flex justify-content-center  pt-4"
          >
            <span>
              Tiêu đề:
              <span className="text-uppercase"> {post.title}</span>
            </span>
          </Typography.Title>
          <MyEditor
            data={post.decription ? post.decription : post.description}
            handleChange={(data) => {
              setEditorData(data);
            }}
            modules={false}
            readOnly={true}
          />
        </Content>
        {showSider && (
          <Sider
            theme="light"
            width={"25%"}
            style={{
              borderRadius: "30px 30px 0 0",
            }}
          >
            <List
              size="small"
              header={
                <Typography.Title level={3} style={{ margin: 0 }}>
                  <Divider
                    orientation={"left"}
                    className="text-white"
                    style={{ margin: 0 }}
                  >
                    Sự kiện nổi bật
                  </Divider>{" "}
                </Typography.Title>
              }
              dataSource={eventTop}
              renderItem={({ title, _id, event }) => {
                const arrString = event.date.split("/");
                var eventDate = {
                  ngay: arrString[0],
                  thang: arrString[1],
                  nam: arrString[2],
                };
                return (
                  event && (
                    <List.Item
                      className="ms-1"
                      extra={<span>{event.dsDaDangKy.length} người</span>}
                    >
                      <List.Item.Meta
                        title={
                          <Link to={`/posts/${_id}`}>
                            {event.name}
                          </Link>
                        }
                        description={
                          <Typography.Text>
                            {event.time}{" "}
                            {eventDate.ngay +
                              "/" +
                              eventDate.thang +
                              "/" +
                              eventDate.nam}
                          </Typography.Text>
                        }
                      />
                    </List.Item>
                  )
                );
              }}
            />
          </Sider>
        )}
      </Layout>
    </div>
  );
}

export default Post;
