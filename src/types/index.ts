// import { string } from "zod";
import { EntityType } from "./enum";

export interface State {
	isModalOpen: boolean;
	formData: Record<string, any>;
	isEdit: boolean;
	isDelete: boolean;
	entity: EntityType | string;
}

export type Action =
	| { type: "OPEN_MODAL"; payload: EntityType }
	| { type: "CLOSE_MODAL" }
	| { type: "SET_EDIT_MODE"; payload: Record<string, any> }
	| { type: "OPEN_DELETE_MODAL"; payload: Record<string, any> };
