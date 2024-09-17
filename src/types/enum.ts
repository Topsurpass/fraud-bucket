export enum Status {
	ACTIVE = "ACTIVE",
	DISABLED = "DISABLED",
}

export enum TrxnStatus {
	All = "",
	Fraudulent = "Fraudulent",
	"Not Fraudulent" = "Not Fraudulent",
	Escalated = "Escalated",
}

export enum RequestMethod {
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

export enum EntityType {
	TRANSACTION = "TRANSACTION",
	CASES = "CASES",
	MINISTRY = "MINISTRY",
	FILES = "FILES",
	ANALYSIS = "ANALYSIS",
	COLLABORATION = "COLLABORATION",
	SETTING_USER = "SETTING_USE",
}
