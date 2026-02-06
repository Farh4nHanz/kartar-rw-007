export function formatCurrency(
	currency: string,
	region: string,
	value: number,
	options?: Intl.NumberFormatOptions,
) {
	return new Intl.NumberFormat(region, {
		style: "currency",
		currency,
		maximumFractionDigits: 0,
		notation: "compact",
		...options,
	}).format(value);
}
