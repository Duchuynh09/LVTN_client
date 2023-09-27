import { Link } from "react-router-dom";

export const items = (posts) => {
  return posts.map(({ title, _id, event, ...next }) => {
    return {
      label: (
        <Link to={`${title}/${_id}`}>
          {event ? event.name : "Khong thay event"}
        </Link>
      ),
      key: _id,
      // children: [
      //   {
      //     label: (
      //       <Link to={`${title}/${_id}`}>
      //         {event ? event.name : "Khong thay event"}
      //       </Link>
      //     ),
      //     key: _id,
      //   },
      // ],
    };
  });
};
