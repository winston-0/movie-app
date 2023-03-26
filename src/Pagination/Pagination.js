import { Pagination } from "antd";

export default function PaginationBlock(props) {
  const { changePageNumber, total } = props;
  return (
    <Pagination
      onChange={(page) => changePageNumber(page)}
      className="pagination"
      defaultCurrent={1}
      showSizeChanger={false}
      total={total + '0'}
    />
  );
}
