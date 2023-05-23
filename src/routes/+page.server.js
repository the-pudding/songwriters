import Songs from "$data/songs.csv";
import Writers from "$data/writerKey.csv";
import { group } from "d3";

export async function load() {

	let songs = Songs.map((d,i) => {

		let songwritersArray = JSON.parse(d["songwriter_gender"].replace(/'/g, '"'));

		return {
			id: i,
			year: +d.year,
			song_key: d.song_key,
			womenOnly: d["has no men"],
			menOnly: d["has no women"],
			cut: d["cut"],
			artist_gender: d["artist_gender"],
			genderArray: songwritersArray,
		}
	})

	songs = songs.sort((a,b) => {
		return b.year - a.year;
	})

	let writerKey = group(Writers, d => d["title_artist_name"].toLowerCase());

	let data = {
		songs: songs,
		writerKey: writerKey
	}

	return { data };
}