import { useEffect } from "react";

type useCloseOutside = {
	isOpen: boolean;
	onClose: () => void;
	formRef: React.RefObject<HTMLElement>;
}

export const useCloseOutside = ({isOpen, onClose, formRef}:useCloseOutside) =>  {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (evt: MouseEvent) => {
			const { target } = evt;
			if (target instanceof Node && formRef.current && !formRef.current.contains(target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClick);
			return () => {
				document.removeEventListener('mousedown', handleClick);
			}
	}, [isOpen, onClose, formRef]);
}