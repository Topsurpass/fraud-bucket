import _ from "lodash";
import { ListFilter } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "../ui/button";

interface IProps {
	status: any;
	setStatus?: React.Dispatch<React.SetStateAction<any>>;
	filterData: any[];
}

export default function DatatableStatusFilterSsr({
	status,
	setStatus,
	filterData,
}: IProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<ListFilter className="mr-2 h-4 w-4" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Filter
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w" align="end">
				<DropdownMenuLabel>Filter by</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={status}
					onValueChange={setStatus}
				>
					{filterData.map((item) => {
						return (
							<DropdownMenuRadioItem
								key={item.value}
								// color={item.color}
								value={item.value}
							>
								{_.upperCase(item.label)}
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
