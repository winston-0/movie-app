import { Pagination } from "antd";

export default function PaginationBlock(props) {
  const { changePageNumber } = props;
  return (
    <Pagination
      onChange={(page) => changePageNumber(page)}
      className="pagination"
      defaultCurrent={1}
      total={500}
      showSizeChanger={false}
    />
  );
}
