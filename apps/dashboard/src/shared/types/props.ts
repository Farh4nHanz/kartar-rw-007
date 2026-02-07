export type ModalProps<TData> = {
	selectedData: TData | null;
	isModalOpen: boolean;
	setModalState: (open: boolean) => void;
};
