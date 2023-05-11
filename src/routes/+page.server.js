import Songs from "$data/songs.csv";

export async function load() {

	let data = Songs.map((d,i) => {

		let songwritersArray = JSON.parse(d["songwriter_gender"].replace(/'/g, '"'));

		return {
			id: i,
			year: +d.year,
			song_key: d.song_key,
			womenOnly: d["has no men"],
			menOnly: d["has no women"],
			genderArray: songwritersArray,
		}
	})

	data = data.sort((a,b) => {
		return b.year - a.year;
	})

	return { data };
}