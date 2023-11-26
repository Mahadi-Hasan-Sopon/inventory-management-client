import { useLoaderData } from "react-router-dom";

const Products = () => {
  const loadedProducts = useLoaderData();
  console.log(loadedProducts.data);

  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="overflow-x-auto">
        <table className="table table-lg text-center">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Sale</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadedProducts?.data?.map((product, index) => (
              <tr key={product?._id}>
                <th> {index + 1} </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-20 h-20">
                        <img
                          src={product?.productLogoURL}
                          alt={product?.productName}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td> {product?.productName} </td>
                <td>{product?.productQuantity}</td>
                <td> {product?.totalSales ? product?.totalSales : 0} </td>

                <td>
                  <div className="flex gap-2 items-center">
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
