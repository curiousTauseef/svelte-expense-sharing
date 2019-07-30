<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let people = [];

	let input_amount = 0;
	let spender = people[0];
	let concerned = [...people];
	let reason = "";
	
	function submit(){
		dispatch('expense', {spender, concerned, reason, amount:input_amount, date:new Date});
		input_amount = 0;
		reason = "";
		spender = people[0];
		concerned = [...people];
	}
</script>

<style>
	input, select{
		width: 100%;
	}
</style>

<form on:submit|preventDefault={submit}>
	<label>
		Amount spent:
		<input type=number bind:value={input_amount} min=0 step=0.01 required/>
	</label>
	
	<label>
	Who paid ?
		<select bind:value={spender}>
		{#each people as person}
			<option value={person}>
				{person}
			</option>
		{/each}
	</select>
	</label>
	
	<label>What for ?
	<input bind:value={reason}>
	</label>

	<label>
		Who benefitted ?
			<select bind:value={concerned} multiple>
		{#each people as person}
		<option value={person}>
			{person}
		</option>
		{/each}
	</select>
	</label>
	
	<input type=submit value="Save">
</form>