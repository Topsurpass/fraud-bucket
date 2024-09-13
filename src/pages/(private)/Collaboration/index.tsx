import CollaborationTable from "./collaboration-table";
import CollaborationModal from "./collaboration-modal";
import DeleteCollaborationModal from "./delete-collaboration-modal";

export default function Collaboration() {
	return (
		<>
			<CollaborationTable />
			<CollaborationModal />
			<DeleteCollaborationModal />
		</>
	);
}
