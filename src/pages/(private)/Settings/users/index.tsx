import UserTable from "./users-table";
import UserModal from "./user-modal";
import DeleteUserModal from "./delete-user-modal";

export default function Users() {
	return (
		<div>
			<UserTable />
			<UserModal />
			<DeleteUserModal/>
		</div>
	);
}
