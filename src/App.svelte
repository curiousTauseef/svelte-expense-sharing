<script>
	import ExpenseForm from './ExpenseForm.svelte';
	import summarize from './summarize.js';
	
	let people = ["Ophir", "Ulysse"]
	let expenses = []
	let currency='¬';
	
	let orderedSummary = [];
	$: orderedSummary = summarize(expenses, people);
	
	function onExpense({detail:expense}){
		expenses = [expense, ...expenses]
	}
</script>

<style>
	.expense {
		border: 1px solid;
		border-radius: 3px;
		padding: 5px;
		margin: 5px;
	}
	.green{color:green}
	.red{color:red}
	
</style>
<h1>Expenses</h1>

<h2>New Expense</h2>
<ExpenseForm on:expense={onExpense} bind:people></ExpenseForm>

<h2>Balance</h2>
<ol>
	{#each orderedSummary as item}
	<li class="balance">
		{item.person}:
		<strong class={item.balance >= 0 ? 'green' : 'red'}>
			{item.balance.toFixed(2)}{currency}
		</strong>
	</li>
	{/each}
</ol>


{#if expenses.length>0}
<h2>All expenses</h2>
<div>
	{#each expenses as expense (expense.date)}
	<div class=expense>
			<small>{expense.date.toLocaleString()} :</small>
		<p>
			<strong>{expense.reason}</strong>: {expense.spender} spent <strong>{expense.amount}{currency}</strong> for {expense.concerned}
		</p>
	</div>
	{/each}
</div>
{/if}