export type ModalProps<TData> = {
	selectedData: TData | null;
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
};
