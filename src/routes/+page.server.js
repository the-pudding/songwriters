import Songs from "$data/songs.csv";

export async function load() {

	let data = Songs.map((d,i) => {
		return {
			id: i,
			year: +d.year,
			song_key: d.song_key,
			womenOnly: d["has no men"],
			menOnly: d["has no women"]
		}
	})
	return { data };
}