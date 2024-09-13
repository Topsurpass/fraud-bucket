import { createContext, Dispatch, useMemo, useReducer } from "react";
import { EntityType } from "@/types/enum";
import { State, Action } from "@/types";

const initialState: State = {
	isModalOpen: false,
	formData: {},
	isEdit: false,
	isDelete: false,
	entity: "",
};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "OPEN_MODAL":
			return {
				...state,
				isModalOpen: true,
				entity: action.payload,
			};
		case "CLOSE_MODAL":
			return {
				...state,
				isModalOpen: false,
				isEdit: false,
				isDelete: false,
				entity: "",
				formData: {},
			};
		case "SET_EDIT_MODE":
			return {
				...state,
				isModalOpen: true,
				isEdit: true,
				formData: action.payload.data,
				entity: action.payload.entity,
			};
		case "OPEN_DELETE_MODAL":
			return {
				...state,
				isModalOpen: false,
				isDelete: true,
				formData: action.payload.data,
				entity: action.payload.entity,
			};
		default:
			return state;
	}
}

interface IEditData {
	data: any;
	entity: EntityType;
}

interface GlobalContextProps extends State {
	onModalClose: () => void;
	onModalOpen: (arg: any) => void;
	onEdit: (arg: IEditData) => void;
	onDelete: (arg: IEditData) => void;
	dispatch: Dispatch<Action>;
}

export const GlobalContext = createContext<GlobalContextProps>(undefined!);

export function GlobalProvider({ children }: Props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const onModalOpen = (payload: EntityType) => {
		dispatch({
			type: "OPEN_MODAL",
			payload,
		});
	};
	const onModalClose = () => {
		dispatch({
			type: "CLOSE_MODAL",
		});
	};

	const onEdit = ({ data, entity }: IEditData) => {
		dispatch({
			type: "SET_EDIT_MODE",
			payload: {
				data,
				entity,
			},
		});
	};

	const onDelete = ({ data, entity }: IEditData) => {
		dispatch({
			type: "OPEN_DELETE_MODAL",
			payload: {
				data,
				entity,
			},
		});
	};

	const contextValue = useMemo(
		() => ({
			...state,
			dispatch,
			onModalOpen,
			onModalClose,
			onEdit,
			onDelete,
		}),
		[state],
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
}

type Props = {
	children?: JSX.Element;
};
