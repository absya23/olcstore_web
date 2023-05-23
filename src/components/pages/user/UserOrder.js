import React from "react";
import { v4 } from "uuid";
import handleFormatNumber from "../../../handlers/handleFormatNumber";
import Button from "../../atoms/Button";

const UserOrder = ({ user, orders, navigate = () => {} }) => {
  return (
    <div className="right col-span-3 border flex-4 p-5">
      <h3 className="uppercase font-bold pb-3 border-b mb-4 text-[18px]">
        Lịch sử đơn hàng
      </h3>
      {orders.length > 0 ? (
        <table className="w-full py-4">
          <thead>
            <tr>
              <th width="20%">Mã đơn hàng</th>
              <th width="30%">Ngày</th>
              <th width="25%">Tổng đơn</th>
              <th width="25%">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((item) => (
                <tr key={v4()}>
                  <td
                    className="cursor-pointer hover:text-secondary"
                    onClick={() =>
                      navigate(`/user/order/${item.id_order}`, {
                        state: { id: item.id_order },
                      })
                    }
                  >
                    {item.id_order}
                  </td>
                  <td>{item.created_at}</td>
                  <td>{handleFormatNumber(item.total)} đ</td>
                  <td
                    className={`${
                      item.id_status === 1
                        ? "text-yellow-500"
                        : item.id_status === 2
                        ? "text-pink-500"
                        : item.id_status === 3
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mb-4">Chưa có đơn hàng nào</p>
          <Button
            className="w-auto px-5 text-lg normal-case rounded-md bg-primary hover:bg-hover"
            onClick={() => navigate("/product")}
          >
            Mua sắm ngay
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
