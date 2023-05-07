import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import eventApi from "../../api/eventApi";

const UserEventManager = () => {
  const [dataJoin, setDataJoin] = useState([]);
  const [dataMake, setDataMake] = useState([]);



  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fectEventsJoin = async () => {
      const res = await eventApi.getEventsJoin({ email: user.email });
      setDataJoin(res.data);
    };

    if(user.role === 'giangVien'){
      const fectEventsMake = async () => {
        const result = await eventApi.getEventsMake({ email: user.email });
        setDataMake(result.data);
      };

      fectEventsMake()
    }


    fectEventsJoin();
  }, [user.email, user.role]);

  return (
    <div className="wrapper">
      {
        dataJoin.length > 0 && <div>
        <h2 className="text-center mt-4">Các sự kiện đã đăng kí</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sự kiện</th>
              <th>Ngày diễn ra</th>
              <th>Thời gian</th>
              <th>Người tạo</th>
            </tr>
          </thead>
          <tbody>
            {dataJoin?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      }
    
      {user.role === "giangVien" && dataMake.length > 0 && <div>
      <h2 className="text-center mt-4">Các sự kiện đã tạo</h2>
      <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sự kiện</th>
              <th>Ngày diễn ra</th>
              <th>Thời gian</th>
              <th>Giới hạn tham gia</th>
            </tr>
          </thead>
          <tbody>
            {dataMake?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.limit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </div>}

      {
        dataJoin.length <= 0 && 
        <h2 className="text-center mt-4">Bạn chưa đăng kí tham gia sự kiện nào!</h2>
      }
      {
        user.role === "giangVien" && dataMake.length <= 0 && 
        <h2 className="text-center mt-4">Bạn chưa tạo sự kiện nào!</h2>
      }
    </div>
  );
};

export default UserEventManager;
