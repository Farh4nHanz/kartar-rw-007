/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: true */
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { ArrowRight, Clock } from "lucide-react";
import Map, {
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	Popup,
	type StyleSpecification,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Activity, useCallback, useState } from "react";
import { contactInfo } from "@/data";

const OSM_STYLE: StyleSpecification = {
	version: 8,
	sources: {
		osm: {
			type: "raster",
			tiles: [
				"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
				"https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
				"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
			],
			tileSize: 256,
			attribution: "© OpenStreetMap contributors",
		},
	},
	layers: [
		{
			id: "osm",
			type: "raster",
			source: "osm",
		},
	],
};

export const Route = createFileRoute("/kontak")({
	component: RouteComponent,
});

function RouteComponent() {
	const [showPopup, setShowPopup] = useState(false);

	const markerLocation = {
		latitude: -6.1317342,
		longitude: 106.8525953,
	};

	const openGoogleMaps = useCallback(() => {
		const url = `https://www.google.com/maps/?q=${markerLocation.latitude},${markerLocation.longitude}`;

		window.open(url, "_blank");
	}, []);

	return (
		<main className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
			<div className="container w-full px-6 py-2">
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-5xl text-blue-900">
						Hubungi Kami
					</h1>
					<p className="mx-auto max-w-3xl text-gray-600 text-lg">
						Ada pertanyaan atau ingin bekerja sama? Jangan ragu untuk
						menghubungi kami. Tim kami siap membantu Anda.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{/* Contact Information */}
					<Card>
						<CardHeader>
							<CardTitle className="font-semibold text-blue-900 text-xl">
								Informasi Kontak
							</CardTitle>
						</CardHeader>

						<CardContent className="space-y-6">
							{contactInfo.general.map((contact) => (
								<div
									className="flex items-start space-x-2 sm:space-x-4"
									key={contact.label}
								>
									<div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white">
										<contact.icon className="size-6" />
									</div>
									<div className="flex flex-col">
										<h4 className="mb-1 font-semibold text-gray-900 text-sm">
											{contact.label}
										</h4>
										<p className="text-gray-600 text-xs sm:text-sm">
											{contact.value}
										</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Social Media */}
					<Card>
						<CardHeader>
							<CardTitle className="font-semibold text-blue-900 text-xl">
								Media Sosial
							</CardTitle>
						</CardHeader>

						<CardContent>
							<div className="space-y-3">
								{contactInfo.socialMedia.map((social) => (
									<div
										className="flex flex-wrap items-center justify-between gap-2 overflow-auto rounded-lg bg-blue-50 p-4"
										key={social.label}
									>
										<div className="flex items-center gap-3">
											<social.icon className="size-6" />
											<span className="hidden font-medium text-gray-900 text-sm md:inline-block">
												{social.label}
											</span>
										</div>
										<Button
											variant="link"
											onClick={() => {
												window.open(
													social.link,
													"_blank",
													"noopener,noreferrer",
												);
											}}
											className="line-clamp-1 font-medium text-blue-900 text-sm hover:cursor-pointer hover:text-blue-700"
										>
											{social.value}
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Map */}
				<Card className="mt-8 h-fit min-h-100 overflow-hidden rounded-lg p-0">
					<Map
						initialViewState={{
							longitude: markerLocation.longitude,
							latitude: markerLocation.latitude,
							zoom: 12,
						}}
						style={{
							width: "100%",
							height: 450,
						}}
						mapStyle={OSM_STYLE}
						attributionControl={false}
					>
						<FullscreenControl />
						<GeolocateControl trackUserLocation />
						<NavigationControl />
						<Marker
							longitude={markerLocation.longitude}
							latitude={markerLocation.latitude}
							anchor="bottom"
							color="red"
							onClick={() => setShowPopup(true)}
							className="hover:cursor-pointer"
						/>

						<Activity mode={showPopup ? "visible" : "hidden"}>
							<Popup
								longitude={markerLocation.longitude}
								latitude={markerLocation.latitude}
								closeButton={false}
								closeOnClick
								focusAfterOpen
								onClose={() => setShowPopup(false)}
							>
								<Card className="w-fit min-w-56 rounded-md p-0">
									<CardContent className="bg-white p-0">
										<div className="relative h-32 overflow-hidden rounded-t-md">
											<img
												src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=mdooKYgI7RFpDywCIAzsWQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=70.60091&pitch=0&thumbfov=100"
												alt="image"
												className="h-full w-full object-cover"
											/>
										</div>
										<div className="space-y-4 p-3">
											<div className="space-y-2">
												<div>
													<span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
														Kantor Pemerintahan Wilayah
													</span>
													<h3 className="font-semibold text-foreground leading-tight">
														Sekretariat RW. 07 Sunter Agung
													</h3>
												</div>
												<div className="flex items-center gap-1.5 text-muted-foreground text-sm">
													<Clock className="size-3.5" />
													<span>Senin-Jum'at 19:00-21:00</span>
												</div>
												<div className="flex items-center gap-1.5 text-muted-foreground text-sm">
													<Clock className="size-3.5" />
													<span>Sabtu-Minggu 15:00-21:00</span>
												</div>
											</div>
											<Button
												size="sm"
												className="h-8 w-full rounded-sm hover:cursor-pointer"
												onClick={openGoogleMaps}
											>
												Buka di Google Maps
												<ArrowRight className="ml-2 size-4" />
											</Button>
										</div>
									</CardContent>
								</Card>
							</Popup>
						</Activity>
					</Map>
				</Card>
			</div>
		</main>
	);
}
