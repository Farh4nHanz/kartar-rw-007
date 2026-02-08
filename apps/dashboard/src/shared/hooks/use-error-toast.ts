import { useEffect } from "react";
import { toast } from "sonner";

export function useErrorToast(error: Error | null) {
	useEffect(() => {
		if (error) {
			toast.error(error?.message, {
				duration: 5000,
				dismissible: true,
				closeButton: true,
			});
		}
	}, [error]);
}
