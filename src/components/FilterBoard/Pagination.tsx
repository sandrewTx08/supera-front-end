import Pagination from "react-bootstrap/esm/Pagination";

export default function Component({
  active,
  totalPages,
  onClick,
}: React.PropsWithChildren<{
  active: number;
  totalPages: number;
  onClick?(pageIndex: number): void;
}>) {
  const items = [];

  for (let i = 1; i <= totalPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === active}
        onClick={() => onClick && onClick(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
}
