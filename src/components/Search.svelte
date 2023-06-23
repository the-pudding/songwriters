<script>
	export let searchTerm;
</script>


<div id="search-input-cont">
	<input type="text" 
				 id="search-field" 
				 placeholder="Search for a song, writer, or artist" 
				 autocomplete="off"
				 bind:value={searchTerm}
				 on:input />
</div> 


<style>
	#search-input-cont {
		display: flex;
		align-items: center;
		margin: 0 0 0 10px;
		width: 350px;
	}

	#search-field {
		width: 100%;
		background: none;
		font-family: 'DM Sans';
		border: none;
		outline: none;
		font-size: 16px;
		border-bottom: 1px solid rgba(255,250,215,.5);
		border-radius: 0px;
		padding: 8px;
		margin: 0 10px 0;
		color: var(--color-fg);
	}

</style>