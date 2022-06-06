import "./widget.scss";

export const Widget = ({ type }) => {
  let data;

  //temp
  const amount = 100;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
      };
      break;
    case "client":
      data = {
        title: "CLIENTS",
        link: "See all clients",
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">right Corner</div>
    </div>
  );
};

export default Widget;
