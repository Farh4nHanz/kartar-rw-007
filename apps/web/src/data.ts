import {
	Clock,
	Instagram,
	Mail,
	MapPin,
	MessageSquareText,
	Phone,
} from "lucide-react";

export const contactInfo = {
	general: [
		{
			label: "Email",
			icon: Mail,
			value: "karangtarunazer0se7en@gmail.com",
		},
		{
			label: "Telepon",
			icon: Phone,
			value: "0857-1743-5135",
		},
		{
			label: "WhatsApp",
			icon: MessageSquareText,
			value: "0857-1743-5135",
		},
		{
			label: "Alamat",
			icon: MapPin,
			value:
				"Jl. Ancol Sel. II No.7 14, RT.14/RW.7, Sunter Agung, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14350.",
		},
		{
			label: "Jam Operasional",
			icon: Clock,
			value:
				"Senin - Jumat: 19.00 - 21.00 WIB, Sabtu - Minggu: 15.00 - 21.00 WIB",
		},
	],
	socialMedia: [
		{
			label: "Instagram",
			icon: Instagram,
			value: "@karangtaruna_rw007",
			link: "https://instagram.com/katarzeroseven",
		},
	],
} as const;
