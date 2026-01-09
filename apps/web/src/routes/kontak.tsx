/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: true */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MessageSquare, Star } from "lucide-react";
import Map, {
	FullscreenControl,
	GeolocateControl,
	Marker,
	NavigationControl,
	Popup,
	type StyleSpecification,
} from "react-map-gl/maplibre";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactInfo } from "@/data/mock";
import "maplibre-gl/dist/maplibre-gl.css";
import { Activity, useCallback, useState } from "react";

export const Route = createFileRoute("/kontak")({
	component: RouteComponent,
});

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

function RouteComponent() {
	const [showPopup, setShowPopup] = useState(false);

	const markerLocation = {
		latitude: 37.8,
		longitude: -122.4,
	};

	const openGoogleMaps = useCallback(() => {
		const url = `https://www.google.com/maps/?q=${markerLocation.latitude},${markerLocation.longitude}`;

		window.open(url, "_blank");
	}, []);

	return (
		<div className="flex h-fit min-h-screen w-full justify-center bg-gray-50 py-16">
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

				<div className="grid grid-cols-1 gap-8 *:rounded-lg lg:auto-rows-fr lg:grid-cols-2">
					{/* Contact Information */}
					<div className="space-y-6 *:rounded-lg *:px-2 *:py-5">
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
											<Link
												to={social.link}
												target="_blank"
												rel="noopener noreferrer"
												className="line-clamp-1 font-medium text-blue-900 text-sm hover:text-blue-700"
											>
												{social.value}
											</Link>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<Card className="space-y-4 px-2 py-5">
						<CardHeader>
							<CardTitle className="flex items-center font-semibold text-blue-900 text-xl">
								<MessageSquare className="mr-3 size-6" />
								Kirim Pesan
							</CardTitle>
						</CardHeader>

						<CardContent className="space-y-4">
							<form>
								<FieldSet>
									<FieldGroup className="gap-7">
										<Field>
											<FieldLabel htmlFor="nama" className="text-sm">
												Nama Lengkap
											</FieldLabel>
											<Input
												type="text"
												id="nama"
												placeholder="Masukkan nama Anda"
												className="h-10 rounded-md"
												required
												autoComplete="off"
											/>
										</Field>
										<Field>
											<FieldLabel htmlFor="email" className="text-sm">
												Email
											</FieldLabel>
											<Input
												type="email"
												id="email"
												placeholder="email@example.com"
												className="h-10 rounded-md"
												required
												autoComplete="off"
											/>
										</Field>
										<Field>
											<FieldLabel htmlFor="no_telp" className="text-sm">
												Nomor Telepon
											</FieldLabel>
											<Input
												type="text"
												inputMode="numeric"
												pattern="[0-9]*"
												id="no_telp"
												placeholder="08xx-xxxx-xxxx"
												className="h-10 rounded-md"
												required
												autoComplete="off"
											/>
										</Field>
										<Field>
											<FieldLabel htmlFor="subjek" className="text-sm">
												Subjek
											</FieldLabel>
											<Input
												type="text"
												id="subjek"
												placeholder="Topik Pesan Anda"
												className="h-10 rounded-md"
												required
												autoComplete="off"
											/>
										</Field>
										<Field>
											<FieldLabel htmlFor="pesan" className="text-sm">
												Pesan
											</FieldLabel>
											<Textarea
												id="pesan"
												placeholder="Topik Pesan Anda"
												className="min-h-32 rounded-md"
												required
												autoComplete="off"
											/>
										</Field>

										<Field orientation="horizontal">
											<Button
												type="submit"
												className="w-full rounded-md bg-blue-900 p-5 font-semibold text-white hover:cursor-pointer hover:bg-blue-800"
											>
												Kirim Pesan
											</Button>
										</Field>
									</FieldGroup>
								</FieldSet>
							</form>
							<p className="text-center text-muted-foreground text-xs italic">
								Atau hubungi kami langsung melalui WhatsApp untuk respons lebih
								cepat
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Map */}
				<Card className="mt-8 h-fit min-h-100 overflow-hidden rounded-lg p-0">
					<Map
						initialViewState={{
							longitude: -122.4,
							latitude: 37.8,
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
							longitude={-122.4}
							latitude={37.8}
							anchor="bottom"
							color="red"
							onClick={() => setShowPopup(true)}
							className="hover:cursor-pointer"
						/>

						<Activity mode={showPopup ? "visible" : "hidden"}>
							<Popup
								longitude={-122.4}
								latitude={37.8}
								closeButton={false}
								closeOnClick
								focusAfterOpen
								onClose={() => setShowPopup(false)}
							>
								<Card className="w-fit min-w-56 rounded-md p-0">
									<CardContent className="bg-white p-0">
										<div className="relative h-32 overflow-hidden rounded-t-md">
											<img
												src="https://images.unsplash.com/photo-1575223970966-76ae61ee7838?w=300&h=200&fit=crop"
												alt="image"
												className="h-full w-full object-cover"
											/>
										</div>
										<div className="space-y-2 p-3">
											<div>
												<span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
													category
												</span>
												<h3 className="font-semibold text-foreground leading-tight">
													Nama Tempat
												</h3>
											</div>
											<div className="flex items-center gap-3 text-sm">
												<div className="flex items-center gap-1">
													<Star className="size-3.5 fill-amber-400 text-amber-400" />
													<span className="font-medium">5.0</span>
													<span className="text-muted-foreground">
														(10,000)
													</span>
												</div>
											</div>
											<div className="flex items-center gap-1.5 text-muted-foreground text-sm">
												<Clock className="size-3.5" />
												<span>08:00-22:00</span>
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
		</div>
	);
}
