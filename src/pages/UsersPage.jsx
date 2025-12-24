import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../services/appServices";
import { showToast } from "../redux/slices/ToastSlice";
import Table from "../components/Table";
import EmptyTable from "../components/EmptyTable";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import { getSerialNumber } from "../utils/utils";

export default function UsersPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = ["Name", "Email", "Phone", "City"];
  const mobileColumns = ["Name", "Email"];

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getUsers(page, 10);
      setUsers(response.data);
    //   Pagination data depends on the endpoint and how it is set up
      setPaginationData({
        total: response.total,
        current_page: response.current_page,
        pages: response.pages,
      });
    } catch (error) {
      dispatch(
        showToast({
          status: "error",
          message: "Failed to load users",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-600 mt-2">
            Browse through the list of users. Click on any row to view full details.
          </p>
        </div>

        {loading && users.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex gap-5 min-h-[300px] py-5">
            <div className="hidden md:block w-full">
              {users && users.length > 0 ? (
                <Table
                  data={paginationData}
                  columns={columns}
                  changePage={changePage}
                >
                  {users.map((user, index) => (
                    <tr
                      onClick={() => handleRowClick(user)}
                      className="border-b h-14 hover:bg-gray-50 cursor-pointer transition-colors"
                      key={user.id}
                    >
                      <td className="pl-5 w-12 text-center">
                        {getSerialNumber(index, paginationData?.current_page || 1)}
                      </td>
                      <td className="px-5">{user.name}</td>
                      <td className="px-5">{user.email}</td>
                      <td className="px-5">{user.phone}</td>
                      <td className="px-5">{user.address?.city}</td>
                    </tr>
                  ))}
                </Table>
              ) : (
                <EmptyTable loading={loading} columns={columns} />
              )}
            </div>
            <div className="md:hidden w-full">
              {users && users.length > 0 ? (
                <Table
                  data={paginationData}
                  columns={columns}
                  mobileColumns={mobileColumns}
                  changePage={changePage}
                >
                  {users.map((user, index) => (
                    <tr
                      onClick={() => handleRowClick(user)}
                      className="border-b h-14 hover:bg-gray-50 cursor-pointer transition-colors"
                      key={user.id}
                    >
                      <td className="pl-2 w-12 text-center">
                        {getSerialNumber(index, paginationData?.current_page || 1)}
                      </td>
                      <td className="px-2">{user.name}</td>
                      <td className="px-2">{user.email}</td>
                    </tr>
                  ))}
                </Table>
              ) : (
                <EmptyTable loading={loading} columns={columns} mobileColumns={mobileColumns} />
              )}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500">Name</p>
                  <p className="text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Username</p>
                  <p className="text-gray-900">{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Phone</p>
                  <p className="text-gray-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Website</p>
                  <p className="text-gray-900">{selectedUser.website}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Company</p>
                  <p className="text-gray-900">{selectedUser.company?.name}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">Address</p>
                <p className="text-gray-900">
                  {selectedUser.address?.street}, {selectedUser.address?.suite}
                  <br />
                  {selectedUser.address?.city}, {selectedUser.address?.zipcode}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

