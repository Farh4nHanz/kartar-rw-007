export function generateFilePath(file: File) {
	const ext = file.name.split(".").pop();
	return `${crypto.randomUUID()}.${ext}`;
}
