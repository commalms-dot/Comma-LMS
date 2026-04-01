import Image from "next/image";
import { CLIENTS } from "@/constants/clients";
import "./ClientsList.css";

export default async function ClientsList() {
	const clients: { id: string; logo: string }[] = CLIENTS;
	return (
		<div className="clients-list">
			<div className="clients-list__content">
				{clients.map((client, index) => (
					<Image
						key={index}
						src={`${client?.logo}`}
						alt={client.id}
						width={80}
						height={80}
					/>
				))}
			</div>
		</div>
	);
}
