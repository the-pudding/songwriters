import Songs from "$data/songs.csv";
import Writers from "$data/writerKey.csv";
import { group, groups } from "d3";

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
			percent: d["count of women"]/d["song writer count"],
			cutTwo: d["cut_two"],
			artist_gender: d["artist_gender"],
			genderArray: songwritersArray,

		}
	})

	songs = songs.sort((a,b) => {
		return b.year - a.year;
	})

	let writerKey = group(Writers, d => d["title_artist_name"].toLowerCase());
	let writersByYear = groups(Writers, d => d["year"].toLowerCase()).sort((a,b) => {
		return a[0] - b[0];
	}).filter(d => {
		return d[0] > 1958;
	});

	let cutCategories = groups(songs, d => d["cutTwo"]).map(d => d[0]);

	let data = {
		songs: songs,
		writerKey: writerKey,
		writersByYear:writersByYear,
		cutCategories:cutCategories
	}

	return { data };
}