import React from "react";
import '../../css/Timeline.css';

const firstCapital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getKantorTujuan = (string) => {
	var kantor = string.split(";");
	// var stringKantor = kantor.split(":");
	return kantor[2].toLowerCase();
}

const postingLoket = (desc, officeName) => {
	var string = desc.split(";");
	// return `${string[0]}\n${string[1]}`;
	return (
		<div>
			<p className='ptimeline'>kantor awal : {officeName}</p>
			<p className='ptimeline'>{string[0].toLowerCase()} </p>
			<p className='ptimeline'>{string[1].toLowerCase()}</p>
		</div>
	);
}
 
const ListLacak = ({ listdata }) => (
	<React.Fragment>
		<ul className="timeline">
			{ listdata.map((data, i) => <li key={i}>
				<div className="direction-r">
					<div className="flag-wrapper">
						<span className="flag">{data.eventDate}</span>
					</div>
					<div className="desc">
						{ data.eventName === 'POSTING LOKET' && <React.Fragment>
							{ postingLoket(data.description, data.officeName) }
						</React.Fragment>}
						{ data.eventName === 'SELESAI ANTAR' && <p>Selesai antar di {firstCapital(data.officeName.toLowerCase())} </p> }
						{ data.eventName === 'PROSES ANTAR' && <p>Proses antar di {firstCapital(data.officeName.toLowerCase())} </p>}
						{ data.eventName === 'MANIFEST SERAH' && <p>Diteruskan ke {getKantorTujuan(data.description)} </p> }
					</div>
				</div>
			</li>) }
		</ul>
	</React.Fragment>
);

export default ListLacak;