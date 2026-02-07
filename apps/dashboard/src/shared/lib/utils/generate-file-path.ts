export function generateFilePath(file: File) {
	const ext = file.name.split(".").pop();
	return `public/${crypto.randomUUID()}.${ext}`;
}
